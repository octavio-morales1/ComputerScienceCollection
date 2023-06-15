// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales
// code assisted by TA.

import java.util.Arrays;

public class MyTest {
    public static void main(String args[]){
        Firstnames[] namesList= new Firstnames[10];
        for(int x=0; x<namesList.length; x++){
            namesList[x]= new Firstnames();
        }
        for(int x=0; x<6; x++){
            long time= 0;
            int amt= 0;
            Firstnames[] temp= new Firstnames[10];
            if(x==0){
                System.out.println("Selection Sort: Names");
                System.out.println(Arrays.toString(namesList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(namesList);
                    temp= namesList.clone();
                    long start= System.nanoTime();
                    Selection.sort(namesList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Selection.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100.0) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(namesList));
            }
            else if(x==1){
                System.out.println("Insertion Sort: Names");
                System.out.println(Arrays.toString(namesList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(namesList);
                    temp= namesList.clone();
                    long start= System.nanoTime();
                    Insertion.sort(namesList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Insertion.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(namesList));
            }

            else if(x==2){
                System.out.println("Bubble Sort: Names");
                System.out.println(Arrays.toString(namesList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(namesList);
                    temp= namesList.clone();
                    long start= System.nanoTime();
                    Bubble.sort(namesList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Bubble.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100.0) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(namesList));
            }
            else if(x==3){
                System.out.println("Shuffling: Names");
                System.out.println(Arrays.toString(namesList));
                for(int y=0; y<100; y++){
                    temp= namesList.clone();
                    long start= System.nanoTime();
                    Shuffling.sort(namesList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Bubble.swapAmt(temp);
                }
                System.out.println(time/(Math.pow(10, 9)*100.0) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(namesList));
            }
            else if(x==4){
                System.out.println("Merge Sort: Names");
                System.out.println(Arrays.toString(namesList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(namesList);
                    temp= namesList.clone();
                    long start= System.nanoTime();
                    Merge.sort(namesList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Merge.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100.0) + " seconds on average");
                System.out.println(Double.toString(amt/100) + " swaps on average");
                System.out.println(Arrays.toString(namesList));
            }
            else if(x==5){
                System.out.println("Quick Sort: Names");
                System.out.println(Arrays.toString(namesList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(namesList);
                    temp= namesList.clone();
                    long start= System.nanoTime();
                    Quick.sort(namesList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Quick.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100.0) + " seconds on average");
                System.out.println(Double.toString(amt/100) + " swaps on average");
                System.out.println(Arrays.toString(namesList));
            }
            System.out.println("");
        }





        Date[] dateList= new Date[10];
        for(int x=0; x<dateList.length; x++){
            dateList[x]= new Date();
        }
        for(int x=0; x<6; x++){
            long time= 0;
            int amt= 0;
            Date[] temp= new Date[10];
            if(x==0){
                System.out.println("Selection Sort: Dates");
                System.out.println(Arrays.toString(dateList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(dateList);
                    temp= dateList.clone();
                    long start= System.nanoTime();
                    Selection.sort(dateList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Selection.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100.0) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(dateList));
            }
            else if(x==1){
                System.out.println("Insertion Sort: Dates");
                System.out.println(Arrays.toString(dateList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(dateList);
                    temp= dateList.clone();
                    long start= System.nanoTime();
                    Insertion.sort(dateList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Insertion.swapAmt(temp);

                }
                System.out.println((time/Math.pow(10, 9))/100.0 + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(dateList));
            }

            else if(x==2){
                System.out.println("Bubble Sort: Dates");
                System.out.println(Arrays.toString(dateList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(dateList);
                    temp= dateList.clone();
                    long start= System.nanoTime();
                    Bubble.sort(dateList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Bubble.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(dateList));
            }
            else if(x==3){
                System.out.println("Shuffling: Dates");
                System.out.println(Arrays.toString(dateList));
                for(int y=0; y<100; y++){
                    temp= dateList.clone();
                    long start= System.nanoTime();
                    Shuffling.sort(dateList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Bubble.swapAmt(temp);
                }
                System.out.println(time/(Math.pow(10, 9)*100) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(dateList));
            }
            else if(x==4){
                System.out.println("Merge Sort: Dates");
                System.out.println(Arrays.toString(dateList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(dateList);
                    temp= dateList.clone();
                    long start= System.nanoTime();
                    Merge.sort(dateList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Merge.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(dateList));
            }
            else if(x==5){
                System.out.println("Quick Sort: Dates");
                System.out.println(Arrays.toString(dateList));
                for(int y=0; y<100; y++){
                    Shuffling.sort(dateList);
                    temp= dateList.clone();
                    long start= System.nanoTime();
                    Quick.sort(dateList);
                    long end= System.nanoTime();
                    time+= (end-start);
                    amt+= Quick.swapAmt(temp);

                }
                System.out.println(time/(Math.pow(10, 9)*100) + " seconds on average");
                System.out.println(Double.toString(amt/100.0) + " swaps on average");
                System.out.println(Arrays.toString(dateList));
            }
            System.out.println("");
        }
    }
}
