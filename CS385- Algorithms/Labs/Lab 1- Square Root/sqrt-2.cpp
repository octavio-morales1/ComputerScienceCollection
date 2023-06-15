/*******************************************************************************
 * Filename: sqrt.ccp
 * Author  : Octavio Morales
 * Version : 1.6
 * Date    : Septermber 14, 2022
 * Description: Computes the square root of an integer using the Babylonian/Newton's Method
 * Pledge  : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/

#include <iostream>
#include <sstream>
#include <iomanip>
#include <limits>
#include <cmath>
#include <math.h>
using namespace std;


double sqrt(double num, double e){
		double last_guess=num;
		double next_guess;

		if(num<0){
			return numeric_limits<double>::quiet_NaN();
		}
		if(num==0.0 ||num==1.0){
			return num;
		}
		double temp=last_guess;
		do{
			next_guess=0.5*(last_guess+num/last_guess);
			temp= last_guess;
			last_guess= next_guess;
		}while(abs(temp-next_guess)>e);

		return next_guess;
}

int main(int argc, char* argv[]){
		istringstream iss;
		double n;
		double e;
		if(argc!=3 && argc!=2){
			cerr<< "Usage: " << argv[0] << " <value> [epsilon]" <<endl;
			return 1;
		}
		iss.str(argv[1]);
		if(!(iss>>n)){
			cerr << "Error: Value argument must be a double." << endl;
			return 1;
		}
		if(argc==3){
			iss.clear();
			iss.str(argv[2]);
			if(!(iss>>e) || stod(argv[2])<=0.0){
				cerr << "Error: Epsilon argument must be a positive double." << endl;
				return 1;
			}
			cout << fixed << setprecision(8) << sqrt(n*1.0,e*1.0) << endl;
		}
		else{
			iss.clear();
			cout<< fixed << setprecision(8) << sqrt(n*1.0, 0.0000001) << endl;
		}
		return 0;
}

