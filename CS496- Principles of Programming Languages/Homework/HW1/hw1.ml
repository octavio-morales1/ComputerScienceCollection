
(* ******************************************** *)
(** Basic functions on finite automata *)
(* ******************************************** *)
(**
   Code stub for assignment 1
*)
(* 
Name: Octavio Morales
Pledge: I pledge my honor that I have abided by the Stevens Honor System.
*)

type symbol = char
type input = char list

type state = string

(* transition function *)
type tf = (state * symbol * state) list

(* initial state * transition function * end state *)
type fa = { states: state list; start:state; tf: tf; final: state list}


(* ******************************************** *)
(* Examples of automata *)
(* ******************************************** *)

let a = {states = ["q0";"q1";"q2"];
         start = "q0";
         tf = [("q0",'a',"q1"); ("q1",'b',"q1"); ("q1",'c',"q2")];
         final = ["q2"]}

let a2 = {states = ["q0";"q1";"q2";"q3";"q4"];
          start = "q0";
          tf = [("q0",'a',"q1"); ("q1",'b',"q1")
               ; ("q1",'c',"q2");  ("q3",'a',"q4")];
          final= ["q2"]
         }

let a3= {states = ["q0";"q1";"q2";"q3";"q4"; "q0"];
          start = "q0";
          tf = [("q0",'a',"q1"); ("q1",'b',"q1")
               ; ("q1",'c',"q2");  ("q3",'a',"q4")];
          final= ["q2"]
         }

let a4= {states = ["q0";"q1";"q2";"q3";"q4"; "q0"];
          start = "q0";
          tf = [("q0",'a',"q1"); ("q1",'b',"q1")
               ; ("q1",'c',"q2");  ("q3",'a',"q4"); ("q0",'a',"q5"); ];
          final= ["q2"]
         }

let tf_of_a = [("q0",'a',"q1"); ("q1",'b',"q1"); ("q1",'c',"q2")]



(* ******************************************** *)
(* Helper functions *)
(* ******************************************** *)

(* Converts the input string into a list. Used for accept*)
let input_of_string s =
  let rec exp i l =
    if i < 0 then l else exp (i - 1) (s.[i] :: l) in
  exp (String.length s - 1) []

(* Similar to apply_transition_function, this functions determines if a transition can be applied. Used for accept function*)
let rec can_transition: tf -> symbol -> symbol -> bool =
  fun f st1 st2 ->
    match f with
    | [] -> false
    | (s1, sym1, e1)::t ->
    match t with
      | [] -> false
      | (s2, sym2, e2)::t2 ->
        (st1=sym1 && st2=sym2 && e1= s2) || (can_transition ((s1,sym1,e1)::t2) st1 st2)

(* This function compares one tf of the list and compares it to the rest. Return true if there are any repeats. A helper function for repeats*)
let rec compare_rest: tf -> state -> symbol -> state -> bool=
  fun f s1 sym1 e1->
    match f with
    | [] -> false
    | (s2, sym2, end2)::t ->
      (sym1=sym2 && s1=s2 && e1!=end2) || (compare_rest t s1 sym1 e1)

(* This function takes in a tf and returns true if there are any repeats. This is a helper function of deterministic*) 
let rec repeats: tf-> bool=
  fun f->
    match f with
    | [] -> false
    | (s1, sym1, end1)::t ->
      (compare_rest t s1 sym1 end1)|| (repeats t)

(* This function return the first element of a list. Used to get the element of final. Used for valid, reachable, and non_empty *)
let rec first_of: state list -> state=
  fun sL ->
  match sL with
  | [] -> failwith "Invalid Use Of Helper Function"
  | h::t -> h

(* This function returns true or false if there are any repeats in states. This is a helper function for states_repeat *)
let rec repeater_helper: state -> state list -> bool=
  fun s l->
  match l with
  | [] -> false
  | h::t ->
    if s=h then true
    else repeater_helper s t

(* This function returns true or false if there are any repeats in states. This is used for the valid function*)
let rec states_repeat: state list -> bool=
  fun l ->
  match l with 
  | [] -> false
  | h::t ->
    (repeater_helper h t) || (states_repeat t)

(* This function returns a states list that removes all duplicate states. This is a helper to a helper *)
let rec rem_dup_helper: state list -> state -> state list=
  fun l s ->
  match l with
  | [] -> []
  | h::t -> 
    if s=h then (rem_dup_helper t s)
    else h::(rem_dup_helper t s)

(* This function returns a states list that removes all duplicate states. *)
let rec remove_duplicates: state list -> state list =
  fun l ->
  match l with
  | [] -> []
  | h::t -> h::(remove_duplicates (rem_dup_helper t h))

(* Helper function to determine what states can be reached from the starting state. *)
let rec reach_helper: state -> state -> (state * symbol * state) list -> state list=
  fun s e f ->
    match f with
    | [] -> []
    | (s1, sym1, s2)::t ->
      if (s=s1) then s2::(reach_helper s e t)@(reach_helper s2 e t)
      else (reach_helper s e t)

(* helper function to get the first element of any state list *)
let rec get_first: state list -> state =
  fun l ->
  match l with
  | [] -> failwith "you should't be using this"
  | h::t -> h

(* helper function to determine if a state is in a state list *)
let rec is_in: state -> state list -> bool =
  fun s l ->
  match l with
  | [] -> false
  | h::t ->
    if h=s then true
    else is_in s t

(* helper function to get the same elements from the two lists *)
let rec get_same: state list -> state list -> state list =
  fun l1 l2 ->
  match l1 with
  | [] -> []
  | h::t ->
  if (is_in h l2)=true then h::(get_same t l2)
  else (get_same t l2)

(* helper function to remove the unreachable states in the form of tf*)
let rec remove_unreachables: state list -> tf -> tf=
  fun sl f ->
  match f with
  | [] -> []
  | (s1, sym, e1)::t -> 
  if ((is_in s1 sl)=true && (is_in e1 sl)=true) then (s1, sym, e1)::(remove_unreachables sl t)
  else (remove_unreachables sl t)

(* helper function to remove the unreachable states in the form of a state list*)
let rec remove_unreachable_finals: state list -> state list ->  state list =
  fun s1 s2 ->
  match s1 with
  | [] -> []
  | h::t ->
  if ((is_in h s2)=true) then h::(remove_unreachable_finals t s2)
  else (remove_unreachable_finals t s2)


(* ******************************************** *)
(* Simulating automata *)
(* ******************************************** *)

(* function that applies the transition function f to the symbol sym assuming that the current state is st *)    
let rec apply_transition_function : tf -> state -> symbol -> state option =
  fun f st inp ->
    match f with
    | [] -> None
    | (s1,i,s2)::t ->
        if s1 = st && i = inp
        then Some s2
        else apply_transition_function t st inp

(* This function determines whether a word is accepted by a finite automaton *)
let rec accept : fa -> input -> bool =
  fun f i ->
    match i with
    | [] -> true
    | h1::t ->
        match t with
        | [] -> false
        | h2::t2 ->
          (can_transition f.tf h1 h2) || (accept f t)
          
(* This functions returns the list of all the states that are successors of some given state
with some give symbol *)
let rec next : tf -> state -> symbol -> state list =
  fun f s sym ->
    match f with
    | [] -> []
    | (start1, sym1, end1)::t ->
      if (start1=s && sym1=sym) then [end1]@(next t s sym)
      else (next t s sym)

(* This function checks whether the given automaton is non-deterministic or not. *)
let rec deterministic : fa -> bool=
  fun f ->
    if repeats (f.tf) then false
    else true

(* This function implements valid that checks for validity.*)
let rec valid : fa -> bool =
  fun f ->
  if( (states_repeat f.states)=false && (List.mem f.start f.states) && (List.mem (first_of f.final) f.states) && (deterministic f)) then true else false

(*This function reports list of states that are reachable from the start state. *)
let rec reachable : fa -> state list =
  fun f -> 
  (remove_duplicates (f.start::reach_helper f.start (first_of f.final) f.tf))

(* Determines whether a FA accepts at least one word *)
let rec non_empty : fa -> bool =
  fun f ->
  if (f.start= (get_first (reachable f))) && (List.mem (first_of f.final) (reachable f)) then true
  else false

(* Removes all dead (i.e. unreachable) states from a valid FA *)
let rec remove_dead_states : fa -> fa =
  fun f ->
    let x = {states=(get_same f.states (reachable f)); start= f.start; 
    tf= (remove_unreachables (reachable f) f.tf); final= (remove_unreachable_finals f.final (reachable f))} in x
    

