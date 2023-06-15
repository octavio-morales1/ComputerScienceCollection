/*******************************************************************************
 * Name        : unique.cpp
 * Author      : Octavio Morales
 * Date        : 10/1/2022
 * Description : Determining uniqueness of chars with int as bit vector.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <cctype>

using namespace std;

bool is_all_lowercase(const string &s) {
    // TODO: returns true if all characters in string are lowercase
    // letters in the English alphabet; false otherwise.

	// Iterates through the for loop/
	for(char spot: s){
		// If statement is the determining factor on if the letter of s is in the range of 97-122, the
		// range for lowercase letters for ascii.
		if(((int) spot)> 122 || ((int) spot)< 97){
			return false;
		}
	}

	// Returns true because the if statement in the loop has not for a non-lowercase letter.
	return true;

}

bool all_unique_letters(const string &s) {
    // TODO: returns true if all letters in string are unique, that is
    // no duplicates are found; false otherwise.

    // You MUST use only a single int for storage and work with bitwise
    // and bitshifting operators.  Using any other kind of solution will
    // automatically result in a grade of ZERO for the whole assignment.

	// Determines if the string is one letter wrong (it would already be unique).
	if(s.size()==1){
		return true;
	}

	// Storage variable
	unsigned int storage= 0;

	// Iterates through each letter of s
	for(char spot: s){
		// If statement is the determining factor on if the string has unique letters.
		// Whenever the if statement becomes false, it means there are duplicate letters.
		if(((storage >> (((int) spot)-97)) & 1)<1){
			storage|= (1 << (((int) spot)- 97));
		}
		else{
			return false;
		}
	}

	// Returns true because the if statement in the for loop has not found any duplicates.
	return true;
}

int main(int argc, char * const argv[]) {
    // TODO: reads and parses command line arguments.
    // Calls other functions to produce correct output.


	// If statement to determine if there are only two inputs, the command and the single parameter.
	if(argc!=2){
		cerr << "Usage: ./unique <string>" << endl;
	}
	// Since the if statement is false, there are only two inputs, so we can run the functions.
	else{

		// Gives an error if the parameters doesn't have ALL lowercase letters.
		if(!(is_all_lowercase(argv[1]))){
			cerr << "Error: String must contain only lowercase letters." << endl;
		}
		// Prints a message letting the user know that the parameter input has duplicate letters.
		if(!(all_unique_letters(argv[1])) && (is_all_lowercase(argv[1]))){
			cout << "Duplicate letters found." << endl;
		}
		// Prints a message letting the user know that the parameter input does not have duplicate letters.
		if((all_unique_letters(argv[1])) && (is_all_lowercase(argv[1]))){
			cout << "All letters are unique." << endl;
		}
	}
}
