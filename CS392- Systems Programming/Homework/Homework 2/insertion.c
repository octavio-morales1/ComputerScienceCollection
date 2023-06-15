/*
Name: Octavio Morales
Pledge: I pledge my honor that I have abided by the Stevens Honor System.
*/
#include "insertion.h"
#include <stdlib.h>
#include <string.h>

/*
	We emphasize this: because this is a generic implementation, in insertion.c you must not use if-else to
	discriminate different data types in your code. Your code must be able to deal with any data type possible.
	Therefore, we limit the usage of the following primitive types:
	- int or size_t: only allowed as loop iterators;
	- char or u_int8_t: can be used as you wish;
	- Types that are used in the declarations of iSort() and iPrint(): feel free to use them for their _original_
      purpose;
	- All other types are not allowed to appear in insertion.c: no exceptions, no matter if you actually used
	  them, or what purpose it is. Once it appears, you will receive 30% reduction of the homework.

	You are free to create helper functions only in insertion.c; you must declare and implement them in the
    .c file instead of the header files. Do not change any of the header files.
	
*/


void iSort(void* base, size_t nel, size_t width, int (*compare)(void*,void*)) {
	
	/* Your code here */
	/* Self Explanatory: Insertion sort with all generic types. */
	for(size_t x=1; x<nel; x++){
		for(size_t y=x; y>0; y--){
			if((*compare)((void*)((char*)base+y*width), (void*)((char*)base+(y-1)*width))>=0){
				break;
			}
			char temp[width];
			memcpy(temp, (void*)((char*)base+y*width), width);
			memcpy((void*)((char*)base+y*width), (void*)((char*)base+(y-1)*width), width);
			memcpy((void*)((char*)base+(y-1)*width), temp, width);
		}
	}
	
}


void iPrint(void* base, size_t nel, size_t width, void (*print)(void*)) {
	
	/* Your code here */
	/* Self Explanatory: Prints */
	for(size_t x=0; x<nel; x++){
		(*print)((void*)((char*) base+x*width));
		printf("\n");
	}
}