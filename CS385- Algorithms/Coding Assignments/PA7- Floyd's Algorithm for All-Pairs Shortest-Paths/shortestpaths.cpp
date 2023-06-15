/*******************************************************************************
 * Name        : shortestpaths.cpp
 * Author      : Octavio Morales & Brayan Paredes
 * Version     : 1.0
 * Date        : December 5, 2022
 * Description : Floyd Algorithm implemented in code - All Pairs Shortest Path
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/


#include <iostream>
#include <fstream>
#include <algorithm>
#include <sstream>
#include <vector>
#include <cstdio>
#include <cctype>
#include <cstring>
#include <limits>
#include <iomanip>

using namespace std;

//infinity declaration
long infinity = numeric_limits<long>::max();

long const HYPHEN = 45;

long const A = 65;

//this goes and makes matrices with 0's and possibile infinities

void fill_matrices(long** &vectorD, long** &vectorP, long integer_rep){
    for(long row = 0; row < integer_rep; row++){
        vectorD[row] = new long[integer_rep];
        vectorP[row] = new long[integer_rep];
        for(long column = 0; column < integer_rep; column++){
            if(row==column){
            	vectorD[row][column] = 0;
            	vectorP[row][column] = 0;
            }
            else if(row!=column){
            	vectorD[row][column]=infinity;
            	vectorP[row][column]=infinity;
            }
        }
    }
}


void displayTheTables(long** const matrix, const string &label, int num_vertices, bool use_letters) {
	cout << label << endl;
	long max_value = 0;
	for (int row = 0; row < num_vertices; row++) {
		for (int column = 0; column < num_vertices; column++) {
			long temp = matrix[row][column];
			if (temp < infinity && temp > max_value) {
				max_value = matrix[row][column];
			}
		}
	}
	int max_cell_width;
	if(use_letters==true){
		max_cell_width= to_string(max_value).length();
	}
	else{
		max_cell_width= to_string(max(static_cast<long>(num_vertices), max_value)).length();
	}
	cout << ' ';
	for (int x = 0; x < num_vertices; x++) {
		if(use_letters==true){
			cout << setw(max_cell_width) << static_cast<char>(x + 'A');
		}
		else{
			cout << setw(max_cell_width + 1) << static_cast<char>(x + 'A');
		}
	}
	cout << endl;
	for (int row = 0; row < num_vertices; row++) {
		cout << static_cast<char>(row + 'A');
		for (int column = 0; column < num_vertices; column++) {
			cout << " " << setw(max_cell_width);
			if(use_letters){
				cout << setw(max_cell_width -1);
			}
			if (matrix[row][column]==infinity) {
				cout << "-";
			}
			else if(use_letters){
				cout << static_cast<char>(matrix[row][column]);
			}
			else{
				cout << matrix[row][column];
			}
		}
		cout << endl;
	}
	cout << endl;
} 

//Textbook representation of Floyd's Algorithm
long** floyd(long** dist, long integer_rep){
    long** output = dist;
    for(long diagonal = 0; diagonal < integer_rep; diagonal++){
        for(long row = 0; row < integer_rep; row++){
            for(long column = 0; column < integer_rep; column++){
                if((output[row][diagonal] != infinity) && (output[diagonal][column] != infinity)){
                    output[row][column] = min(output[row][column], output[row][diagonal] + output[diagonal][column]);
                }
            }
        }
    }
    return output;
}


//finds intermediates of vertex pairs to check if there are any
long** intermediate(long** distance, long** intermediates, long integer_rep){
    long** dist= distance;
    long** ans= intermediates;

    for(long diagonal = 0; diagonal < integer_rep; diagonal++){
        for(long row = 0; row < integer_rep; row ++){
            for(long column =0; column < integer_rep; column ++){
                if(dist[row][diagonal] != infinity && row != column && dist[diagonal][column] != infinity ){
                    if(dist[row][diagonal]+dist[diagonal][column] < dist[row][column]){
                        dist[row][column] = dist[row][diagonal] + dist[diagonal][column];
                        ans[row][column] = diagonal + A;
                    }
                }
            }
        }
    }
    return ans;
}

//shows path of which vertices follow 
void show_path(long** distances, long** intermediates, long integer_rep){
    for(long row = 0; row<integer_rep; row++){
    	char p_row = static_cast<char>(row + A);
        for(long column = 0; column < integer_rep; column++){
            char p_column = static_cast<char>(column + A);
            long outer_amt = row;
            if(distances[row][column] == infinity){
                cout << p_row << " -> " << p_column << ", distance: infinity, path: none";
            }
            else{
                cout << p_row << " -> " << p_column << ", distance: " << distances[row][column] << ", path: " << p_row;
            }
            while(intermediates[outer_amt][column] != HYPHEN && distances[row][column] != infinity ){
                for(long i = 1; i < integer_rep; i++){
                    if(intermediates[outer_amt][intermediates[outer_amt][column]- A] == HYPHEN){
                        cout << " -> " << static_cast<char>(intermediates[outer_amt][column]);
                        break;
                    }
                    else{
                        intermediates[outer_amt][column] = intermediates[outer_amt][intermediates[outer_amt][column]- A];
                    }
                }
                outer_amt = intermediates[outer_amt][column] - A;
            }
            if(intermediates[outer_amt][column] == HYPHEN && distances[row][column] != 0 && distances[row][column] != infinity){
                cout << " -> " << p_column;
            }
            cout << endl;
        }
    }
}




//used to free up space being used by matrices
void deleteAll(long** matrixD, long** matrixP, long** matrixI, long int_rep){
    for(int i = 0; i < int_rep; i++){
        delete[] matrixD[i];
        delete[] matrixP[i];
        delete[] matrixI[i];
    }
    delete[] matrixD;
    delete[] matrixP;
    delete[] matrixI;
}

int main (int argc, const char *argv[]){
    //checks right number of arguments
    if(argc != 2){
        cerr << "Usage: " << argv[0] << " <filename>" << endl;
        return 1;
    }

    ifstream input_file(argv[1]);
    if(!input_file){
    	cerr << "Error: Cannot open file '" << argv[1] << "'." << endl;
    	return 1;
    }

    input_file.exceptions(ifstream::badbit);

    //reads the lines 
    string line;
    getline(input_file, line);

    istringstream integer_temp (line);
    istringstream string_temp (line);
    int int_rep;
    string string_rep;

    integer_temp >> int_rep; //represents integers 
    string_temp >> string_rep;

    //if statement to check if the number is between 1 and 26 (to represent a letter)
    if(!(int_rep > 0 && int_rep <= 26) && to_string(int_rep) == string_rep){
        cerr << "Error: Invalid number of vertices '" << int_rep << "' on line 1." << endl;
        return 1;
    }
    if(int_rep == 0){
        //string rep
        cerr << "Error: Invalid number of vertices '" << string_rep << "' on line 1." << endl;
        return 1;
    }

    long** distances = new long*[int_rep];
    long** paths = new long*[int_rep];
    fill_matrices(distances, paths, int_rep);

    long** intermediates = new long*[int_rep];
    for (int x= 0; x < int_rep; ++x){
        intermediates[x] = new long[int_rep];
        fill(intermediates[x], intermediates[x] + int_rep, HYPHEN);
    }
    try{
        unsigned int linenumber = 1;
        char letter_range = int_rep + 64;

        //this is where getline comes into play 
        while (getline(input_file, line)){
            istringstream inputs(line);

            string first, second, edge;
            inputs >> first >> second >> edge ;

            stringstream temp  (edge);
            int edge_amt = 0;
            temp >> edge_amt;
        
            if (edge.size() == 0){
                cerr << "Error: Invalid edge data '" << first << " " << second << "' on line " << linenumber+1 << "." << endl;
                deleteAll(distances, paths, intermediates, int_rep);
                return 1;
            }

            if(!(first[0] >=65 && first[0]<=letter_range) || !(second[0] >=65 && second[0] <= letter_range)){

            	if(!(first[0] >=65 && first[0]<=letter_range)){
            		cerr << "Error: Starting vertex '" << first << "' on line " << linenumber+1 << " is not among valid values A-" << letter_range << "." << endl;

            	}
            	else{
            		cerr << "Error: Ending vertex '" << second << "' on line " << linenumber+1 << " is not among valid values A-" << letter_range << "." << endl;
            	}
                deleteAll(distances, paths, intermediates, int_rep);
                return 1;
             }

            if(first.size() != 1 || second.size() != 1){
            	if(!(first.size() == 1)){
            		cerr << "Error: Starting vertex '" << first << "' on line " << linenumber+1 << " is not among valid values A-" << letter_range << "." << endl;
            	}
            	else{
            		cerr << "Error: Ending vertex '" << second << "' on line " << linenumber+1 << " is not among valid values A-" << letter_range << "." << endl;
            	}
            	deleteAll(distances, paths, intermediates, int_rep);
                return 1;
            }

            if(!(second[0] >=65 && second[0] <= letter_range)){
                 cerr << "Error: Ending vertex '" << second << "' on line " << linenumber+1 << " is not among valid values A-" << letter_range << "." << endl;
                 deleteAll(distances, paths, intermediates, int_rep);
                 return 1;
             }

            if(edge_amt<=0){
            	if((to_string(edge_amt) != edge)){
            		cerr << "Error: Invalid edge weight '" << edge << "' on line " << linenumber+1 << "." << endl;
            	}
            	else{
            		cerr << "Error: Invalid edge weight '" << to_string(edge_amt) << "' on line " << linenumber+1 << "." << endl;
            	}
            	deleteAll(distances, paths, intermediates, int_rep);
                return 1;
            }

            distances [first[0] - A][second[0] - A] = edge_amt;
            paths[first[0] - A][second[0] - A] = edge_amt;

            ++linenumber;

        }

        //close file 
        input_file.close();
    }
    catch (const ifstream::failure &f){
        cerr << "Error: An I/O error occurred reading '" << argv[1] << "'.";
        return 1;
    }

//Displays the distances, paths, and intermediate tables respectively
    displayTheTables(distances, "Distance matrix:", int_rep, false);
    displayTheTables(floyd(distances, int_rep), "Path lengths:", int_rep, false);
    displayTheTables(intermediate(paths, intermediates, int_rep), "Intermediate vertices:", int_rep, true);
    show_path(distances, intermediates, int_rep);
    deleteAll(distances, paths, intermediates, int_rep);

    return 0;
}
