(* 

   Stub for HW2 
   Please
   1. Rename to gt.ml
   2. Place your name here:

    Name: Octavio Morales
    Pledge: I pledge my honor that I have abided by the Stevens Honor System.
*)



type 'a gt = Node of 'a*('a gt) list

let mk_leaf (n:'a) : 'a gt =
  Node(n,[])
    
let t : int gt =
 Node (33,
       [Node (12,[]);
        Node (77, 
              [Node (37, 
                     [Node (14, [])]); 
               Node (48, []); 
               Node (103, [])])
       ])

let t2 : int gt =
 Node (33,
       [Node (12,[]);
        Node (77, 
              [Node (37, 
                     [Node (14, [
                      Node (15, [Node (14, [Node (14, [])])])
                     ])]); 
               Node (48, []); 
               Node (103, [])])
       ])

let max: int -> int -> int =
  fun i1 i2 ->
  if i1>i2 then i1 else i2

let rec height t =
  match t with
  | Node(_, []) -> 1
  | Node(_, s) -> 
    match s with
    | [] -> 0
    | h::t -> (max (1+ height h) (height (Node (0, t)))) 
  (*  match e1 with
      | [] -> 0
      | s2::e2 -> (max (1+ height s1) (1+ height (Node(h1, e1)))) *)
    
let rec size t =
  match t with
  | Node(_, []) -> 1
  | Node(_, s) -> 
    match s with
    | [] -> 0
    | h::t -> 2 + (height h) + (height (Node (0, t)))

let rec paths_to_leaves (t: 'a gt) : int list list =
  match t with
  | Node(n, []) -> [[]]
  | Node(n, l) ->
      List.concat (List.mapi (fun i l2 -> List.map (fun ind -> i :: ind) (paths_to_leaves l2)) l)

let rec length_of_list l=
  match l with
  | [] -> 0
  | h::t -> 1 + length_of_list t

(* let rec helper_1: 'a list list -> bool=
  fun l->
    match l with
  | [] -> true
  | h::t -> if((length_of_list )=(helper_1 l)) then true else false *)
let rec rem_dup_helper: int list -> int -> int list=
  fun l s ->
  match l with
  | [] -> []
  | h::t -> 
    if s=h then (rem_dup_helper t s)
    else h::(rem_dup_helper t s)

(* This function returns a states list that removes all duplicate states. *)
let rec remove_duplicates: int list -> int list =
  fun l ->
  match l with
  | [] -> []
  | h::t -> h::(remove_duplicates (rem_dup_helper t h))

let rec is_leaf_perfect t =
  if (length_of_list (remove_duplicates (List.map List.length (paths_to_leaves t))))= 1 then true else false

let rec preorder (Node(d,ch)) =
    match ch with
    | [] -> [d]
    | h::t -> d::(List.flatten (List.map preorder ch))

let rec mirror (Node(d,ch)) =
    Node(d, (List.map mirror (List.rev_append ch [])))
  
let rec map f (Node(d,ch)) =
  Node(f d,List.map (map f) ch)
  
let rec fold : ('a ->'b list -> 'b) -> 'a gt -> 'b =
  fun f (Node(d,ch)) ->
    f d @@ List.map (fold f) ch

let sum t =
  fold (fun i rs -> i + List.fold_left (fun i j -> i+j) 0 rs) t

let mem t e =
  fold (fun i rs -> i=e || List.exists (fun i -> i) rs) t 

let mirror' t  = 
  match t with
  | Node(d, []) -> Node(d,[])
  | Node(d,ch) -> fold (fun i rs -> Node(i, List.rev(rs))) t

let rec degree t  = 
  match t with
  | Node(d, []) -> -1
  | Node(d, ch) -> 
    match ch with
    | [] -> 0
    | h::t -> (max (1+(degree @@ Node(d,t))) (degree h))

