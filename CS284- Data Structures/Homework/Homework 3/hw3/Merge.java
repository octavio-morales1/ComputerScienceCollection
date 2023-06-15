// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales
//code taught in class

public class Merge {
    private static int numSwaps;
    public static int swapAmt(Comparable[] a){
        Comparable[] temp= new Comparable[a.length];
        int the= Sorter2(a, temp, 0, a.length-1);
        return the;
    }
    public static void sort(Comparable[] a){
        Comparable[] temp= new Comparable[a.length];
        Sorter(a, temp, 0, a.length-1);
    }
    public static void MergeHelper1(Comparable[] a, Comparable[] emp, int low, int mid, int high){
        numSwaps=0;
        for(int k= low; k<=high; k++){
            emp[k]= a[k];
        }
        int L2=low;
        int M2=mid+1;
        for(int x=low; x<=high; x++){
            if(L2>mid){
                a[x]=emp[M2++];
                numSwaps++;
            }
            else if(M2>high){
                a[x]=emp[L2++];
                numSwaps++;
            }
            else if(emp[M2].compareTo(emp[L2])<0){
                a[x]= emp[M2++];
                numSwaps++;
            }
            else{
                a[x]=emp[L2++];
                numSwaps++;
            }
        }
    }

    public static int MergeHelper2(Comparable[] a, Comparable[] emp, int low, int mid, int high){
        numSwaps=0;
        for(int k= low; k<=high; k++){
            emp[k]= a[k];
        }
        int L2=low;
        int M2=mid+1;
        for(int x=low; x<=high; x++){
            if(L2>mid){
                a[x]=emp[M2++];
                numSwaps++;
            }
            else if(M2>high){
                a[x]=emp[L2++];
                numSwaps++;
            }
            else if(emp[M2].compareTo(emp[L2])<0){
                a[x]= emp[M2++];
                numSwaps++;
            }
            else{
                a[x]=emp[L2++];
                numSwaps++;
            }
        }
        return numSwaps;
    }


    public static void Sorter(Comparable[] a, Comparable[] emp, int low, int high){
        if(high>low){
            int mid= low+((high-low)/2);
            Sorter(a, emp, low, mid);
            Sorter(a, emp, mid+1, high);
            MergeHelper1(a, emp, low, mid, high);
        }

    }

    public static int Sorter2(Comparable[] a, Comparable[] emp, int low, int high){
        int at=0;
        if(high>low){
            int mid= low+((high-low)/2);
            at+= Sorter2(a, emp, low, mid);
            at+=Sorter2(a, emp, mid+1, high);
            at+= MergeHelper2(a, emp, low, mid, high);
        }
        return at;
    }
}
