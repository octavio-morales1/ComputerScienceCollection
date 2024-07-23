
/*
Quiz 5 - 16 Oct 2023

Name: Octavio Morales
Pledge: I pledge my honor that I have abided by the Stevens Honor System.

*/

class GS {
    int g
    private boolean truckRefueling = false

    GS(){
        g=0
    }

    synchronized void start_gasUp(){
        //complete
        while(g>=6 || truckRefueling==true){
            wait()
        }
        g++
    }
    synchronized void done_gasUp(){
        //complete
        g--
        if(g==0){
            notifyAll()
        }
        else{
            notify()
        }
    }
    synchronized void start_refuel(){
        //complete
        while(g>0||truckRefueling==true){
            wait()
        }
        truckRefueling=true
    }
    synchronized void done_refuel(){
        //complete
        truckRefueling= false
        notifyAll()
    }
}

GS gs= new GS()
final int NV= 100 // no of vehicles
final int NT= 10 // no of trucks

NV.times{
    Thread.start { //Vehicle
        gs.start_gasUp()
        // gas up
        gs.done_gasUp()
    }
}

NT.times{
    Thread.start { //Truck
        gs.start_refuel()
        //gas up
        gs.done_refuel()
    }
}
