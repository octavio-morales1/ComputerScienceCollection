// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales
//code taught in class

public class Quick{
    private static int numSwaps;
    public static int swapAmt(Comparable[] a){
        return Helper2(a, 0, a.length-1);
    }
    public static void sort(Comparable[] a){
        Helper(a, 0, a.length-1);
    }
    public static int partition(Comparable[] a, int low, int high){
        numSwaps=0;
        Comparable pivot= a[high];
        int spot= low-1;
        for(int x=low; x<high; x++){
            if(a[x].compareTo(pivot)<0){
                spot++;
                Comparable temp= a[spot];
                a[spot]= a[x];
                a[x]= temp;
                numSwaps++;
            }
        }
        Comparable temp= a[spot+1];
        a[spot+1]=a[high];
        a[high]=temp;
        numSwaps++;
        return spot+1;
    }
    public static int partition2(Comparable[] a, int low, int high){
        numSwaps=0;
        Comparable pivot= a[high];
        int spot= low-1;
        for(int x=low; x<high; x++){
            if(a[x].compareTo(pivot)<0){
                spot++;
                Comparable temp= a[spot];
                a[spot]= a[x];
                a[x]= temp;
                numSwaps++;
            }
        }
        Comparable temp= a[spot+1];
        a[spot+1]=a[high];
        a[high]=temp;
        numSwaps++;
        return numSwaps;
    }

    public static void Helper(Comparable[]a, int low, int high){
        if(low<high){
            int spot= partition(a, low, high);
            Helper(a, low, spot-1);
            Helper(a, spot+1, high);
        }

    }
    public static int Helper2(Comparable[]a, int low, int high){
        int amt= 0;
        if(low<high){
            int spot= partition(a, low, high);
            amt+= partition2(a, low, high);
            amt+=Helper2(a, low, spot-1);
            amt+=Helper2(a, spot+1, high);
        }
        return amt;
    }
}
