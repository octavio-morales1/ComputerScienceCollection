
/*
Quiz 4 - 06 Oct 2023

Name: Octavio Morales
Pledge: I pledge my honor that I have abided by the Stevens Honor System.

*/

import java.util.concurrent.Semaphore

def mutexS = new Semaphore(1)
def mutexF = new Semaphore(1)
def studentPermit = new Semaphore(1)
def facultyPermit = new Semaphore(1)

def S = 10  // Number of students
def F = 10  // Number of faculty
def CM = 3  // Number of cleaning machines

def studentsInLounge = 0
def facultyInLounge = 0

S.times {
    def id = it
    Thread.start {  // Student
        mutexS.acquire()
        studentsInLounge++
        if (studentsInLounge == 1) {
            studentPermit.acquire()
        }
        mutexS.release()
        // Student is in the lounge
        mutexS.acquire()
        studentsInLounge--
        if (studentsInLounge == 0) {
            studentPermit.release()
        }
        mutexS.release()
    }
}

F.times {
    def id = it
    Thread.start {  // Faculty
        mutexF.acquire()
        facultyInLounge++
        if (facultyInLounge == 1) {
            facultyPermit.acquire()
        }
        mutexF.release()
        // Faculty is in the lounge
        mutexF.acquire()
        facultyInLounge--
        if (facultyInLounge == 0) {
            facultyPermit.release()
        }
        mutexF.release()
    }
}

CM.times {
    def id = it
    Thread.start {  // Clean
        while (true) {
            studentPermit.acquire()
            facultyPermit.acquire()

            facultyPermit.release()
            studentPermit.release()
        }
    }
}

