import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Semaphore;
import java.util.concurrent.CountDownLatch;

//Name: Octavio Morales
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.

public class Bakery implements Runnable {
    private static final int TOTAL_CUSTOMERS = 200;
    private static final int CAPACITY = 50;
    private static final int FULL_BREAD = 20;
    private Map<BreadType, Integer> availableBread;
    private ExecutorService executor;
    private float sales = 0;
    private CountDownLatch doneSignal = new CountDownLatch(TOTAL_CUSTOMERS);
    // TODO
    public Semaphore cashiers;
    public Semaphore[] shelf= new Semaphore[3];
    public Semaphore allSales;

    /**
     * Remove a loaf from the available breads and restock if necessary
     */
    public void takeBread(BreadType bread) {
        int breadLeft = availableBread.get(bread);
        if (breadLeft > 0) {
            availableBread.put(bread, breadLeft - 1);
        } else {
            System.out.println("No " + bread.toString() + " bread left! Restocking...");
            // restock by preventing access to the bread stand for some time
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ie) {
                ie.printStackTrace();
            }
            availableBread.put(bread, FULL_BREAD - 1);
        }
    }

    /**
     * Add to the total sales
     */
    public void addSales(float value) {
        sales += value;
    }

    /**
     * Run all customers in a fixed thread pool
     */
    public void run() {
        availableBread = new ConcurrentHashMap<BreadType, Integer>();
        availableBread.put(BreadType.RYE, FULL_BREAD);
        availableBread.put(BreadType.SOURDOUGH, FULL_BREAD);
        availableBread.put(BreadType.WONDER, FULL_BREAD);

        // TODO
        shelf[0]= new Semaphore(1); //rye bread
        shelf[1]= new Semaphore(1); //sourdough bread
        shelf[2]= new Semaphore(1); //wonder bread
        allSales = new Semaphore(1); //semaphore for our sales access
        cashiers = new Semaphore(4); //semaphore for cashiers
        executor = Executors.newFixedThreadPool(CAPACITY);

        int x=0;
        while(x<TOTAL_CUSTOMERS){
            executor.execute(() -> {
                new Customer(this, doneSignal).run();
                doneSignal.countDown();  // Decreases the latch count (doneSignal) after each customer completes
            });
            ++x;
        }
        executor.shutdown();
        try {
            doneSignal.await();
        } catch(InterruptedException err) {
            err.printStackTrace();
        }
        System.out.println("Total Sales: " + sales);
    }
}
