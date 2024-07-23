import java.io.*;
import java.util.*;


//Name: Octavio Morales
//Homework 1
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.


public class TextSwap {

    private static String readFile(String filename, int chunkSize) throws Exception {
        String line;
        StringBuilder buffer = new StringBuilder();
        File file = new File(filename);
	// The "-1" below is because of this:
	// https://stackoverflow.com/questions/729692/why-should-text-files-end-with-a-newline
	// if ((file.length()-1) % chunkSize!=0)
	//     { throw new Exception("File size not multiple of chunk size"); };
        BufferedReader br = new BufferedReader(new FileReader(file));
        while ((line = br.readLine()) != null){
            buffer.append(line);
        }
        br.close();
        return buffer.toString();
    }

    private static Interval[] getIntervals(int numChunks, int chunkSize) {
        // TODO: Implement me!
        Interval[] tempErval = new Interval[numChunks];
        //get it? temp Interval... tempErval... :D
        for (int x = 0; x <= numChunks-1; x++){
            int tempamt= chunkSize*x;
            tempErval[x] = new Interval(tempamt, (tempamt+chunkSize-1));
        }
        return tempErval;
    }

    private static List<Character> getLabels(int numChunks) {
        Scanner scanner = new Scanner(System.in);
        List<Character> labels = new ArrayList<Character>();
        int endChar = numChunks == 0 ? 'a' : 'a' + numChunks - 1;
        System.out.printf("Input %d character(s) (\'%c\' - \'%c\') for the pattern.\n", numChunks, 'a', endChar);
        for (int i = 0; i < numChunks; i++) {
            labels.add(scanner.next().charAt(0));
        }
        scanner.close();
        // System.out.println(labels);
        return labels;
    }

    private static char[] runSwapper(String content, int chunkSize, int numChunks) {
        List<Character> labels = getLabels(numChunks);
        Interval[] intervals = getIntervals(numChunks, chunkSize);
        // TODO: Order the intervals properly, then run the Swapper instances.

        char[] outputBuffer = new char[content.length()];
        Thread threadList[] = new Thread[intervals.length];

        //To order the intervals while also starting the threading
        for (int x = 0; x < intervals.length; x++){
            threadList[x] = new Thread(new Swapper(intervals[labels.get(x) - 'a'], content, outputBuffer, x * chunkSize));
            threadList[x].start();
        }
        //this for loop is to finish the threading, "waiting for it to die"
        for(int x = 0; x < intervals.length; x++){
            try{
                threadList[x].join();
            } catch(Exception e){
                System.out.print("Interrupted Excpetion " + e);
            }
        }
        return outputBuffer;
    }

    private static void writeToFile(String contents, int chunkSize, int numChunks) throws Exception {
        char[] buff = runSwapper(contents, chunkSize, contents.length() / chunkSize);
        PrintWriter writer = new PrintWriter("output.txt", "UTF-8");
        writer.print(buff);
        writer.close();
    }

     public static void main(String[] args) {
        if (args.length != 2) {
            System.out.println("Usage: java TextSwap <chunk size> <filename>");
            return;
        }
        String contents = "";
        int chunkSize = Integer.parseInt(args[0]);
        try {
            contents = readFile(args[1],chunkSize);
            writeToFile(contents, chunkSize, contents.length() / chunkSize);
        } catch (Exception e) {
            System.out.println("Error with IO.");
            return;
        }
    }
}
