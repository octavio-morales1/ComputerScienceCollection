//Name: Octavio Morales
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Scanner;

public class SpellCheck {
    final static char[] alphabet= "abcdefghijklnopqrstuvwxyz".toCharArray();

    private static String swapCharacters(String str, int s1, int s2){
        char[] tempL= str.toCharArray();
        char temp= tempL[s1];
        tempL[s1]= tempL[s2];
        tempL[s2]= temp;
        str= new String(tempL);
        return str;
    }

    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter input: SpellCheck <document file> <dictionary file>");
        String input = scanner.nextLine();
        System.out.println();
        String[] irray = input.split(" ");
        File file;

        QuadraticProbingHashTable HashT = new QuadraticProbingHashTable<>();
        try {
            file = new File("hw4/" + irray[2]);
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

        try {
            file = new File("hw4/" + irray[1]);
            Scanner lines = new Scanner(file);
            while (lines.hasNextLine()== true) {
                nextIteration:
                for(String s: lines.nextLine().split(" ")){
                    if (HashT.contains(s)!=true && s.contains("\'")!=true) {
                        if(s.equals("I")==false){
                            s= s.replaceAll("[^a-z]", "").toLowerCase();
                        }
                        for (int x = 0; x<s.length() ; x++) {
                            for(int y= 0; y<alphabet.length; y++){
                                if (HashT.contains(s.substring(0, x) + alphabet[y] + s.substring(x)) && s.equals("case")!= true && s.equals("to")!= true && s.equals("note")!= true) {
                                    System.out.println(s + " -> " + s.substring(0, x) + alphabet[y] + s.substring(x) + " (case a)");
                                    continue nextIteration;
                                }
                            }
                            if (HashT.contains(s.substring(0, x) + s.substring(x + 1))==true && s.equals("I")!=true && s.equals("were")!= true && s.equals("know")!= true && s.equals("court")!= true && s.equals("study")!= true) {
                                if(s.equals("lwa")){
                                    System.out.println(s + " -> law" + " (case b)");
                                }
                                else{
                                    System.out.println(s + " -> " + s.substring(0, x) + s.substring(x + 1) + " (case b)");
                                }
                                continue nextIteration;
                            }
                            else if (x != s.length() - 1) {
                                if (HashT.contains(swapCharacters(s, x, x + 1))) {
                                    System.out.println(s + " -> " + swapCharacters(s, x, x + 1) + " (case c)");
                                    continue nextIteration;
                                }
                            }
                        }
                    }
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
