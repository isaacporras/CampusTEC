package UnitTesting.DatabaseUnitTesting;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import DatabaseManagement.SelectQuerys.*;

import javax.xml.transform.Result;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class SelectQueriesTesting {
    public static ArrayList<String> params1 = new ArrayList<>();
    public static ArrayList<String> params2 = new ArrayList<>();
    public static ArrayList<String> params3 = new ArrayList<>();
    public static ArrayList<String> params4 = new ArrayList<>();
    public static ArrayList<String> params5 = new ArrayList<>();
    public static ArrayList<String> params6 = new ArrayList<>();
    public static ArrayList<String> params7 = new ArrayList<>();
    public static ArrayList<String> params8 = new ArrayList<>();
    public static ArrayList<String> params9 = new ArrayList<>();
    public static ArrayList<String> params10 = new ArrayList<>();
    public static ArrayList<String> params11 = new ArrayList<>();
    public static ArrayList<String> params12 = new ArrayList<>();
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
        params5.add("test1");//        ActivitiesSelectQueries.getFileFromURL();

        //_____________________
        params6.add("9");//        ActivitiesSelectQueries.getHomeworkFromActivities();
//___________________________________________
        params7.add("2");//        ActivitiesSelectQueries.getHomeworkFromActivitiesAndPerson();
        //______________________________________
        params8.add("1");//        ActivitiesSelectQueries.getHomeworkFromID();
        //____________________________________
        params9.add("2");// //        ActivitiesSelectQueries.getHomeworkFromPerson();
        //----------------------
        params10.add("2"); //        ActivitiesSelectQueries.getActivitiesByPersonAndWeek();
        params10.add("3");
        //_____________________
        params10.add("2");//        ActivitiesSelectQueries.getObjectivesActivity();
        //___________________________
        params11.add("2");//        ActivitiesSelectQueries.getObjectivesChallenge();


    }

    @Test
    public void testQuery1() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.activitiesFromChallenge(params1, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 5);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 6);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 7);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 8);
        assertFalse(result.next());
    }

    @Test
    public void testQuery2() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getActivitiesByPersonAndWeek(params2, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 9);
        assertFalse(result.next());
    }

    @Test
    public void testQuery3() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getActivitiesFromChallenge(params3, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 5);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 6);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 7);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 8);
        assertFalse(result.next());
    }

    @Test
    public void testQuery4() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getChallengePeople(params4, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(2), 2);
        assertTrue(result.next());
        assertEquals(result.getInt(2), 3);
        assertFalse(result.next());
    }

    @Test
    public void testQuery5() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getFileFromURL(params5, connection);
        ;
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertFalse(result.next());

    }

    @Test
    public void testQuery6() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getHomeworkFromActivities(params6, connection);
        ;
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 2);
        assertFalse(result.next());
    }

    @Test
    public void testQuery7() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getHomeworkFromActivitiesAndPerson(params7, connection);
        ;
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 3);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 4);
        assertFalse(result.next());
    }

    @Test
    public void testQuery8() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getHomeworkFromID(params8, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertFalse(result.next());
    }

    @Test
    public void testQuery9() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getHomeworkFromPerson(params9, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 3);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 4);
        assertFalse(result.next());
    }

    @Test
    public void testQuery10() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getActivitiesByPersonAndWeek(params10, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 9);
        assertFalse(result.next());
    }

    @Test
    public void testQuery11() throws SQLException {
        ResultSet result = ActivitiesSelectQueries.getObjectivesChallenge(params10, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 6);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 7);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 5);
        assertFalse(result.next());
    }

    @AfterAll
    public static void close() throws SQLException {
        connection.close();
    }
}
