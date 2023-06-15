//Name: Octavio Morales
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Scanner;

public class TestFunctionForHashTable {
    public static void main(String[] args) throws IOException {
        QuadraticProbingHashTable qHashTable = new QuadraticProbingHashTable();
        try {
            File myObj = new File("hw4/words.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                qHashTable.insert(data);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        System.out.println("Number of elements: " + qHashTable.getNumElements());
        System.out.println("Size of the hash table: " + qHashTable.getSize());
        System.out.println("Load factor: " + (qHashTable.getNumElements() / (double)qHashTable.getSize()));
        System.out.println("Total collisions: " + qHashTable.getNumCollisions());
        System.out.println("Avg. number of collisions: " + (qHashTable.getNumCollisions() / (double)(qHashTable.getNumElements())));

    }
}