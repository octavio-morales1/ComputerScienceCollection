open ReM
open Dst
open Parser_plaf.Ast
open Parser_plaf.Parser


(*
Names: Octavio Morales, Jack Gibson
Pledge: I pledge my honor that I have abided by the Stevens Honor System.
*)

let pull_arg_from_ref s = function
| Parser_plaf.Ast.RefType(t) -> return t
| _ -> error @@ s^"Expected a Reference Type"

let pull_arg_from_tree s = function
  | Parser_plaf.Ast.TreeType a -> return a
  | _ -> error @@ s^"Expected a Tree Type"

let arg_of_listType s = function
| Parser_plaf.Ast.ListType(t) -> return t
| _ -> error @@ s^"Expected a List Type"

let rec chk_expr : expr -> texpr tea_result =
  fun e ->
  match e with
  | Int _n -> return IntType
  | Var id -> apply_tenv id
  | IsZero(e) ->
    chk_expr e >>= fun t ->
    if t=IntType
    then return BoolType
    else error "isZero: expected argument of type int"
  | Add(e1,e2) | Sub(e1,e2) | Mul(e1,e2)| Div(e1,e2) ->
    chk_expr e1 >>= fun t1 ->
    chk_expr e2 >>= fun t2 ->
    if (t1=IntType && t2=IntType)
    then return IntType
    else error "arith: arguments must be ints"
  | ITE(e1,e2,e3) ->
    chk_expr e1 >>= fun t1 ->
    chk_expr e2 >>= fun t2 ->
    chk_expr e3 >>= fun t3 ->
    if (t1=BoolType && t2=t3)
    then return t2
    else error "ITE: condition not boolean or types of then and else do not match"
  | Let(id,e,body) ->
    chk_expr e >>= fun t ->
    extend_tenv id t >>+
    chk_expr body
  | Proc(var,Some t1,e) ->
    extend_tenv var t1 >>+
    chk_expr e >>= fun t2 ->
    return @@ FuncType(t1,t2)
  | Proc(_var,None,_e) ->
    error "proc: type declaration missing"
  | App(e1,e2) ->
    chk_expr e1 >>=
    pair_of_funcType "app: " >>= fun (t1,t2) ->
    chk_expr e2 >>= fun t3 ->
    if t1=t3
    then return t2
    else error "app: type of argument incorrect"
  | Letrec([(_id,_param,None,_,_body)],_target) | Letrec([(_id,_param,_,None,_body)],_target) ->
    error "letrec: type declaration missing"
  | Letrec([(id,param,Some tParam,Some tRes,body)],target) ->
    extend_tenv id (FuncType(tParam,tRes)) >>+
    (extend_tenv param tParam >>+
     chk_expr body >>= fun t ->
     if t=tRes 
     then chk_expr target
     else error "LetRec: Type of recursive function does not match
declaration")
   | Pair(e1,e2) ->
    chk_expr e1 >>= fun t1 ->
    chk_expr e2 >>= fun t2 ->
    return @@ PairType(t1,t2)
  | Unpair(id1,id2,e1,e2) ->
    chk_expr e1 >>= fun t ->
    (match t with
     | PairType(t1,t2) ->
    extend_tenv id1 t1 >>+
    extend_tenv id2 t2 >>+
    chk_expr e2
     | _ -> error "unpair: expected a pair")
      
  (* EXPLICIT-REFS *)
  | BeginEnd([]) ->
    return @@ UnitType
  | BeginEnd(es) ->
      List.fold_left (fun x y -> chk_expr y) (chk_expr @@ List.hd es) (List.tl es) >>= fun t ->
      return t
  | NewRef(e) ->
    chk_expr e >>= fun t ->
    return @@ RefType(t)
  | DeRef(e) ->
    chk_expr e >>=
    pull_arg_from_ref "deref: " >>= fun s ->
    return s
  | SetRef(e1,e2) ->
    chk_expr e1 >>=
    pull_arg_from_ref "setref: " >>= fun r ->
    chk_expr e2 >>= fun i ->
    return UnitType
  
    (* lists *)
  | EmptyList(None) ->
    error "Expected a type"
  | EmptyList(Some t) ->
    return @@ ListType(t)
  | Cons(h, t) ->
    chk_expr t >>=
    arg_of_listType "cons: " >>= fun tl ->
    chk_expr h >>= fun hd ->
    if hd = tl
    then return (ListType(tl))
    else error "type of head and tail do not match"
  | IsEmpty(e) ->
    chk_expr e >>= fun t ->
    begin 
    match t with
    | ListType(_)
    | TreeType(_) -> return BoolType
    | _ -> error "Expected a List or Tree"
    end

  | Hd(e) ->
    chk_expr e >>=
    arg_of_listType "hd: " >>= fun h ->
    return h
  | Tl(e) ->
    chk_expr e >>=
    arg_of_listType "tl: " >>= fun t ->
    return (ListType(t))
  
  (* tree *)
  | EmptyTree(None) ->
    error "Expected a type"
  | EmptyTree(Some t) ->
    return @@ TreeType(t)
  | Node(de, le, re) ->
    chk_expr le >>=
    pull_arg_from_tree "tree: " >>= fun l ->
    chk_expr re >>=
    pull_arg_from_tree "tree: " >>= fun r ->
    chk_expr de >>= fun d ->
    return (TreeType(d))
  | CaseT(target,emptycase,id1,id2,id3,nodecase) ->
    chk_expr target >>= 
    pull_arg_from_tree "caseT: " >>= fun tar ->
    chk_expr @@ Var(id1) >>= fun d ->
    chk_expr @@ Var(id2) >>= pull_arg_from_tree "caseT: " >>= fun lt ->
    chk_expr @@ Var(id3) >>= pull_arg_from_tree "caseT: " >>= fun rt ->
    if not (d = tar && lt = rt && d = lt) then error "Tree types do not match" else
    chk_expr emptycase >>= fun ec ->
    chk_expr nodecase >>= fun nc ->
    if ec = nc then return nc else error "nodecase type does not match emptycase type"
  | Debug(_e) ->
    string_of_tenv >>= fun str ->
    print_endline str;
    error "Debug: reached breakpoint"
  | _ -> failwith "chk_expr: implement"    
and
  chk_exprs =
  fun es ->
  match es with
  | [] -> return []
  | h::tl -> chk_expr h >>= fun t ->
    chk_exprs tl >>= fun ts ->
    return (t::ts)
and
  chk_prog (AProg(_,e)) =
  chk_expr e

(* Type-check an expression *)
let chk (e:string) : texpr result =
  let c = e |> parse |> chk_prog
  in run_teac c

let chkpp (e:string) : string result =
  let c = e |> parse |> chk_prog
  in run_teac (c >>= fun t -> return @@ string_of_texpr t)



