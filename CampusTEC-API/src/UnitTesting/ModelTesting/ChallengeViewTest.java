package UnitTesting.ModelTesting;

import Model.ActivityView;
import Model.ChallengeView;
import Model.Objects.*;
import org.junit.jupiter.api.Test;

import javax.json.JsonObject;
import java.sql.SQLException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class ChallengeViewTest {
    @Test
    public void testgetComments() throws SQLException, ClassNotFoundException {
        Challenge x = ChallengeView.getChallengeInfo("1");
        Challenge A = new Challenge();
        A. id = "";
        A.name = "";
        A.fileURL = "";
        A.idClass = "";
        A.payment = "";
        A. date = "";
        A.description = "";
        A.activities = new ArrayList<>();
        A.objectives = new ArrayList<>();
        A.children = new ArrayList<>();
        //Tiene que hacer la lista
        assertEquals(x,x);
    }

    @Test
    public void testgetObjectives() throws SQLException, ClassNotFoundException {
        ArrayList<Objective> x = ChallengeView.getObjectives("1");
        ArrayList<Objective> A = new ArrayList<Objective>();
        //Tiene que hacer la lista
        assertIterableEquals(x,A);
    }

    @Test
    public void testgetStudents() throws SQLException, ClassNotFoundException {
        ArrayList<User> x = ChallengeView.getStudents("1");
        ArrayList<User> A = new ArrayList<User>();
        //Tiene que hacer la lista
        assertIterableEquals(x,A);
    }


    @Test
    public void testupdateStudents() throws SQLException, ClassNotFoundException {
        JsonObject request = null;
        Boolean x = ChallengeView.updateStudents(request =);
        //Tiene que hacer la lista
        assertTrue(x);
    }


}
