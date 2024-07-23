-module(server).

-export([start_server/0]).

-include_lib("./defs.hrl").

-spec start_server() -> _.
-spec loop(_State) -> _.
-spec do_join(_ChatName, _ClientPID, _Ref, _State) -> _.
-spec do_leave(_ChatName, _ClientPID, _Ref, _State) -> _.
-spec do_new_nick(_State, _Ref, _ClientPID, _NewNick) -> _.
-spec do_client_quit(_State, _Ref, _ClientPID) -> _NewState.

%%Name: Octavio Morales

start_server() ->
    catch(unregister(server)),
    register(server, self()),
    case whereis(testsuite) of
	undefined -> ok;
	TestSuitePID -> TestSuitePID!{server_up, self()}
    end,
    loop(
      #serv_st{
	 nicks = maps:new(), %% nickname map. client_pid => "nickname"
	 registrations = maps:new(), %% registration map. "chat_name" => [client_pids]
	 chatrooms = maps:new() %% chatroom map. "chat_name" => chat_pid
	}
     ).

loop(State) ->
    receive 
	%% initial connection
	{ClientPID, connect, ClientNick} ->
	    NewState =
		#serv_st{
		   nicks = maps:put(ClientPID, ClientNick, State#serv_st.nicks),
		   registrations = State#serv_st.registrations,
		   chatrooms = State#serv_st.chatrooms
		  },
	    loop(NewState);
	%% client requests to join a chat
	{ClientPID, Ref, join, ChatName} ->
	    NewState = do_join(ChatName, ClientPID, Ref, State),
	    loop(NewState);
	%% client requests to join a chat
	{ClientPID, Ref, leave, ChatName} ->
	    NewState = do_leave(ChatName, ClientPID, Ref, State),
	    loop(NewState);
	%% client requests to register a new nickname
	{ClientPID, Ref, nick, NewNick} ->
	    NewState = do_new_nick(State, Ref, ClientPID, NewNick),
	    loop(NewState);
	%% client requests to quit
	{ClientPID, Ref, quit} ->
	    NewState = do_client_quit(State, Ref, ClientPID),
	    loop(NewState);
	{TEST_PID, get_state} ->
	    TEST_PID!{get_state, State},
	    loop(State)
    end.

%% executes join protocol from server perspective
do_join(ChatName, ClientPID, Ref, State) ->
    TempRooms = State#serv_st.chatrooms,
    case maps:find(ChatName, TempRooms) of
        error -> 
            PIDChat = spawn(chatroom, start_chatroom, [ChatName]),
            ClientNick = maps:get(ClientPID, State#serv_st.nicks),
            PIDChat!{self(), Ref, register, ClientPID, ClientNick},
            NewReg = maps:put(ChatName, [ClientPID], State#serv_st.registrations),
            TempChat = maps:put(ChatName, PIDChat, TempRooms),
            State#serv_st{registrations = NewReg, chatrooms = TempChat};
        {ok, ChatPID} -> 
            ClientNick = maps:get(ClientPID, State#serv_st.nicks),
            ChatPID!{self(), Ref, register, ClientPID, ClientNick},
            CurReg = maps:get(ChatName, State#serv_st.registrations),
            UpReg = lists:append([ClientPID], CurReg),
            NewReg = maps:update(ChatName, UpReg, State#serv_st.registrations),
            State#serv_st{registrations = NewReg}
    end.


%% executes leave protocol from server perspective
do_leave(ChatName, ClientPID, Ref, State) ->
    PIDChat = maps:get(ChatName, State#serv_st.chatrooms),
    CurReg = maps:get(ChatName, State#serv_st.registrations),
    UpReg = lists:delete(ClientPID, CurReg),
    NewState = State#serv_st{registrations = maps:put(ChatName, UpReg, State#serv_st.registrations)},
    PIDChat!{self(), Ref, unregister, ClientPID},
    ClientPID!{self(), Ref, ack_leave},
    NewState.

%% executes new nickname protocol from server perspective
do_new_nick(State, Ref, ClientPID, NewNick) ->
    Nicknames = maps:values(State#serv_st.nicks),
    case lists:member(NewNick, Nicknames) of
        true -> 
            ClientPID ! {self(), Ref, err_nick_used},
            State;
        false -> 
            TempCR = maps:filter(fun (_, Clients) -> lists:member(ClientPID, Clients) end, State#serv_st.registrations),
            lists:foreach(fun (ChatName) ->
                RefPid = maps:get(ChatName, State#serv_st.chatrooms),
                RefPid ! {self(), Ref, update_nick, ClientPID, NewNick} end, 
                maps:keys(TempCR)),
            ClientPID ! {self(), Ref, ok_nick},
            TempMap = maps:put(ClientPID, NewNick, State#serv_st.nicks),
            State#serv_st{nicks = TempMap}
    end.


%% executes client quit protocol from server perspective
do_client_quit(State, Ref, ClientPID) ->
    TempMap = maps:remove(ClientPID, State#serv_st.nicks),
    TempState = State#serv_st{nicks = TempMap},
    TempKeys = maps:keys(State#serv_st.registrations),
    helper1(TempKeys, TempState, Ref, ClientPID).

%% helper
helper1([], State, _, _) ->
    State;
helper1([Key | RestKeys], State, Ref, ClientPID) ->
    Registrations = maps:get(Key, State#serv_st.registrations, []),
    case lists:member(ClientPID, Registrations) of
        false -> 
            helper1(RestKeys, State, Ref, ClientPID);
        true ->
            NewState = do_leave(Key, ClientPID, Ref, State),
            helper1(RestKeys, NewState, Ref, ClientPID)
    end.


