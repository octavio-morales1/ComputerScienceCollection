// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales
//code taught in class

public class Selection{
    private static int numSwaps;
    public static int swapAmt(Comparable []a){
        numSwaps=0;
        for(int x= 0; x<a.length; x++){
            int ind= x;
            for(int y= x+1; y<a.length; y++){
                if(a[y].compareTo(a[ind])<0){
                    ind=y;
                }
            }
            Comparable temp= a[x];
            a[x]= a[ind];
            a[ind]= temp;
            numSwaps++;
        }
        return numSwaps;
    }
    public static void sort(Comparable []a){
        numSwaps=0;
        for(int x= 0; x<a.length; x++){
            int ind= x;
            for(int y= x+1; y<a.length; y++){
                if(a[y].compareTo(a[ind])<0){
                    ind=y;
                }
            }
            Comparable temp= a[x];
            a[x]= a[ind];
            a[ind]= temp;
            numSwaps++;
        }
    }
}
