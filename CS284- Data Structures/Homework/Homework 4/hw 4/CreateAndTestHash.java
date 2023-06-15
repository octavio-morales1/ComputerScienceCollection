//Name: Octavio Morales
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.

//Note: This code is based on the TestFunctionForHashTable.java, which was given in class to be used and altered for the homework.

import java.io.IOException;
import java.util.Locale;
import java.util.Scanner;
import java.io.FileNotFoundException;
import java.io.File;

public class CreateAndTestHash<E>{
    public static void main (String[] args) throws IOException{
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter input: CreateAndTestHash <words file name> <query words file name> <flag>");
        String input = scan.nextLine();
        System.out.println();
        String[] irray = input.split(" ");
        File file;

        if(irray[3].equals("quadratic")==true) {
            System.out.println("Quadratic Hashing");
            System.out.println("____________________________");
            System.out.println();
            QuadraticProbingHashTable HashT = new QuadraticProbingHashTable();
            try{
                file = new File("hw4/"+irray[1]);
                Scanner lines = new Scanner(file);
                for(String temp= ""; lines.hasNextLine()==true; temp= lines.nextLine()){
                    HashT.insert(temp);
                }
                lines.close();
            }
            catch (FileNotFoundException error) {
                System.out.println("Error: File Not Found");
                error.printStackTrace();
            }

            System.out.println("Number Of Elements In The Table (N): " + Integer.toString(HashT.getNumElements()));
            System.out.println();
            System.out.println("Size Of The Table (T): " + Integer.toString(HashT.getSize()));
            System.out.println();
            System.out.println("Load factor (N/T): " + Double.toString((HashT.getNumElements() / ((double) HashT.getSize()))));
            System.out.println();
            System.out.println("Total collisions (C): " + Integer.toString(HashT.getNumCollisions()));
            System.out.println();
            System.out.println("Average Number Of Collisions (N/C): " + Double.toString((HashT.getNumCollisions() / ((double)(HashT.getNumElements())))));
            System.out.println();


            try {
                file = new File("hw4/"+ irray[2]);
                Scanner lines = new Scanner(file);
                for(String temp= lines.nextLine(); lines.hasNextLine()==true; temp= lines.nextLine()){
                    HashT.resetCollision();
                    if(HashT.contains(temp)==true){
                        System.out.println(temp + " found, " + HashT.getNumCollisions() + " collisions");
                    }
                    else{
                        System.out.println(temp + " was not found, " + HashT.getNumCollisions() + " collisions");
                    }
                }
                lines.close();
            }
            catch (FileNotFoundException error) {
                System.out.println("Error: File Not Found");
                error.printStackTrace();
            }
        }

        if(irray[3].equals("linear")==true) {
            System.out.println("Linear Hashing");
            System.out.println("____________________________");
            System.out.println();
            LinearProbingHashTable HashT = new LinearProbingHashTable();
            try{
                file = new File("hw4/"+irray[1]);
                Scanner lines = new Scanner(file);
                for(String temp= ""; lines.hasNextLine()==true; temp= lines.nextLine()){
                    HashT.insert(temp);
                }
                lines.close();
            }
            catch (FileNotFoundException error) {
                System.out.println("Error: File Not Found");
                error.printStackTrace();
            }

            System.out.println("Number Of Elements In The Table (N): " + Integer.toString(HashT.getNumElements()));
            System.out.println();
            System.out.println("Size Of The Table (T): " + Integer.toString(HashT.getSize()));
            System.out.println();
            System.out.println("Load factor (N/T): " + Double.toString((HashT.getNumElements() / ((double) HashT.getSize()))));
            System.out.println();
            System.out.println("Total collisions (C): " + Integer.toString(HashT.getNumCollisions()));
            System.out.println();
            System.out.println("Average Number Of Collisions (N/C): " + Double.toString((HashT.getNumCollisions() / ((double)(HashT.getNumElements())))));
            System.out.println();


            try {
                file = new File("hw4/"+ irray[2]);
                Scanner lines = new Scanner(file);
                for(String temp= lines.nextLine(); lines.hasNextLine()==true; temp= lines.nextLine()){
                    HashT.resetCollision();
                    if(HashT.contains(temp)==true){
                        System.out.println(temp + " found, " + HashT.getNumCollisions() + " collisions");
                    }
                    else{
                        System.out.println(temp + " was not found, " + HashT.getNumCollisions() + " collisions");
                    }
                }
                lines.close();
            }
            catch (FileNotFoundException error) {
                System.out.println("Error: File Not Found");
                error.printStackTrace();
            }
        }

        if(irray[3].equals("double")==true) {
            System.out.println("Double Hashing");
            System.out.println("____________________________");
            System.out.println();
            LinearProbingHashTable HashT = new LinearProbingHashTable();
            try{
                file = new File("hw4/"+irray[1]);
                Scanner lines = new Scanner(file);
                for(String temp= ""; lines.hasNextLine()==true; temp= lines.nextLine()){
                    HashT.insert(temp);
                }
                lines.close();
            }
            catch (FileNotFoundException error) {
                System.out.println("Error: File Not Found");
                error.printStackTrace();
            }

            System.out.println("Number Of Elements In The Table (N): " + Integer.toString(HashT.getNumElements()));
            System.out.println();
            System.out.println("Size Of The Table (T): " + Integer.toString(HashT.getSize()));
            System.out.println();
            System.out.println("Load factor (N/T): " + Double.toString((HashT.getNumElements() / ((double) HashT.getSize()))));
            System.out.println();
            System.out.println("Total collisions (C): " + Integer.toString(HashT.getNumCollisions()));
            System.out.println();
            System.out.println("Average Number Of Collisions (N/C): " + Double.toString((HashT.getNumCollisions() / ((double)(HashT.getNumElements())))));
            System.out.println();


            try {
                file = new File("hw4/"+ irray[2]);
                Scanner lines = new Scanner(file);
                for(String temp= lines.nextLine(); lines.hasNextLine()==true; temp= lines.nextLine()){
                    HashT.resetCollision();
                    if(HashT.contains(temp)==true){
                        System.out.println(temp + " found, " + HashT.getNumCollisions() + " collisions");
                    }
                    else{
                        System.out.println(temp + " was not found, " + HashT.getNumCollisions() + " collisions");
                    }
                }
                lines.close();
            }
            catch (FileNotFoundException error) {
                System.out.println("Error: File Not Found");
                error.printStackTrace();
            }
        }
    }
}
