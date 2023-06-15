# Name: Octavio Morales
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.

#include rizz

a.out: main.o utils.o insertion.o
	gcc main.o utils.o insertion.o -o a.out

main.o: main.c
	gcc -c -g -Wall -Werror -pedantic-errors main.c 

utils.o: utils.c
	gcc -c -g -Wall -Werror -pedantic-errors utils.c

insertion.o: insertion.c
	gcc  -c -g -Wall -Werror -pedantic-errors insertion.c

clean:
	rm -rf *.o

