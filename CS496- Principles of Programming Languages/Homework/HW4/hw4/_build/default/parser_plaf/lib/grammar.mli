
(* The type of tokens. *)

type token = 
  | UNPAIR
  | UNITTYPE
  | TL
  | TIMES
  | THEN
  | SUPER
  | SUM
  | SND
  | SETREF
  | SET
  | SEND
  | SEMICOLON
  | SELF
  | RRANGLE
  | RPAREN
  | REFTYPE
  | RBRACE
  | RANGLE
  | PROD
  | PROC
  | PLUS
  | PAIR
  | OF
  | NODE
  | NEWREF
  | NEW
  | MINUS
  | MIN
  | METHOD
  | MAXL
  | LPAREN
  | LLANGLE
  | LIST
  | LETREC
  | LET
  | LBRACE
  | LANGLE
  | ISZERO
  | ISNUMBER
  | INTTYPE
  | INTERFACE
  | INT of (int)
  | INSTANCEOF
  | IN
  | IMPLEMENTS
  | IF
  | ID of (string)
  | HD
  | FST
  | FIELD
  | EXTENDS
  | EQUALSMUTABLE
  | EQUALS
  | EOF
  | END
  | EMPTYTREE
  | EMPTYPRED
  | EMPTYLIST
  | ELSE
  | DOT
  | DIVIDED
  | DEREF
  | DEBUG
  | CONS
  | COMMA
  | COLON
  | CLASS
  | CAST
  | CASET
  | BOOLTYPE
  | BEGIN
  | AVG
  | ARROW
  | ABS

(* This exception is raised by the monolithic API functions. *)

exception Error

(* The monolithic API. *)

val prog: (Lexing.lexbuf -> token) -> Lexing.lexbuf -> (Ast.prog)
