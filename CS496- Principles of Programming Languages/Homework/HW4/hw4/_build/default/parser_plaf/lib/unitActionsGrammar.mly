%start prog
%token ABS
%token ARROW
%token AVG
%token BEGIN
%token BOOLTYPE
%token CASET
%token CAST
%token CLASS
%token COLON
%token COMMA
%token CONS
%token DEBUG
%token DEREF
%token DIVIDED
%token DOT
%token ELSE
%token EMPTYLIST
%token EMPTYPRED
%token EMPTYTREE
%token END
%token EOF
%token EQUALS
%token EQUALSMUTABLE
%token EXTENDS
%token FIELD
%token FST
%token HD
%token <string> ID
%token IF
%token IMPLEMENTS
%token IN
%token INSTANCEOF
%token <int> INT
%token INTERFACE
%token INTTYPE
%token ISNUMBER
%token ISZERO
%token LANGLE
%token LBRACE
%token LET
%token LETREC
%token LIST
%token LLANGLE
%token LPAREN
%token MAXL
%token METHOD
%token MIN
%token MINUS
%token NEW
%token NEWREF
%token NODE
%token OF
%token PAIR
%token PLUS
%token PROC
%token PROD
%token RANGLE
%token RBRACE
%token REFTYPE
%token RPAREN
%token RRANGLE
%token SELF
%token SEMICOLON
%token SEND
%token SET
%token SETREF
%token SND
%token SUM
%token SUPER
%token THEN
%token TIMES
%token TL
%token UNITTYPE
%token UNPAIR
%nonassoc ELSE EQUALS EQUALSMUTABLE IN
%right ARROW
%left LLANGLE MINUS PLUS RRANGLE
%left DIVIDED TIMES
%left DOT
%nonassoc REFTYPE
%type <unit> prog
%%

option_implements_declaration_:
  
    {}
| implements_declaration
    {}

option_type_annotation_:
  
    {}
| type_annotation
    {}

loption_separated_nonempty_list_COMMA_ID__:
  
    {}
| separated_nonempty_list_COMMA_ID_
    {}

loption_separated_nonempty_list_COMMA_expr__:
  
    {}
| separated_nonempty_list_COMMA_expr_
    {}

loption_separated_nonempty_list_COMMA_formal_par__:
  
    {}
| separated_nonempty_list_COMMA_formal_par_
    {}

loption_separated_nonempty_list_SEMICOLON_expr__:
  
    {}
| separated_nonempty_list_SEMICOLON_expr_
    {}

loption_separated_nonempty_list_SEMICOLON_field__:
  
    {}
| separated_nonempty_list_SEMICOLON_field_
    {}

loption_separated_nonempty_list_SEMICOLON_fieldtype__:
  
    {}
| separated_nonempty_list_SEMICOLON_fieldtype_
    {}

list_abstract_method_decl_:
  
    {}
| abstract_method_decl list_abstract_method_decl_
    {}

list_iface_or_class_decl_:
  
    {}
| iface_or_class_decl list_iface_or_class_decl_
    {}

list_method_decl_:
  
    {}
| method_decl list_method_decl_
    {}

list_obj_fields_:
  
    {}
| obj_fields list_obj_fields_
    {}

nonempty_list_rdecs_:
  rdecs
    {}
| rdecs nonempty_list_rdecs_
    {}

separated_nonempty_list_COMMA_ID_:
  ID
    {}
| ID COMMA separated_nonempty_list_COMMA_ID_
    {}

separated_nonempty_list_COMMA_expr_:
  expr
    {}
| expr COMMA separated_nonempty_list_COMMA_expr_
    {}

separated_nonempty_list_COMMA_formal_par_:
  formal_par
    {}
| formal_par COMMA separated_nonempty_list_COMMA_formal_par_
    {}

separated_nonempty_list_SEMICOLON_expr_:
  expr
    {}
| expr SEMICOLON separated_nonempty_list_SEMICOLON_expr_
    {}

separated_nonempty_list_SEMICOLON_field_:
  field
    {}
| field SEMICOLON separated_nonempty_list_SEMICOLON_field_
    {}

separated_nonempty_list_SEMICOLON_fieldtype_:
  fieldtype
    {}
| fieldtype SEMICOLON separated_nonempty_list_SEMICOLON_fieldtype_
    {}

prog:
  list_iface_or_class_decl_ expr EOF
    {}

expr:
  INT
    {}
| ID
    {}
| DEBUG LPAREN expr RPAREN
    {}
| expr PLUS expr
    {}
| expr MINUS expr
    {}
| expr TIMES expr
    {}
| expr DIVIDED expr
    {}
| ABS LPAREN expr RPAREN
    {}
| MIN LPAREN expr COMMA expr RPAREN
    {}
| SUM LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| PROD LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| AVG LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| MAXL LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| PAIR LPAREN expr COMMA expr RPAREN
    {}
| FST LPAREN expr RPAREN
    {}
| SND LPAREN expr RPAREN
    {}
| LET ID EQUALS expr IN expr
    {}
| LETREC nonempty_list_rdecs_ IN expr
    {}
| PROC LPAREN ID option_type_annotation_ RPAREN LBRACE expr RBRACE
    {}
| LPAREN expr expr RPAREN
    {}
| ISZERO LPAREN expr RPAREN
    {}
| ISNUMBER LPAREN expr RPAREN
    {}
| expr EQUALS expr
    {}
| expr RRANGLE expr
    {}
| expr LLANGLE expr
    {}
| NEWREF LPAREN expr RPAREN
    {}
| DEREF LPAREN expr RPAREN
    {}
| SETREF LPAREN expr COMMA expr RPAREN
    {}
| IF expr THEN expr ELSE expr
    {}
| SET ID EQUALS expr
    {}
| BEGIN loption_separated_nonempty_list_SEMICOLON_expr__ END
    {}
| LPAREN expr RPAREN
    {}
| LPAREN MINUS expr RPAREN
    {}
| LPAREN RPAREN
    {}
| LPAREN expr COMMA expr RPAREN
    {}
| UNPAIR LPAREN ID COMMA ID RPAREN EQUALS expr IN expr
    {}
| LANGLE loption_separated_nonempty_list_COMMA_expr__ RANGLE
    {}
| LET LANGLE loption_separated_nonempty_list_COMMA_ID__ RANGLE EQUALS expr IN expr
    {}
| EMPTYTREE
    {}
| NODE LPAREN expr COMMA expr COMMA expr RPAREN
    {}
| CASET expr OF LBRACE EMPTYTREE ARROW expr COMMA NODE LPAREN ID COMMA ID COMMA ID RPAREN ARROW expr RBRACE
    {}
| LBRACE loption_separated_nonempty_list_SEMICOLON_field__ RBRACE
    {}
| expr DOT ID
    {}
| expr DOT ID EQUALSMUTABLE expr
    {}
| NEW ID LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| SELF
    {}
| SEND expr ID LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| SUPER ID LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| LIST LPAREN loption_separated_nonempty_list_COMMA_expr__ RPAREN
    {}
| EMPTYLIST
    {}
| HD LPAREN expr RPAREN
    {}
| TL LPAREN expr RPAREN
    {}
| EMPTYPRED LPAREN expr RPAREN
    {}
| CONS LPAREN expr COMMA expr RPAREN
    {}
| INSTANCEOF LPAREN expr COMMA ID RPAREN
    {}
| CAST LPAREN expr COMMA ID RPAREN
    {}

rdecs:
  ID LPAREN ID option_type_annotation_ RPAREN option_type_annotation_ EQUALS expr
    {}

type_annotation:
  COLON texpr
    {}

field:
  ID EQUALS expr
    {}
| ID EQUALSMUTABLE expr
    {}

fieldtype:
  ID COLON texpr
    {}

iface_or_class_decl:
  CLASS ID EXTENDS ID option_implements_declaration_ LBRACE list_obj_fields_ list_method_decl_ RBRACE
    {}
| INTERFACE ID LBRACE list_abstract_method_decl_ RBRACE
    {}

implements_declaration:
  IMPLEMENTS ID
    {}

obj_fields:
  FIELD ID
    {}
| FIELD texpr ID
    {}

method_decl:
  METHOD ID LPAREN loption_separated_nonempty_list_COMMA_formal_par__ RPAREN LBRACE expr RBRACE
    {}
| METHOD texpr ID LPAREN loption_separated_nonempty_list_COMMA_formal_par__ RPAREN LBRACE expr RBRACE
    {}

abstract_method_decl:
  METHOD texpr ID LPAREN loption_separated_nonempty_list_COMMA_formal_par__ RPAREN
    {}

formal_par:
  ID option_type_annotation_
    {}

texpr:
  ID
    {}
| INTTYPE
    {}
| BOOLTYPE
    {}
| UNITTYPE
    {}
| texpr ARROW texpr
    {}
| texpr TIMES texpr
    {}
| LPAREN texpr RPAREN
    {}
| REFTYPE texpr
    {}
| LBRACE loption_separated_nonempty_list_SEMICOLON_fieldtype__ RBRACE
    {}

%%
