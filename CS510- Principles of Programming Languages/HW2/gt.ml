(*
Name: Octavio Morales
CS 510 — Assignment 2
*)

type 'a gt = Node of 'a * ('a gt) list

(*Provided In Instructions*)
let mk_leaf (n: 'a) : 'a gt= Node (n, [])
let t : int gt= Node (33, [Node (12, []); Node (77, [Node (37, [Node (14, [])]); Node (48, []); Node (103, [])])])
let t2 : int gt = Node (10, [Node (20, [ Node (40, []); Node (50, []) ]); Node (30, [ Node (60, [ Node (70, []); Node (80, []) ]) ]); Node (90, []) ])

(* Note: I was unsure when using some functions, but nowhere in the homework instructions did it say I can't use functions provided in class*)
(* Helper Functions Provided In Slides *)
let rec map_list f l =
    match l with
        | []->[]
        | (x::xs) -> (f x)::(map_list f xs)

let rec fold_right f l a =
    match l with
        | [] -> a
        | (x::xs) -> f x (fold_right f xs a)

(*Helper Functions For Later Functions*)
let rec min1 y xs =
    match xs with
        | [] -> y
        | x::xs2 -> 
            min1 (if x < y 
                then x 
                else y) xs2

let rec max1 y xs =
    match xs with
        | [] -> y
        | x::xs2 -> 
            max1 (if x > y 
                then x 
                else y) xs2

let rec reversing xs acc =
    match xs with
        | [] -> acc
        | x::xs2 -> reversing xs2 (x::acc)

let rebuild v rs = 
    match rs with
        | [] -> mk_leaf v
        | _  -> Node (v, reversing rs [])

(* Task 1: height: that given a general tree returns its height. The height of a tree is the length of the longest path from the root to a leaf *)
let rec height (t: 'a gt) : int =
    match t with
        | Node (_, []) -> 1
        | Node (_, rest) ->
            1 + fold_right max (map_list height rest) 0

(* Task 2: size: that given a general tree returns its size. The size of a general tree consists of the number of nodes. *)
let rec size (t: 'a gt) : int =
    match t with
        | Node (_, rest) -> 1 + fold_right (fun c s -> s + size c) rest 0

(* Task 3: paths_to_leaves t: returns a list with all the paths from the root to the leaves of the general tree t. *)
let rec paths_to_leaves (t: 'a gt) : int list list =
    match t with
        | Node (_, []) -> [[]]
        | Node (_, rest) ->
            let rec loop (temp: int) (rest: 'a gt list) : int list list =
                match rest with
                    | [] -> []
                    | c::rs ->
                        let tempList = map_list (fun p -> temp::p) (paths_to_leaves c)
                        in tempList @ loop (temp+ 1) rs
            in loop 0 rest

(* Task 4. is_leaf_perfect: that determines whether a general tree is leaf perfect. A general tree is said to be leaf perfect if all leaves have the same depth. *)
let is_leaf_perfect (t: 'a gt) : bool =
    let tempp = map_list List.length (paths_to_leaves t) in
        match tempp with
            | [] -> true
            | d::ds ->
                let mn= min1 d ds in
                let mx= max1 d ds in
                if mn= mx
                    then true
                    else false

(* Task 5. preorder: that returns the pre-order traversal of a general tree. *)
let rec preorder (t: 'a gt) : 'a list =
    match t with
        | Node (v, rest) -> v::fold_right (@) (map_list preorder rest) []

(* Task 6. mirror: that returns the mirror image of a general tree. *)
let rec mirror (t: 'a gt) : 'a gt =
    match t with
        | Node (v, rest) ->
            let children = map_list mirror rest
            in Node (v, reversing children [])

(* Task 7. map f t: that produces a general tree resulting from t by mapping function f to each data item in d.  *)
let rec map (f: 'a -> 'b) (t: 'a gt) : 'b gt =
    match t with
        | Node (v, rest) ->
            let rec map_children f ts =
                match ts with
                    | []-> []
                    | c::rs-> map f c :: map_children f rs
        in Node (f v, map_children f rest)

(* Task 8. fold f t: that encodes the recursion scheme over general trees. *)
let rec fold (f: 'a -> 'b list -> 'b) (t: 'a gt) : 'b =
  match t with
  | Node (v, rest) ->
        let rec collect (ts: 'a gt list) : 'b list =
            match ts with
                | [] -> []
                | c::rs -> fold f c::collect rs
        in f v (collect rest)

(* Task 9. Implement mirror’ using fold. *)
let mirror' (t: 'a gt) : 'a gt =
    fold rebuild t

(* Task 10. degree: that returns the maximum number of children that a node in the tree has *)
let rec degree (t: 'a gt) : int =
  match t with
  | Node (_, rest) ->
        let rec max_deg_of_list ts =
            match ts with
                | []-> 0
                | c::rs->
                    let d= degree c in
                    let dr= max_deg_of_list rs in
                    if d > dr
                        then d
                        else dr
        in
        let here= List.length rest in
        let below= max_deg_of_list rest in
        if here > below 
            then here
            else below
