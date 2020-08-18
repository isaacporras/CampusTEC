package UnitTesting.ModelTesting;

import Model.ChallengeView;
import Model.Objects.Assignment;
import Model.Objects.Challenge;
import Model.Objects.Course;
import Model.Planner;
import org.junit.jupiter.api.Test;

import javax.json.JsonObject;
import java.sql.SQLException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class PlannerTest {


    @Test
    public void tesgetAssignments() throws SQLException, ClassNotFoundException {
        JsonObject request = null;
        ArrayList<Assignment> x = Planner.getAssignments(request);
        ArrayList<Assignment> A = new ArrayList<Assignment>();
        //Tiene que hacer la lista
        assertIterableEquals(x, A);
    }

    @Test
    public void tesgetChallenges() throws SQLException, ClassNotFoundException {
        JsonObject request = null;
        ArrayList<Course> x = Planner.getChallenges(request);
        ArrayList<Course> A = new ArrayList<Course>();
        //Tiene que hacer la lista
        assertIterableEquals(x, A);
    }

    @Test
    public void tesgetActivities() throws SQLException, ClassNotFoundException {
        JsonObject request = null;
        ArrayList<Course> x = Planner.getActivities(request);
        ArrayList<Course> A = new ArrayList<Course>();
        //Tiene que hacer la lista
        assertIterableEquals(x, A);
    }

    @Test
    public void tesgetAssignment() throws SQLException, ClassNotFoundException {
        JsonObject request = null;
        Assignment x = Planner.getAssignment("1");
        Assignment A = new Assignment();
        //Tiene que hacer la lista
        assertEquals(x, A);
    }

    @Test
    public void tesnewAssignment() throws SQLException, ClassNotFoundException {
        Assignment request = null;
        int x = Planner.newAssignment(request);

        //Tiene que hacer la lista
        assertEquals(x, 1);
    }

    @Test
    public void tesgetChallenge() throws SQLException, ClassNotFoundException {
        JsonObject request = null;
        Challenge x = Planner.getChallenge("1");
        Challenge A = new Challenge();
        //Tiene que hacer la lista
        assertEquals(x, A);
    }

    @Test
    public void tesupdateAssignment() throws SQLException, ClassNotFoundException {
        Assignment request = null;
        boolean x = Planner.updateAssignment(request);

        assertTrue(x);
    }
}
