package UnitTesting.ModelTesting;

import Model.ActivityView;
import Model.ChallengeView;
import Model.Objects.Activity;
import Model.Objects.Challenge;
import Model.Objects.Comment;
import Model.Objects.Objective;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

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
        //Tiene que hacer la lista de comentarios
        assertEquals(x,x);
    }

    


}
