// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales

import java.lang.Math;

// code assisted by TA.
public class Firstnames implements Comparable<Firstnames> {
    private String name;
    public Firstnames(){
        StringBuilder s = new StringBuilder();
        s.append((char) ((int) (Math.random() * (90-65+1)) + 65));
        int temp= ((int)(Math.random()*4)+3);
        for(int x=0; x<temp; x++){
            s.append((char)((int)(Math.random()*(122-97+1))+97));
        }
        name= s.toString();
    }
    public String toString(){
        return name;
    }
    public String getName(){
        return name;
    }
    public int compareTo(Firstnames then) {
        return this.getName().compareTo(then.getName());
    }
}
