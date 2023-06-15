//Name: Octavio Morales
//Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales

//Note: Some code was given in class and some pseudo code was on the hw instruction sheet.

import java.util.*;
import java.util.ArrayList;

public class BinarySearchTree<E>{
    private static class Node<E>{
        private Node left;
        private Node right;
        private E value;

        public Node(E v) {
            if (v == null) {
                throw new IllegalArgumentException("");
            }
            this.value = v;
            this.left = null;
            this.right = null;
        }
        public String toString(){
            return ((String) this.value);
        }
    }

    private Node root;
    private int counter= 0;
    public BinarySearchTree(){
        this.root= null;
    }

    public void insertValue(Double k, BinarySearchTree T){
        if(T.root==null){
            T.root= new Node(k);
        }
        else {
            Node<E> parent = findParent(k, T.root);
            if (k <= (Double) parent.value) {
                if (parent.left == null) {
                    parent.left = new Node(k);
                } else {
                    throw new IllegalArgumentException("");
                }
            } else {
                if (parent.right == null) {
                    parent.right = new Node(k);
                } else {
                    throw new IllegalArgumentException("");
                }
            }
            counter++;
        }
    }

    public Node<E> findParent(Double k, Node<E> v){
        if(k<= (Double) v.value && v.left==null){
            return v;
        }
        else if(k>(Double) v.value && v.right==null){
            return v;
        }
        else{
            if(k<=(Double) v.value){
                return findParent(k, v.left);
            }
            else{
                return findParent(k, v.right);
            }
        }
    }

    public void printOrder(){
        Stack<Node> stack = new Stack<>();
        Node<E> temp= root;
        String ans= "In Order: ";
        if(temp!=null){
            while(stack.empty()!=true || temp!= null){
                if(temp!=null){
                    stack.push(temp);
                    temp=temp.left;
                }
                else{
                    Node<E> temp2= stack.pop();
                    temp=temp2.right;
                    ans+= Double.toString((Double) temp2.value) +", ";
                }
            }
        }
        ans= ans.substring(0, ans.length()-2);
        System.out.println(ans);
    }

    public static void main(String args[]){
        BinarySearchTree test= new BinarySearchTree();
        Scanner scanner = new Scanner(System.in);
        ArrayList<Double> collector= new ArrayList<>();
        System.out.println("Enter input: <Double Value>  | Enter Nothing To Move On");
        String input= scanner.nextLine();
        while(input.equals("")!=true){
            double num= Double.parseDouble(input);
            test.insertValue(num, test);
            collector.add(num);
            input= scanner.nextLine();
        }
        int ctr= 0;
        for(int x=1; collector.isEmpty()!=true; x*=2){
            String spacers= "";
            for(int z=0; x<ctr; x++){
                spacers+= "    ";
            }
            for(int y=x; y>0 && collector.isEmpty()!=true; y--){
                System.out.print(Double.toString(collector.remove(0)) + "," + spacers);
            }
            System.out.println();
            ctr++;
        }
        System.out.println();
        test.printOrder();
    }
}