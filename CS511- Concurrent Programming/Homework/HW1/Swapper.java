//Name: Octavio Morales
//Homework 1
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.

public class Swapper implements Runnable {
    private int offset;
    private Interval interval;
    private String content;
    private char[] buffer;

    public Swapper(Interval interval, String content, char[] buffer, int offset) {
        this.offset = offset;
        this.interval = interval;
        this.content = content;
        this.buffer = buffer;
    }

    @Override
    public void run() {
        // TODO: Implement me!
        for (int x= 0; x< interval.getY()-interval.getX() + 1; x++){
            buffer[offset + x] = content.charAt(x + interval.getX());
        }
    }
}