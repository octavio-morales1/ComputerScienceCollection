/*******************************************************************************
 * Name        : sieve.cpp
 * Author      : Octavio Morales
 * Date        : September 18, 2022
 * Description : Sieve of Eratosthenes
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <cmath>
#include <iomanip>
#include <iostream>
#include <sstream>

using namespace std;

class PrimesSieve {
public:
    PrimesSieve(int limit);

    ~PrimesSieve() {
        delete [] is_prime_;
    }

    int num_primes() const {
        return num_primes_;
    }

    void display_primes() const;

private:
    // Instance variables
    bool * const is_prime_;
    const int limit_;
    int num_primes_, max_prime_;

    // Method declarations
    int count_num_primes() const;
    void sieve();
    static int num_digits(int num);

};

PrimesSieve::PrimesSieve(int limit) :
        is_prime_{new bool[limit + 1]}, limit_{limit} {
    sieve();
}

void PrimesSieve::display_primes() const {
    // TODO: write code to display the primes in the format specified in the
    // requirements document.
	const int dig= num_digits(max_prime_);
	const int ppr= 80/ (dig+1);
	int comp = 0;

	//For loop to go through each element of _is_prime_
	for(int x=2; x<=limit_; x++){
		//This is to determine if there are one or multiple rows. If this is true, then the format method does not apply.
		if(num_primes_<= ppr){
			if(is_prime_[x]==true){
				cout << setw(1) << x;
				comp++;
				if(comp < ppr && x!= max_prime_){
					cout << " ";
				}
			}
			if(comp>=ppr){
				comp=0;
				cout<< endl;
			}
		}
		//This is for when there are multiple rows, so that the format method needs to be in effect.
		else{
			if(is_prime_[x]==true){
				cout << setw(dig) << x;
				comp++;
				//The second if statement condition is to prevent the extra space after max_prime_
				if(comp < ppr && x!= max_prime_){
					cout << " ";
				}
			}
			//This if statement is for when we have reached the end of the row.
			if(comp>=ppr){
				comp=0;
				cout<< endl;
			}
		}
	}
}

//Function used to count the number of prime numbers by iterating through is_prime_.
int PrimesSieve::count_num_primes() const {
	int counter=0;
	for(int x=2; x<=limit_; x++){
		if(is_prime_[x]==true){
			counter++;
		}
	}
    return counter;
}

//Function used to determine which spots of is_prime_ is prime using the pseudocode given in class.
void PrimesSieve::sieve() {
	//For loop to set every spot in is_prime_ to true (every spot is false by default, and will cause problems later without it being true).
	for(int z=2; z<=limit_; z++){
		is_prime_[z]= true;
	}
	//Code made up of the pseudocode given in class
	for(int x=2; x<= sqrt(limit_); x++){
		if(is_prime_[x]==true){
			for(int y= x*x; y<=limit_;y+=x){
				is_prime_[y]=false;
			}
		}
	}

	//Since max_prime_ has not been made up yet, we run a for loop to get the max prime value.
	for(int a= limit_; a>=0; a--){
		if(is_prime_[a]==true){
			max_prime_=a;
			break;
		}
	}

	//Like max_prime_, we do the same thing with num_primes_.
	num_primes_= count_num_primes();
}

//This function gets the number of digits of a number by constantly dividing by 10 with each iteration.
int PrimesSieve::num_digits(int num) {
	int counter= 0;
	for(int x= num; x!=0; x/=10){
		counter++;
	}
    return counter;
}

int main() {
    cout << "**************************** " <<  "Sieve of Eratosthenes" <<
            " ****************************" << endl;
    cout << "Search for primes up to: ";
    string limit_str;
    cin >> limit_str;
    int limit;

    // Use stringstream for conversion. Don't forget to #include <sstream>
    istringstream iss(limit_str);

    // Check for error.
    if ( !(iss >> limit) ) {
        cerr << "Error: Input is not an integer." << endl;
        return 1;
    }
    if (limit < 2) {
        cerr << "Error: Input must be an integer >= 2." << endl;
        return 1;
    }

    // TODO: write code that uses your class to produce the desired output.
    //Code that gives the desired output using the class.
    cout << endl;
    PrimesSieve p= PrimesSieve(limit);
    cout << "Number of primes found: " << p.num_primes() << endl;
    cout << "Primes up to " << limit << ":" << endl;
    p.display_primes();
    return 0;
}
