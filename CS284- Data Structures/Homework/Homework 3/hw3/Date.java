// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. Octavio Morales

import java.text.SimpleDateFormat;
import java.util.Calendar;

// code assisted by TA.
public class Date implements Comparable<Date>{
    private String date;

    public Date(){
        int[]days={0,31,28,31,30,31,30,31,31,30,31,30,31};
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Calendar calendar = Calendar.getInstance();
        String year = ""+(int)(Math.random()*1022+1000);
        int month = (int)(Math.random()*12+1);
        int day = (int)(Math.random()*(days[month])+1);
        date = ""+year+month+day;
    }
    public String toString(){
        return this.date;
    }
    public String getDate(){
        return this.date;
    }

    public int compareTo(Date day) {
        return this.getDate().compareTo(day.getDate());
    }

}
