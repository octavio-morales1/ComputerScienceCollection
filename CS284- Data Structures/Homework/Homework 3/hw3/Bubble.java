// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales
//code taught in class

public class Bubble {
    private static int numSwaps;

    public static int swapAmt(Comparable[] a){
        int numSwaps=0;
        for(int x=0; x<a.length-1; x++){
            for(int y=0; y<a.length-x-1; y++){
                if(a[y+1].compareTo(a[y])<0){
                    Comparable temp= a[y];
                    a[y]= a[y+1];
                    a[y+1]= temp;
                    numSwaps++;
                }
            }
        }
        return numSwaps;
    }
    public static void sort(Comparable [] a){
        int numSwaps=0;
        for(int x=0; x<a.length-1; x++){
            for(int y=0; y<a.length-x-1; y++){
                if(a[y+1].compareTo(a[y])<0){
                    Comparable temp= a[y];
                    a[y]= a[y+1];
                    a[y+1]= temp;
                    numSwaps++;
                }
            }
        }
    }
}
