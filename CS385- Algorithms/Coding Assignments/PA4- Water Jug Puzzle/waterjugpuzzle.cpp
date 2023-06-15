/*******************************************************************************
 * Name        : waterjugpuzzle.cpp
 * Author      : Octavio Morales, Shrey Diwakar
 * Date        : October 22, 2022
 * Description : Solution to the water jug puzzle.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <queue>
#include <stack>
#include <algorithm>
#include <sstream>
#include <iomanip>

using namespace std;


// Struct to represent state of water in the jugs.
struct State {
    int a, b, c;			//capacity for a, b and c 
    string directions;		//used to store the directions
    State *parent;			//pointer to parent state


    State(int _a, int _b, int _c, string _directions) :				//constructor to initialize fields
        a{_a}, b{_b}, c{_c}, directions{_directions}, parent{nullptr} { }		

    
    // String representation of state in tuple form.
    string to_string() {
        ostringstream oss;
        oss << "(" << a << ", " << b << ", " << c << ")";
        return oss.str();
    }
};


void waterjugpuzzle(int a, int b, int c, int Ga, int Gb, int Gc){		//method to call the bfs 
	if(Ga== 0 && Gb== 0 && c==Gc){										//if statement to return the initial state if the goal state is equal to the initial state given 
		cout<< "Initial state. (0, 0, " << c << ")" << endl;			//returning the initial state
		return;
	}
	int** outcomes = new int*[a+1];										//creating a 2 matrix and setting all the values to 0
	for (int x = 0; x < a+1;x++){
		outcomes[x] = new int[b+1];
	}
	for(int Xa=0; Xa<a+1; Xa++){
		for(int Yb=0; Yb<b+1; Yb++){
			outcomes[Xa][Yb]= 0;
		}
	}
	queue<State*> q;													//creating a queue named q to keep track of current state
	stack<State*> s;													// creating stack needed to print the process of reaching the goal state 

	State* start= new State(0, 0, c, "Initial state. ");				//initializing new pointer state; state = 0, 0, and capacity of C 
	State* baller= new State(0, 0, c, "L bozo");						//placeholder state so initial state can be printed
	baller->parent= nullptr;											//pointer state pointing to parent which is set = null pointer
	start-> parent= baller;												//
	outcomes[0][0]=1;													// marking the initial state as visited in the 2d array
	q.push(start);														//push the initial value into the queue to begin from the initial state when doing bfs
	while(!(q.empty())){												//will iterate throught the loop till the queue is empty
		State* current= q.front();										//creating a pointer state named current and setting it equal to whatever is at the front of the queue
		if ((*current).a == Ga && (*current).b == Gb && (*current).c == Gc){	//if statement to check if the goal state is reached
			while((*current).parent != nullptr){						//while the parent pointer of the current state is not null it will push the parent of the current state into a stack
				s.push(current);								
				current=(*current).parent;

			}
			break;																							
		}
		if((*current).a!=a && (*current).c!=0){										//if statement to check whether a and c are not already at capacity, if so skip this step
			State* temp= new State((*current).a, (*current).b, (*current).c, "");  	//creating new temporary state and setting it equal to the current state
			if((*temp).c<a-(*current).a){											// if pouring all of the water in c into a will not result in a overflowing
				(*temp).a= (*current).a+(*temp).c;									//add the water in c to a
				(*temp).c= 0;														//empty out c
			}
			else{
				(*temp).c= (*current).c- (a-(*current).a);							//if a will overflow : only pour from c till a is filled
				(*temp).a= (*current).a+ ((*current).c-(*temp).c);					//change a and c accordingly
			}
			if((*temp).a-(*current).a==1){											//if statement to check if only 1 gallon is being poured out
				(*temp).directions= "Pour 1 gallon from C to A. ";
			}
			else{
				(*temp).directions= "Pour " +  to_string((*current).c-(*temp).c) + " gallons from C to A. "; //printing out directions and the water poured out 

			}
			if(outcomes[(*temp).a][(*temp).b]==0){				//if the outcome is unvistitied then push it into queue and point the current state to being the parent of the temp one
				temp -> parent=current;								
				q.push(temp);
			}
			else{
				delete temp;														//deleting the temp state to prevent memory leaks

			}
		}
		if((*current).a!=a && (*current).b!=0){										//if statement to check whether a and b are not already at capacity, if so skip this step
			State* temp= new State((*current).a, (*current).b, (*current).c, "");	//all ifs statement are the same and the explanation is the same above
			if((*temp).b<a-(*current).a){											// if pouring all of the water in b into a will not result in a overflowing
				(*temp).a= (*current).a+(*temp).b;
				(*temp).b= 0;
			}
			else{
				(*temp).b= (*current).b- (a-(*current).a);
				(*temp).a= (*current).a+ ((*current).b-(*temp).b);
			}
			if((*temp).a-(*current).a==1){
				(*temp).directions= "Pour 1 gallon from B to A. ";
			}
			else{
				(*temp).directions= "Pour " +  to_string((*current).b-(*temp).b) + " gallons from B to A. ";
			}
			if(outcomes[(*temp).a][(*temp).b]==0){
				temp -> parent=current;
				q.push(temp);
			}
			else{
				delete temp;

			}
		}
		if((*current).b!=b && (*current).c!=0){									//if statement to check whether b and c are not already at capacity, if so skip this step
			State* temp= new State((*current).a, (*current).b, (*current).c, "");
			if((*temp).c<b-(*current).b){										// if pouring all of the water in a into c will not result in a overflowing
				(*temp).b= (*current).b+(*temp).c;								//all ifs statement are the same and the explanation is the same above (to avoid redundance i will avoid recommenting)
				(*temp).c= 0;
			}
			else{
				(*temp).c= (*current).c- (b-(*current).b);
				(*temp).b= (*current).b+ ((*current).c-(*temp).c);
			}
			if((*temp).b-(*current).b==1){
				(*temp).directions= "Pour 1 gallon from C to B. ";
			}
			else{
				if((*temp).c<b-(*current).b){
					(*temp).directions= "Pour " +  to_string((*current).c-(*temp).c) + " gallons from C to B. ";
				}
				else{
					(*temp).directions= "Pour " +  to_string((*current).c-(*temp).c) + " gallons from C to B. ";
				}
			}
			if(outcomes[(*temp).a][(*temp).b]==0){
				temp -> parent=current;
				q.push(temp);
			}
			else{
				delete temp;

			}

		}
		if((*current).b!=b && (*current).a!=0){									//if statement to check whether a and b are not already at capacity, if so skip this step
			State* temp= new State((*current).a, (*current).b, (*current).c, "");
			if((*temp).a<b-(*current).b){										// if pouring all of the water in a into b will not result in a overflowing
				(*temp).b= (*current).b+(*temp).a;								//all ifs statement are the same and the explanation is the same above (to avoid redundance i will avoid recommenting)
				(*temp).a= 0;
			}
			else{	
				(*temp).a= (*current).a- (b-(*current).b);
				(*temp).b= (*current).b+ ((*current).a-(*temp).a);
			}
			if((*temp).b-(*current).b==1){
				(*temp).directions= "Pour 1 gallon from A to B. ";
			}
			else{
				(*temp).directions= "Pour " +  to_string((*current).a-(*temp).a) + " gallons from A to B. ";
			}
			if(outcomes[(*temp).a][(*temp).b]==0){
				q.push(temp);
				temp -> parent=current;
			}

			else{
				delete temp;
			}
		}
		if((*current).c!=c && (*current).b!=0){								//if statement to check whether b and c are not already at capacity, if so skip this step
			State* temp= new State((*current).a, (*current).b, (*current).c, "");
			if((*temp).b<c-(*current).c){									// if pouring all of the water in b into c will not result in a overflowing
				(*temp).c= (*current).c+(*temp).b;							//all ifs statement are the same and the explanation is the same above (to avoid redundance i will avoid recommenting)
				(*temp).b= 0;
			}
			else{
				(*temp).b= (*current).b- (c-(*current).c);
				(*temp).c= (*current).c+ ((*current).b-(*temp).b);
			}
			if((*temp).c-(*current).c==1){
				(*temp).directions= "Pour 1 gallon from B to C. ";
			}
			else{
				(*temp).directions= "Pour " +  to_string((*current).b-(*temp).b) + " gallons from B to C. ";
			}
			if(outcomes[(*temp).a][(*temp).b]==0){
				q.push(temp);
				temp -> parent=current;
			}
			else{
				delete temp;
			}
		}
		if((*current).c!=c && (*current).a!=0){								//if statement to check whether a and c are not already at capacity, if so skip this step
			State* temp= new State((*current).a, (*current).b, (*current).c, "");
			if((*temp).a<c-(*current).c){									// if pouring all of the water in a into c will not result in a overflowing
				(*temp).c= (*current).c+(*temp).a;							//all ifs statement are the same and the explanation is the same above (to avoid redundance i will avoid recommenting)
				(*temp).a= 0;
			}
			else{
				(*temp).a= (*current).a- (c-(*current).c);
				(*temp).c= (*current).c+ ((*current).a-(*temp).a);
			}
			if((*temp).c-(*current).c==1){
				(*temp).directions= "Pour 1 gallon from A to C. ";
			}
			else{
				(*temp).directions= "Pour " +  to_string((*current).a-(*temp).a) + " gallons from A to C. ";
			}
			if(outcomes[(*temp).a][(*temp).b]==0){
				q.push(temp);
				temp -> parent=current;
			}
			else{
				delete temp;											
			}
		}
		outcomes[(*current).a][(*current).b]=1;							//marking the current state as visited in the 2d array
		q.pop();

	}

	int existing=0;															//counter variable used to check how many transactions take place
	while(!(s.empty())){													//while the stack is not empty iterate through the loop
		State* temp2= s.top();												//creating a new temporary state to store the top of the stack
		cout<< (*temp2).directions << (*temp2).to_string() << endl;			//printing out the directions and the state after the directions took place
		s.pop();															//popping the top out of the stack
		existing++;															//incrementing the counter
	}
	if(outcomes[Ga][Gb]==1 || existing==0){									//if statement to check whether goal state has been visited or the counter is 0
		cout << "No solution." << endl;
	}


	delete baller;															//deleting to prevent memory leaks
	delete start;															//deleting to prevent memory leaks
	for (int x = 0; x < a+1;x++){											//deleting to prevent memory leaks
		delete[] outcomes[x];
	}
	delete[] outcomes;														//deleting to prevent memory leaks
}


int main(int argc, char* argv[]){											
	istringstream iss;
	int a; int b; int c; int Ga; int Gb; int Gc;
	if(argc!=7){															//chcking if the number of arguments is not 7, if so throw an error
		cerr<< "Usage: " << argv[0] << " <cap A> <cap B> <cap C> <goal A> <goal B> <goal C>" <<endl;
		return 1;
	}
	iss.str(argv[1]);
	if(!(iss>>a)){															//clear iss to push argv[2] in
		cerr << "Error: Invalid capacity '" << argv[1] << "' for jug A." << endl;
		return 1;
	}

	if(a<0){																//if the capacity of a is less than 0 throw an error
		cerr << "Error: Invalid capacity '" << a << "' for jug A." << endl;				
		return 1;
	}

	iss.clear();															//clear iss to push argv[2] in
	iss.str(argv[2]);	
	if(!(iss>>b)){															//checks if parameter is valid												
		cerr << "Error: Invalid capacity '" << argv[2] << "' for jug B." << endl;
		return 1;
	}
	if(b<0){																//if the capacity of b is less than 0 throw an error
		cerr << "Error: Invalid capacity '" << b << "' for jug B." << endl;
		return 1;
	}

	iss.clear();															//clear iss to push argv[2] in
	iss.str(argv[3]);							
	if(!(iss>>c)){															//checks if parameter is valid
		cerr << "Error: Invalid capacity '" << argv[3] << "' for jug C." << endl;
		return 1;
	}
	if(c<=0){																//if the capacity of c is less than 0 throw an error
		cerr << "Error: Invalid capacity '" << c << "' for jug C." << endl;
		return 1;
	}

	iss.clear();															//clear iss to push argv[4] in
	iss.str(argv[4]);
	if(!(iss>>Ga)){															//checks if parameter is valid
		cerr << "Error: Invalid goal '" << argv[4] << "' for jug A." << endl;
		return 1;
	}

	if(Ga<0){																//if goal state of jug a is less than 0 throw an error
		cerr << "Error: Invalid goal '" << Ga << "' for jug A." << endl;
		return 1;
	}


	iss.clear();															//clear iss to push argv[5] in
	iss.str(argv[5]);
	if(!(iss>>Gb)){															//checks if parameter is valid
		cerr << "Error: Invalid goal '" << argv[5] << "' for jug B." << endl;
		return 1;
	}
	if(Gb<0){																//if goal state of jug  b is less than 0 throw an error
		cerr << "Error: Invalid goal '" << Gb << "' for jug B." << endl;
		return 1;
	}

	iss.clear();															//clear iss to push argv[6] in
	iss.str(argv[6]);
	if(!(iss>>Gc)){															//checks if parameter is valid
		cerr << "Error: Invalid goal '" << argv[6] << "' for jug C." << endl;
		return 1;
	}
	if(Gc<0){																//if goal state of jug c is less than 0 throw an error
		cerr << "Error: Invalid goal '" << Gc << "' for jug C." << endl;
		return 1;
	}
	if(Ga>a){																//if goal state of jug a is greater than capacity of a throw an error
		cerr << "Error: Goal cannot exceed capacity of jug A." << endl;
		return 1;
	}
	if(Gb>b){																//if goal state of jug b is greater than capacity of b throw an error
		cerr << "Error: Goal cannot exceed capacity of jug B." << endl;
		return 1;
	}
	if(Gc>c){																//if goal state of jug c is greater than capacity of c throw an error
		cerr << "Error: Goal cannot exceed capacity of jug C." << endl;
		return 1;
	}
	if(Ga+Gb+Gc!=c){														//if the sum of all goal states of all the jugs is not equal to the capacity of c throw an error
		cerr << "Error: Total gallons in goal state must be equal to the capacity of jug C." << endl;
		return 1;
	}
	iss.clear();															//clear iss

	waterjugpuzzle(a, b, c, Ga, Gb, Gc);									//calling the waterjug function

}
