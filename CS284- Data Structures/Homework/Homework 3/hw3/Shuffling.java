// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales
import java.lang.Math;

// code assisted by TA.
public class Shuffling{
    public static int swapAmt(Comparable[] a){
        int numSwaps=0;
        for(int x=a.length-1;x>=0; x--){
            int temp= (int)(Math.random()*x);
            Comparable temp2= a[temp];
            a[temp]= a[x];
            a[x]= temp2;
            numSwaps++;
        }
        return numSwaps;
    }
    public static void sort(Comparable[] a){
        for(int x=a.length-1;x>=0; x--){
            int temp= (int)(Math.random()*x);
            Comparable temp2= a[temp];
            a[temp]= a[x];
            a[x]= temp2;
        }
    }
}
