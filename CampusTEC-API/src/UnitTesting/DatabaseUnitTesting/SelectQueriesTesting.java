package UnitTesting.DatabaseUnitTesting;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;

import DatabaseManagement.SelectQuerys.*;

public class SelectQueriesTesting {
    public static ArrayList<String> params1 = new ArrayList<>();
    public static ArrayList<String> params2= new ArrayList<>();
    public static ArrayList<String> params3= new ArrayList<>();
    public static ArrayList<String> params4= new ArrayList<>();
    public static ArrayList<String> params5= new ArrayList<>();
    public static ArrayList<String> params6= new ArrayList<>();
    public static ArrayList<String> params7 = new ArrayList<>();
    public static ArrayList<String> params8= new ArrayList<>();
    public static ArrayList<String> params9= new ArrayList<>();
    public static ArrayList<String> params10= new ArrayList<>();
    public static ArrayList<String> params11= new ArrayList<>();
    public static ArrayList<String> params12= new ArrayList<>();
    private static Connection connection;

    public static ArrayList<String> getConfigData() {
        try {
            File file = new File("Config.txt");
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            ArrayList<String> sb = new ArrayList<String>();
            String line;
            while ((line = br.readLine()) != null) {
                sb.add(line);
            }
            fr.close();
            return sb;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @BeforeAll
    public static void setParamsOfSearch() throws ClassNotFoundException, SQLException {
        ArrayList<String> configDB = getConfigData();
        Class.forName("com.mysql.jdbc.Driver");
        connection = DriverManager.getConnection(configDB.get(0), configDB.get(1), configDB.get(2));
        params1.add("1");//        ActivitiesSelectQueries.activitiesFromChallenge();

        //_________________________
        params2.add("2");//        ActivitiesSelectQueries.getActivitiesByPersonAndWeek();

        params2.add("3");
        //________________________
        params3.add("1");//        ActivitiesSelectQueries.getActivitiesFromChallenge();

        //____________________________
        params4.add("1");//        ActivitiesSelectQueries.getChallengePeople();

        //__________________________
        params5.add(" ");//        ActivitiesSelectQueries.getFileFromURL();

        //_____________________
        params6.add("9");//        ActivitiesSelectQueries.getHomeworkFromActivities();
//___________________________________________
        params7.add("2");//        ActivitiesSelectQueries.getHomeworkFromActivitiesAndPerson();
        //______________________________________
        params8.add("1");//        ActivitiesSelectQueries.getHomeworkFromID();
        //____________________________________
        params9.add("2");// //        ActivitiesSelectQueries.getHomeworkFromPerson();






//        ActivitiesSelectQueries.getActivitiesByPersonAndWeek();
//        ActivitiesSelectQueries.getObjectivesActivity();
//        ActivitiesSelectQueries.getObjectivesChallenge();
    }

    @Test
    public void testQuery1() {

    }
}
