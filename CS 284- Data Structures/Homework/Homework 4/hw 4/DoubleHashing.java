//Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales

//Note: Code Below was based on QuadraticProbingHashTable.java, a file that was given to the students to be used and altered for the homework assignment.

import java.lang.Math;

public class DoubleHashing<AnyType>{
    private int size;
    public DoubleHashing(){
        this(DEFAULT_TABLE_SIZE);
        size= getPrime();
    }
    public DoubleHashing(int s){
        allocateArray(s);
        makeEmpty();
    }

    public int getPrime(){
        for(int x= size-1; x>=1; x--){
            int c= 0;
            for(int y=2; Math.pow(x, x)<= x; x++){
                if(x%y==0){
                    c++;
                }
            }
            if(c==0){
                return x;
            }
        }
        return 3;
    }

    public void insert(AnyType x){
        int spot= findPos(x);
        if(active(spot)!=true){
            array[spot]= new HashEntry<AnyType> (x, true);
        }
    }

    public void rehash(){
        HashEntry<AnyType>[] temp= array;
        allocateArray(nextPrime(2*temp.length));
        size=0;
        for(int x=0; x<temp.length; x++){
            if(temp[x]!= null && temp[x].isActive==true){
                insert(temp[x].element);
            }
        }
    }

    private int findPos(AnyType x){
        int offset= myhash2(x);
        int thisPos= myhash(x);
        while(array[thisPos]!= null && array[thisPos].element.equals(x)==false){
            num_collision_++;
            thisPos+=offset;
            thisPos%=array.length;
            if(thisPos>=array.length){
                thisPos-=array.length;
            }
        }
        return thisPos;
    }
    public void remove(AnyType x){
        int thisPos= findPos(x);
        if(active(thisPos)==true){
            array[thisPos].isActive=false;
        }
    }
    public boolean contains(AnyType x){
        int thisPos= findPos(x);
        return active(thisPos);
    }
    public boolean active(int thisPos){
        if(array[thisPos]!= null && array[thisPos].isActive==true){
            return true;
        }
        return false;
    }

    public void makeEmpty(){
        size=0;
        for(int x= 0; x<array.length; x++){
            array[x]= null;
        }
    }

    public int myhash(AnyType x){
        int hVal= x.hashCode();
        hVal= hVal%array.length;
        if(hVal<0){
            hVal+= array.length;
        }
        return hVal;
    }
    private int myhash2(AnyType x){
        int hVal= x.hashCode();
        hVal%= array.length;
        if(hVal<0){
            hVal+=array.length;
        }
        return size-(hVal%size);
    }

    private static class HashEntry<AnyType>
    {
        public AnyType  element;   // the element
        public boolean isActive;  // false if marked deleted

        public HashEntry( AnyType e )
        {
            this( e, true );
        }

        public HashEntry( AnyType e, boolean i )
        {
            element  = e;
            isActive = i;
        }
    }

    private static final int DEFAULT_TABLE_SIZE = 11;

    private HashEntry<AnyType>[ ] array; // The array of elements
    private int currentSize;              // The number of occupied cells
    int num_collision_;

    /**
     * Internal method to allocate array.
     * @param arraySize the size of the array.
     */
    @SuppressWarnings("unchecked")
    private void allocateArray( int arraySize )
    {
        array = new HashEntry[ nextPrime( arraySize ) ];
    }

    void resetCollision() {
        num_collision_ = 0;
    }

    int getNumCollisions() {
        return num_collision_;
    }

    int getNumElements() {
        return currentSize;
    }

    int getSize() {
        return array.length;
    }


    /**
     * Internal method to find a prime number at least as large as n.
     * @param n the starting number (must be positive).
     * @return a prime number larger than or equal to n.
     */
    private static int nextPrime( int n )
    {
        if( n <= 0 )
            n = 3;

        if( n % 2 == 0 )
            n++;

        for( ; !isPrime( n ); n += 2 )
            ;

        return n;
    }


    /**
     * Internal method to test if a number is prime.
     * Not an efficient algorithm.
     * @param n the number to test.
     * @return the result of the test.
     */
    private static boolean isPrime( int n )
    {
        if( n == 2 || n == 3 )
            return true;

        if( n == 1 || n % 2 == 0 )
            return false;

        for( int i = 3; i * i <= n; i += 2 )
            if( n % i == 0 )
                return false;

        return true;
    }


    public static void main( String [ ] args )
    {
        DoubleHashing<String> H = new DoubleHashing<String>( );

        System.out.println(H.getSize());

        final int NUMS = 400000;
        final int GAP  =   37;

        System.out.println( "Checking... (no more output means success)" );

        for( int i = GAP; i != 0; i = ( i + GAP ) % NUMS )
            H.insert( ""+i );
        for( int i = 1; i < NUMS; i+= 2 )
            H.remove( ""+i );

        for( int i = 2; i < NUMS; i+=2 )
            if( !H.contains( ""+i ) )
                System.out.println( "Find fails " + i );

        for( int i = 1; i < NUMS; i+=2 )
        {
            if( H.contains( ""+i ) )
                System.out.println( "OOPS!!! " +  i  );
        }
    }

}
