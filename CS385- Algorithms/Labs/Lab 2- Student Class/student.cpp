/*******************************************************************************
 * Filename: student.cpp
 * Author  : Octavio Morales
 * Version : 1.4
 * Date    : September 15, 2022
 * Description: Create the Student class with different classes involving it.
 * Pledge  : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/

#include <iostream>
#include <sstream>
#include <iomanip>
#include <limits>
#include <vector>
using namespace std;

class Student{
private:
	string first_;
	string last_;
	float gpa_;
	int id_;

public:
	Student(string first, string last, float gpa, int id){
		first_= first;
		last_= last;
		gpa_= gpa;
		id_= id;
	}

	string full_name(){
		return first_+ " "+ last_;
	}
	int id(){
		return id_;
	}
	float gpa(){
		cout<< setprecision(2) << fixed;
		return gpa_;
	}
	void print_info(){
		cout<< full_name() << ", GPA: " << gpa() << ", ID: " << id() << endl;
	}

};

vector<Student> find_failing_students(const vector<Student> &students) {
	    vector<Student> failing_students;
	    for(Student x: students){
	    	if(x.gpa()<1.00){
	    		failing_students.push_back(x);
	    	}
	    }
	    return failing_students;
	}

void print_students(const vector<Student> &students) {
	    for(Student x: students){
	    	x.print_info();
	    }
	}

int main() {
    string first_name, last_name;
    float gpa;
    int id;
    char repeat;
    vector<Student> students;

    do {
        cout << "Enter student's first name: ";
        cin >> first_name;
        cout << "Enter student's last name: ";
        cin >> last_name;
        gpa = -1;
        while (gpa < 0 || gpa > 4) {
            cout << "Enter student's GPA (0.0-4.0): ";
            cin >> gpa;
        }
        cout << "Enter student's ID: ";
        cin >> id;
        students.push_back(Student(first_name, last_name, gpa, id));
        cout << "Add another student to database (Y/N)? ";
        cin >> repeat;
    } while (repeat == 'Y' || repeat == 'y');

    cout << endl << "All students:" << endl;
    print_students(students);

    cout << endl << "Failing students:";
    // TODO
    // Print a space and the word 'None' on the same line if no students are failing.
    // Otherwise, print each failing student on a separate line.
    if(find_failing_students(students).size()==0){
    	cout << " None" << endl;
    }
    else{
    	cout << endl;
    	print_students(find_failing_students(students));
    }

    return 0;
}

