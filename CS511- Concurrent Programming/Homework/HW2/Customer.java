import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CountDownLatch;

//Name: Octavio Morales
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.

public class Customer implements Runnable {
    private Bakery bakery;
    private Random rnd;
    private List<BreadType> shoppingCart;
    private int shopTime;
    private int checkoutTime;
    private CountDownLatch doneSignal;
    
    /**
     * Initialize a customer object and randomize its shopping cart
     */
    public Customer(Bakery bakery, CountDownLatch l) {
        // TODO
        this.bakery = bakery;
        doneSignal= l;
        rnd = new Random();
        shoppingCart = new ArrayList<BreadType>();
        fillShoppingCart();
        shopTime = rnd.nextInt(500);
        checkoutTime = rnd.nextInt(500);
    }

    /**
     * Run tasks for the customer
     */
    public void run() {
        // TODO
        System.out.println(toString()+ " has entered the bakery!");
        for (int x=0; x<shoppingCart.size(); x++) {
            //when the customer is getting rye bread from the shelf
            if (shoppingCart.get(x) == BreadType.RYE) {
                try {
                    bakery.shelf[0].acquire();
                } catch (InterruptedException err) {
                    err.printStackTrace();
                }
                bakery.takeBread(shoppingCart.get(x));
                try {
                    Thread.sleep(shopTime);
                } catch (InterruptedException err) {
                    err.printStackTrace();
                }
                System.out.println("Customer " + hashCode() + " has taken a loaf of " + shoppingCart.get(x).toString() + " bread.");
                bakery.shelf[0].release();
            }
            //when the customer is getting sourdough bread from the shelf
            else if (shoppingCart.get(x) == BreadType.SOURDOUGH) {
                try {
                    bakery.shelf[1].acquire();
                } catch (InterruptedException err) {
                    err.printStackTrace();
                }
                bakery.takeBread(shoppingCart.get(x));
                try {
                    Thread.sleep(shopTime);
                } catch (InterruptedException err) {
                    err.printStackTrace();
                }
                System.out.println("Customer " + hashCode() + " has taken a loaf of " + shoppingCart.get(x).toString() + " bread.");
                bakery.shelf[1].release();
            }
            //when the customer is getting wonder bread from the shelf
            else {
                try {
                    bakery.shelf[2].acquire();
                } catch (InterruptedException err) {
                    err.printStackTrace();
                }
                bakery.takeBread(shoppingCart.get(x));
                try {
                    Thread.sleep(shopTime);
                } catch (InterruptedException err) {
                    err.printStackTrace();
                }
                System.out.println("Customer " + hashCode() + " has taken a loaf of " + shoppingCart.get(x).toString() + " bread.");
                bakery.shelf[2].release();
            }
        }
        try {
            bakery.cashiers.acquire();
        } catch (InterruptedException err) {
            err.printStackTrace();
        }
        System.out.println("Customer " + hashCode() + " is starting to check out and now at the cashier!");
        float salesTotal = getItemsValue();
        try {
            Thread.sleep(checkoutTime);
        } catch (InterruptedException err) {
            err.printStackTrace();
        }
        try {
            bakery.allSales.acquire();
        } catch (InterruptedException err) {
            err.printStackTrace();
        }
        bakery.addSales(salesTotal);
        bakery.allSales.release();
        System.out.println("Customer " + hashCode() + " has finished checking out. They are now exiting the bakery!");
        bakery.cashiers.release();

    }

    /**
     * Return a string representation of the customer
     */
    public String toString() {
        return "Customer " + hashCode() + ": shoppingCart=" + Arrays.toString(shoppingCart.toArray()) + ", shopTime=" + shopTime + ", checkoutTime=" + checkoutTime;
    }

    /**
     * Add a bread item to the customer's shopping cart
     */
    private boolean addItem(BreadType bread) {
        // do not allow more than 3 items, chooseItems() does not call more than 3 times
        if (shoppingCart.size() >= 3) {
            return false;
        }
        shoppingCart.add(bread);
        return true;
    }

    /**
     * Fill the customer's shopping cart with 1 to 3 random breads
     */
    private void fillShoppingCart() {
        int itemCnt = 1 + rnd.nextInt(3);
        while (itemCnt > 0) {
            addItem(BreadType.values()[rnd.nextInt(BreadType.values().length)]);
            itemCnt--;
        }
    }

    /**
     * Calculate the total value of the items in the customer's shopping cart
     */
    private float getItemsValue() {
        float value = 0;
        for (BreadType bread : shoppingCart) {
            value += bread.getPrice();
        }
        return value;
    }
}
