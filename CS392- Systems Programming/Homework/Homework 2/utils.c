/* 
Name: Octavio Morales
Pledge: I pledge my honor that I have abided by the Stevens Honor System.
*/

#include "utils.h"
#include <stdlib.h>
#include <string.h>

/*
	You are free to use any data type you like in this file.
    However, other than the five functions declared in "utils.h",
    DO NOT create any other functions.
	
*/

int cmpr_int(void* a, void* b) {
	
	/* Your code here */
	int* tempA= (int*) a;
	int* tempB= (int*) b;
	return (*tempA-*tempB);

}

int cmpr_float(void* a, void* b) {
	
	/* Your code here */
	float* tempA= (float*)a;
	float* tempB= (float*)b;
	if((*tempA)==(*tempB)){
		return 0;
	}
	if(*(tempA)>*(tempB)){
		return 1;
	}
	return -1;
}

void print_int(void* a) {
	
	/* Your code here */
	int* tempA= (int*) a;
	printf("%d", *tempA);

}

void print_float(void* a) {
	
	/* Your code here */
	float* tempA= (float*) a;
	printf("%f", *tempA);
}


void* read_array(char* filename, char* format, size_t* len) {
    FILE* shu= fopen(filename, "r");
/* checks for errors */
    if (shu == NULL) {
        fprintf(stderr, "File failed to open.\n");
        exit(1);
    }
    if((strcmp(format, "%d") != 0) && (strcmp(format, "%f") != 0)){
        fprintf(stderr, "Invalid format.\n");
        exit(1);
    }
/* at this point, there are no errors */
    int maximumL= 1000;
    int tempL= 0;
    void* tempArray= NULL;

    /* next two if statements are if the format is in int or float respectively.*/
    if(strcmp(format, "%d")== 0) {
        tempArray= malloc(maximumL*sizeof(int));
        int cur_int;
        /* scans the file */
        while(fscanf(shu,"%d",&cur_int)!=EOF) {
            if (tempL== maximumL) {
                maximumL= maximumL*2;
                tempArray= realloc(tempArray, maximumL * sizeof(int));
            }
            int* LetHimPoint= (int*)((char*)tempArray + tempL * sizeof(int));
            *LetHimPoint= cur_int;
            tempL++;
        }
    } 
    else if(strcmp(format, "%f")== 0) {
        tempArray= malloc(maximumL* sizeof(float));
        float floater;
        /* scans the file */
        while (fscanf(shu, "%f", &floater)!= EOF) {
            if (tempL==maximumL) {
                maximumL= maximumL*2;
                tempArray= realloc(tempArray, maximumL*sizeof(float));
            }
            float* LetHimPoint= (float*)((char*)tempArray+tempL*sizeof(float));
            *LetHimPoint= floater;
            tempL++;
        }
    }

    fclose(shu);
    *len = tempL;
    return tempArray;

}