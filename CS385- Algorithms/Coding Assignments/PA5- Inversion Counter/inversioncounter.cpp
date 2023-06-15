/*******************************************************************************
 * Name        : inversioncounter.cpp
 * Author      : Octavio Morales
 * Version     : 1.0
 * Date        : November 5, 2022
 * Description : Counts the number of inversions in an array.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <algorithm>
#include <sstream>
#include <vector>
#include <cstdio>
#include <cctype>
#include <cstring>
#include <string.h>

using namespace std;

// Function prototype.
static long mergesort(int array[], int scratch[], int low, int high);

/**
 * Counts the number of inversions in an array in Theta(n^2) time.
 */
long count_inversions_slow(int array[], int length) {
    // TODO
	//temporary counter variable for the number of inversions
	long ctr = 0;
	//nested for loop to iteratively count the number of inversions
	for(int x=0; x<length; x++){
		for(int y=x+1; y<length; y++){
			//if statement to count whenever array[y] is less than array[x]
			if(array[y]<array[x]){
				//Increases ctr by 1 for each inversion
				ctr++;
			}
		}
	}
	//returns the counter (number of inversions)
	return ctr;
}

/**
 * Counts the number of inversions in an array in Theta(n lg n) time.
 */
long count_inversions_fast(int array[], int length) {
    // TODO
    // Hint: Use mergesort!

	int *temp = new int[length]; //temp is made as a substitute scratch array
	long count = mergesort(array, &temp[0], 0, length-1); //total amount of inversions
	delete [] temp; //deletes the temp array to prevent leaked memory
	return count; //returns the total amount of inversions
}

static long merger(int array[], int scratch[], int low, int mid, int high){
	//The code for this function was provided as pseudocode in class
	//temporary counter variable to count the number of inversions
	long ctr= 0;
	int i1= low;
	int i2= mid;
	int i= low;
	while((i1<mid) && (i2<=high)) {
		if (array[i1]<=array[i2]) {
			//Stores array[i1++] to scratch[i++]
			scratch[i++]=array[i1++];
		}
		else {
			//stores array[i2++] to scratch[i++]
			scratch[i++]=array[i2++];
			//Increase ctr by mid-i1 (instead of incrementing ctr by 1 for every single individual inversion, we do it for the actual inversion)
			ctr= ctr+(mid-i1);
		}
	}
	// Copy the remaining elements of low subarray
	// (if there are any) to temp
	for(int x=i1; x<mid; x++){
		scratch[i++]= array[i1++];
	}
	// Copy the remaining elements of high subarray
	// (if there are any) to temp
	for(int x=i2; x<=high; x++){
		scratch[i++]= array[i2++];
	}
	//Iterates through the merged elements and moves it to the array
	for (int x=low; x<=high; x++){
		array[x] = scratch[x];
	}
	//Returns the counter variable (number of inversions)
	return ctr;
}

static long mergesort(int array[], int scratch[], int low, int high) {
    // TODO
	//Counter variable gets made to count the number of inversions.
	//The code for this function was provided as pseudocode in class
	long ctr=0;
	int mid=0;
	//If statement to check if low is less than high (prevents code from going out of bounds)
	if(low<high){
		mid= (high+low)/2; //Gets the midpoint
		ctr+=mergesort(array, scratch, low, mid); //Recurses using the first half of the the array
		ctr+=mergesort(array, scratch, mid+1, high); //Recurses using the second half of the array
		ctr+=merger(array, scratch, low, mid+1, high); //Merges array and scratch
	}
	return ctr; //returns the counter variable (number of inversions)
}

int main(int argc, char *argv[]) {
    // TODO: parse command-line argument
	//Checks if argc is greater than 2 (prevents incorrect number of inputs)
	if(argc>2){
		cout << "Usage: ./inversioncounter [slow]" << endl;
		return 0;
	}
	//Checks if the input at argv[1] is 'slow' rather than anything else
	if(argc==2 && (strcmp(argv[1], "slow"))){
		cout<< "Error: Unrecognized option '"<< argv[1] << "'." << endl;
	    return 0;
	}

	//Prints a message asking the user to enter a sequence of numbers
    cout << "Enter sequence of integers, each followed by a space: " << flush;

    istringstream iss;
    int value, index = 0;
    vector<int> values;
    string str;
    str.reserve(11);
    char c;
    //While loop to collect all values from the input while also checking if the input was valud.
    while (true) {
        c = getchar();
        const bool eoln = c == '\r' || c == '\n';
        if (isspace(c) || eoln) {
            if (str.length() > 0) {
                iss.str(str);
                if (iss >> value) {
                    values.push_back(value);
                } else {
                    cerr << "Error: Non-integer value '" << str
                         << "' received at index " << index << "." << endl;
                    return 1;
                }
                iss.clear();
                ++index;
            }
            if (eoln) {
                break;
            }
            str.clear();
        } else {
            str += c;
        }
    }
    // TODO: produce output
    // Checks if the input was empty. Prints an error if there was no integer input
    if(values.size()==0) {
		cerr << "Error: Sequence of integers not received." << endl;
		return 0;
	}
    // Checks if the user wanted to use the slow, iterative, method. Prints the number of inversions.
    if(argc==2 && !(strcmp(argv[1], "slow"))){
    	cout<< "Number of inversions: " << count_inversions_slow(&values[0], values.size()) << endl;
    	return 0;
    }
    // Prints the number of inversions using the faster, recursive, method.
    cout<< "Number of inversions: " << count_inversions_fast(&values[0], values.size()) << endl;

    return 0;
}
