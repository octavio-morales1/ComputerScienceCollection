open ReM
open Dst
open Parser_plaf.Ast
open Parser_plaf.Parser

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
    chk_expr (List.nth es ((List.length es) - 1)) >>= fun t ->
    return @@ t

  | NewRef(e) ->
    chk_expr e >>= fun t ->
    return @@ RefType(t)

  | DeRef(e) ->
      let helper = function
      | RefType(t) -> return t
      | _ -> error "deref: Expected a reference type"
  in
    chk_expr e >>= helper >>= fun t -> return @@ t
  
  | SetRef(e1,e2) ->
    let helper = function
    | RefType(t) -> return t
    | _ -> error "setref: Expected a reference type"
  in
    chk_expr e1 >>= helper >>= fun _ ->
    chk_expr e2 >>= fun _ ->
    return @@ UnitType

  (* list *)
  | EmptyList(None) ->
    return @@ (ListType UnitType)

  | EmptyList(Some t) ->
    return @@ (ListType t)

  | Cons(h, t) ->
    let helper = function
    | ListType(t) -> return t
    | _ -> error "Cons: Arguments must be lists"
  in
    chk_expr h >>= fun t1 ->
    chk_expr t >>= helper >>= fun t2 ->
    if (t1=t2)
      then return @@ ListType(t1)
      else error "cons: type of head and tail do not match"

  | IsEmpty(e) ->
    let helper = function
      | ListType(_) -> return BoolType
      | TreeType(_) -> return BoolType
      | _ -> error "IsEmpty: Argument must be a list"
    in
    chk_expr e >>= helper

  | Hd(e) ->
    let helper = function
      | ListType(t) -> return t
      | _ -> error "Cons: Arguments must be lists"
    in
      chk_expr e >>= helper >>= fun t1 ->
      return @@ t1

  | Tl(e) ->
    chk_expr e >>= fun t ->
    return @@ t

  (* tree *)
  | EmptyTree(None) ->
    return @@ (TreeType UnitType)

  | EmptyTree(Some t) ->
    return  @@ (TreeType t)

  | Node(de, le, re) ->
    let helper = function
      | TreeType(t) -> return t
      | _ -> error "Node: Arguments must be trees"
    in
    chk_expr de >>= fun t1 ->
    chk_expr le >>= helper >>= fun t2 ->
    chk_expr re >>= helper >>= fun t3 ->
    if (t1=t2 && t1=t3)
    then return @@ TreeType(t1)
    else error "node: type of left tree and right tree do not match"
      
  | CaseT(target,emptycase,id1,id2,id3,nodecase) ->
    chk_expr target >>= (function
    | TreeType element_type ->
        chk_expr emptycase >>= fun t1 ->
        chk_expr nodecase >>= fun t2 ->
        extend_tenv id1 element_type >>+
        extend_tenv id2 (TreeType element_type) >>+
        extend_tenv id3 (TreeType element_type) >>+
        if t1=t2 
        then return t1
        else error "caseT: Expected same types"
    ) 
    
  
    

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



