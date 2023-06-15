// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales
//code taught in class

public class Insertion {
    private static int numSwaps;
    public static int swapAmt(Comparable []a){
        numSwaps=0;
        for(int x=1; x<a.length; x++){
            for(int y=x; y>0; y--){
                if(a[y].compareTo(a[y-1])<0){
                    Comparable temp= a[y];
                    a[y]=a[y-1];
                    a[y-1]=temp;
                    numSwaps++;
                }
            }
        }
        return numSwaps;
    }
    public static void sort(Comparable[] a){
        numSwaps=0;
        for(int x=1; x<a.length; x++){
            for(int y=x; y>0; y--){
                if(a[y].compareTo(a[y-1])<0){
                    Comparable temp= a[y];
                    a[y]=a[y-1];
                    a[y-1]=temp;
                    numSwaps++;
                }
            }
        }
    }
}
