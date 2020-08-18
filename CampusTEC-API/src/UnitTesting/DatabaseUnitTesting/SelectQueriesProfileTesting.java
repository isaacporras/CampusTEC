package UnitTesting.DatabaseUnitTesting;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import DatabaseManagement.SelectQuerys.ProfileSelectQueries;
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

import static org.junit.jupiter.api.Assertions.*;

public class SelectQueriesProfileTesting {
    public static ArrayList<String> params1 = new ArrayList<>();
    public static ArrayList<String> params2= new ArrayList<>();
    public static ArrayList<String> params3= new ArrayList<>();
    public static ArrayList<String> params4= new ArrayList<>();
    public static ArrayList<String> params5= new ArrayList<>();
    public static ArrayList<String> params6= new ArrayList<>();
    public static ArrayList<String> params7 = new ArrayList<>();
    public static ArrayList<String> params8= new ArrayList<>();
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
        params1.add("2");//        ProfileSelectQueries.getCourses();

        //_________________________
        params2.add("1");//        ProfileSelectQueries.getLoginInfo();

        params2.add("contra1");
        //________________________
        params3.add("2");//        ProfileSelectQueries.getProfileInfo();

        //____________________________
        params4.add("2");//        ProfileSelectQueries.getProfileInfoTotal();
        params4.add("1");//        ProfileSelectQueries.getProfileInfoTotal();

        //__________________________
        params5.add("2");//        ProfileSelectQueries.getTecColonesInfo();

        //_____________________
        params6.add("2");//        ProfileSelectQueries.getUniversityFromPerson();
//___________________________________________
        params7.add("2");//        ProfileSelectQueries.getCampusFromPerson();
        //______________________________________
        params8.add("2");//        ProfileSelectQueries.getIdFromPersonID();
        //____________________________________
    }

    @Test
    public void testQuery1() throws SQLException {
        ResultSet result = ProfileSelectQueries.getCourses(params1, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertFalse(result.next());
    }

    @Test
    public void testQuery2() throws SQLException {
        ResultSet result = ProfileSelectQueries.getLoginInfo(params2, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertFalse(result.next());
    }
    @Test
    public void testQuery3() throws SQLException {
        ResultSet result = ProfileSelectQueries.getProfileInfo(params3, connection);
        assertTrue(result.next());
        assertEquals(result.getString(2), "Kenneth");
        assertFalse(result.next());
    }
    @Test
    public void testQuery4() throws SQLException {
        ResultSet result = ProfileSelectQueries.getProfileInfoTotal(params4, connection);
        assertTrue(result.next());
        assertEquals(result.getString(2), "Kenneth");
        assertFalse(result.next());
    }

    @Test
    public void testQuery5() throws SQLException {
        ResultSet result = ProfileSelectQueries.getTecColonesInfo(params5, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(2), 0);
        assertFalse(result.next());
    }
    @Test
    public void testQuery6() throws SQLException {
        ResultSet result = ProfileSelectQueries.getUniversityFromPerson(params6, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertFalse(result.next());
    }
    @Test
    public void testQuery7() throws SQLException {
        ResultSet result = ProfileSelectQueries.getCampusFromPerson(params7, connection);
        assertTrue(result.next());
        assertEquals(result.getInt(1), 1);
        assertFalse(result.next());
    }
    @Test
    public void testQuery8() throws SQLException {
        ResultSet result = ProfileSelectQueries.getIdFromPersonID(params8, connection);
        assertTrue(result.next());
        assertEquals(result.getString(1), "2");
        assertFalse(result.next());
    }

}
