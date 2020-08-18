package UnitTesting.DatabaseUnitTesting;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.util.ArrayList;

public class SelectQueriesTesting {
    public static ArrayList<String> params1;
    public static ArrayList<String> params2;
    public static ArrayList<String> params3;
    public static ArrayList<String> params4;
    public static ArrayList<String> params5;
    public static ArrayList<String> params6;
    private static   Connection connection;

    public static ArrayList<String> getConfigData(){
        try
        {
            File file=new File("Config.txt");
            FileReader fr=new FileReader(file);
            BufferedReader br=new BufferedReader(fr);
            ArrayList<String>  sb=new ArrayList<String> ();
            String line;
            while((line=br.readLine())!=null)
            {
                sb.add(line);
            }
            fr.close();    //closes the stream and release the resources
            return sb;
        }
        catch(Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    @BeforeAll
    public static void setParamsOfSearch() {
        ArrayList<String> configDB= getConfigData();
        System.out.println(configDB.toArray());

    }
    @Test
    public void testQuery1(){

    }
}
