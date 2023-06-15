/*******************************************************************************
 * Name        : stairclimber.cpp
 * Author      : Octavio Morales
 * Date        : October 8, 2022
 * Description : Lists the number of ways to climb n stairs.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <iomanip>

using namespace std;

//Return a vector of vectors of ints representing
//the different combinations of ways to climb num_stairs
vector< vector<int> > get_ways(int num_stairs) {
    // TODO: Return a vector of vectors of ints representing
    // the different combinations of ways to climb num_stairs
    // stairs, moving up either 1, 2, or 3 stairs at a time.
	/*
	 *
	//Dead code with original ideas for homework.
	vector<vector<int>> outer;
	vector<int> inner;
	if(num_stairs==1){
		return {{1}};
	}
	if(num_stairs==2){
		inner.push_back(1);
		inner.push_back(1);
		outer.push_back(inner);
		inner.clear();
		inner.push_back(2);
		outer.push_back(inner);
		return outer;
	}
	if(num_stairs==3){
		inner.push_back(1);
		inner.push_back(1);
		inner.push_back(1);
		outer.push_back(inner);
		inner.clear();
		inner.push_back(1);
		inner.push_back(2);
		outer.push_back(inner);
		inner.clear();
		inner.push_back(2);
		inner.push_back(1);
		outer.push_back(inner);
		inner.clear();
		inner.push_back(3);
		outer.push_back(inner);
		inner.clear();
		return outer;
	}
	else{
		vector<vector<int>> temp1= get_ways(num_stairs-1);
		vector<vector<int>> temp2= get_ways(num_stairs-2);
		vector<vector<int>> temp3= get_ways(num_stairs-3);
		return threeway(temp1, temp2, temp3);
	}
	*/

	//Base case to end recursive function by returning an empty vector, because at this point, the code is over.
	if(num_stairs==0){
		return {{}};
	}


	vector<vector<int>> outer;
	//Nested for loops
	for(int x=1; x<4; x++){
		//If statement to determine if num_stairs is greater than or equal to x.
		//If false, it keeps the recursion from occurring, keeping num_stairs-x from going negative (not allowed).
		if(num_stairs>=x){
			//The line below this is the recursive step to split the combinations. Ex. 3 splits into 2,1; 1,2; or 3
			vector<vector<int>> inner= get_ways(num_stairs-x);
			//For loop to insert the new step value into the inner vector.
			for(size_t y=0; y< inner.size(); y++){
				inner[y].insert(inner[y].begin(),x);
			}
			outer.reserve(outer.size() + inner.size());
			outer.insert(outer.end(), inner.begin(), inner.end());

		}
	}
	return outer;
}

//Dead code with original ideas for homework.
/*
vector<vector<int>> threeway(vector<vector<int>> A, vector<vector<int>> B, vector<vector<int>> C){
	vector<vector<int>> ans;
	ans.reserve(A.size() + B.size() + C.size());
	ans.insert( ans.end(), A.begin(), A.end() );
	ans.insert( ans.end(), B.begin(), B.end() );
	ans.insert( ans.end(), C.begin(), C.end() );
	return ans;
}

vector<vector<int>> c_v(vector<vector<int>> A, vector<vector<int>> B){
	vector<vector<int>> ans;
	ans.reserve(A.size() + B.size());
	ans.insert( ans.end(), A.begin(), A.end() );
	ans.insert( ans.end(), B.begin(), B.end() );
	return ans;
}
*/

//Display the ways to climb stairs
void display_ways(const vector< vector<int> > &ways) {
    // TODO: Display the ways to climb stairs by iterating over
    // the vector of vectors and printing each combination.

	//For loop to give the proper display for each combination of ways to climb a certain number of steps.
	for(size_t x= 0; x<ways.size(); x++){
		//Most of the code below makes the spacing for each number. Yes I could have done it by setting a
		//fixed width, but I completely forgot about it until I finished.
		int max_spaces= 0;
		int cn_spaces= 0;
		for(size_t z=ways.size(); z>0; z/=10){
			max_spaces++;
		}
		for(size_t z=x+1; z>0; z/=10){
			cn_spaces++;
		}
		for(int z=0; z<max_spaces-cn_spaces; z++){
			cout<< " ";
		}

		//This segment of the code displays the inner vectors in the correct format, before moving to the next line
		//and repeating the process with ecah iteration.
		cout<< x+1 << ". [";
		for(size_t y=0; y<ways[x].size(); y++){
			cout<< ways[x][y];
			if(y!=ways[x].size()-1){
				cout<< ", ";
			}
		}
		cout<< "]" << endl;
	}
}

//Main function to run all of the code for the user.
int main(int argc, char * const argv[]) {
	//Determines if there are not two inputs.
	if(argc!=2){
		//If there are not two inputs, it gives this error.
		cerr << "Usage: ./stairclimber <number of stairs>" << endl;
	}
	//Determines if argv[1] is a positive integer.
	else if(atoi(argv[1])<=0){
		//If the parameter (argv[1]) is not a positive integer, it gives this error.
		cerr <<  "Error: Number of stairs must be a positive integer." << endl;
	}
	//Else statement for when the inputs are correct with the right parameters.
	else{
		vector<vector <int>>temp= get_ways(atoi(argv[1]));
		//If statement to determine how many ways there are to climb 1 stair because of grammar.
		if(atoi(argv[1])==1){
			//Prints that there is 1 way to climb 1 stair
			cout<< temp.size() << " way to climb 1 stair." << endl;
		}
		//Else condition for every other positive integer, because the grammar will be the same.
		else{
			//Prints how many ways there are to climb argv[1] stairs.
			cout<< temp.size() << " ways to climb " << atoi(argv[1]) << " stairs."<< endl;
		}
		//Displays every possible combination of ways to climb argv[1] stairs.
		display_ways(temp);
	}
}
