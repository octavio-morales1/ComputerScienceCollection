(*
Name: Octavio Morales
CS 510 — Assignment 1
*)

type program= int list
let letter_e : program= [0;2;2;3;3;5;5;4;3;5;4;3;3;5;5;1]

(* Helper functions provided in slides *)
let rec map f l=
  match l with
  | []-> []
  | x::xs-> (f x)::(map f xs)

let rec fold_right f l a=
  match l with
  | []-> a
  | x::xs-> f x (fold_right f xs a)


(* Task 1: function that  returns a program that draws the mirror image of the input program *)
let mirror_image (p : int list) : int list=
  let temp1 y=
    match y with
    | 0-> 0
    | 1-> 1
    | 2-> 4
    | 3-> 5
    | 4-> 2
    | 5-> 3
    | x-> x
  in map temp1 p

(* Task 2: Function that given a program returns a new one which draws the same pictures except that
they are rotated 90 degrees.*)
let rotate_90_letter (p : int list) : int list=
  let temp2 y=
    match y with
    | 0-> 0
    | 1-> 1
    | 2-> 3
    | 3-> 4
    | 4-> 5
    | 5-> 2
    | x-> x
  in map temp2 p

(* Task 3: Function that given a list of programs that represent letters returns a new list in which each
program draws the same pictures except that they are rotated 90 degrees. *)
let rotate_90_word (ws : int list list) : int list list =
  map rotate_90_letter ws

(* Task 4: Function such that repeat n x returns a list with n copies of x *)
let rec repeat (n : int) (x : 'a) : 'a list=
  if n <= 0
  then []
  else x:: repeat (n - 1) x

(* Task 5: Function such that pantograph n p returns a program that draws the same things as p only enlarged n-fold. Instructions state to have three variations for map, no map, then fold*)
(* with map *)
let pantograph (n : int) (p : int list) : int list=
  let expand i = if i = 0 || i = 1
  then [i]
  else repeat n i
  in fold_right (@) (map expand p) []

(* without map *)
let pantograph_nm (n : int) (p : int list) : int list =
  let rec go tempList=
    match tempList with
    | []-> []
    | i:: is ->
        if i= 0 || i= 1
        then i:: go is
        else (repeat n i) @ go is
  in go p

(* with fold *)
let pantograph_f (n : int) (p : int list) : int list =
  fold_right (fun i acc ->
       if i= 0 || i= 1
       then i:: acc
       else (repeat n i) @ acc)
    p []

(* Task 6: Function that given a starting coordinate and a program returns the list of coordinates that the
program visits *)
let coverage (start_xy : int * int) (p : int list) : (int * int) list =
  let temp3 (x, y) task=
    match task with
    | 0-> (x,y)
    | 1-> (x, y)
    | 2-> (x, y+1)
    | 3-> (x+1, y)
    | 4-> (x, y-1)
    | 5-> (x-1, y)
    | _-> (x, y)
  in let rec pathFunct cur rem =
    match rem with
    | []-> [cur]
    | head :: tail -> cur :: pathFunct (temp3 cur head) tail
  in pathFunct start_xy p

(* Task 7: Function that compresses a program by replacing adjacent copies of the same instruction with a tuple (m,n) where m is the instruction and n is the number of consecutive times it should be executed *)

let rec compress (lst : int list) : (int * int) list=
  match lst with
  | [] -> []
  | x :: xs ->
      let rec run m cnt r =
        match r with
        | y :: ys when y = m -> run m (cnt + 1) ys
        | _-> (m, cnt) :: compress r
      in run x 1 xs

(* Task 8: Function that decompresses a compressed program. *)
(* without map *)
let rec uncompress (pairs : (int * int) list) : int list=
  match pairs with
  | []-> []
  | (m, n):: ps -> (repeat n m) @ uncompress ps

(* with map *)
let uncompress_m (pairs : (int * int) list) : int list=
  let expand_pair (x, y) = repeat y x
  in fold_right (@) (map expand_pair pairs) []

(* with fold *)
let uncompress_f (pairs : (int * int) list) : int list =
  let combine (x, y) acc = (repeat y x) @ acc
  in fold_right combine pairs []

(* Task 9: that optimizes a program by eliminating redundant pen up and pen down instructions. *)
(* Note: 1982 means up, 1997 means down *)
let optimize (p : program) : program =
  let rec go state tempList=
    match tempList with
    | [] -> []
    | head :: tail ->
        (match head, state with
        | 0, 1982-> 0 :: go 1997 tail
        | 0, 1997-> go 1997 tail
        | 1, 1997-> 1 :: go 1982 tail
        | 1, 1982-> go 1982 tail
        | d, st-> d :: go st tail)
  in go 1982 p
