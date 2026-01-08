/*******************************************************************************
 * Name        : unique.cpp
 * Author      : Octavio Morales
 * Date        : 10/1/2022
 * Description : Determining uniqueness of chars with int as bit vector.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <cctype>
#include <sstream>
#include <iomanip>

using namespace std;

bool is_all_lowercase(const string &s) {
    // TODO: returns true if all characters in string are lowercase
    // letters in the English alphabet; false otherwise.

	for(size_t x= 0; x<s.length(); x++){
		if((int) s[x]> 122 || (int) s[x]< 97){
			return false;
		}
	}
	return true;
	/*
	for(const char* spot = s.c_str(); spot!=0; spot++){
		if((*spot)>122 || (*spot)<97){
			return false;
		}
	}
	return true;
*/
}

bool all_unique_letters(const string &s) {
    // TODO: returns true if all letters in string are unique, that is
    // no duplicates are found; false otherwise.

    // You MUST use only a single int for storage and work with bitwise
    // and bitshifting operators.  Using any other kind of solution will
    // automatically result in a grade of ZERO for the whole assignment.
	if(s.size()==1){
		return true;
	}
	for(size_t x=0; x<s.size()-1; x++){
		int amt= (int)s[x];
		for(size_t y=x+1; y<s.size(); y++){
			if((amt ^ (int) s[y])==0 && x!=y){
				return false;
			}
		}
	}
	return true;
}

int main(int argc, char * const argv[]) {
    // TODO: reads and parses command line arguments.
    // Calls other functions to produce correct output.

	string inp;
	cin >> inp;
	string input;

	istringstream iss (inp);

	if(argc!=2){
		cerr << "Usage: ./unique <string>" << endl;
	}
	else{
		iss.clear();
		iss.str(argv[1]);
		iss >> inp;
		if(!(is_all_lowercase(inp))){
			cerr << "Error: String must contain only lowercase letters." << endl;
		}

		if(!(all_unique_letters(inp)) && (is_all_lowercase(inp))){
			cout << "Duplicate letters found." << endl;
		}

		if((all_unique_letters(inp)) && (is_all_lowercase(inp))){
			cout << "All letters are unique." << endl;
		}
	}
}
