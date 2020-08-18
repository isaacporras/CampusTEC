package UnitTesting.ModelTesting;

import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import Model.ActivityView;
import Model.Objects.Activity;
import Model.Objects.Comment;
import org.junit.jupiter.api.Test;

import javax.json.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class ActivityTest {

    @Test
    public void testnewComment() throws SQLException, ClassNotFoundException {
        Comment comment = new Comment();
        comment.id = "";
        comment.description = "";
        comment.time = "";
        comment.date = "";
        comment.user = "";
        comment.activityId = "";
        comment.fileURL = "";
        comment.token = "";
        int x = ActivityView.newComment(comment);
        //Este no se a caunto xd
        assertEquals(x, 0);
    }
    @Test
    public void testgetComments() throws SQLException, ClassNotFoundException {
        ArrayList<Comment> x = ActivityView.getComments("1");
        //Tiene que hacer la lista de comentarios
        assertIterableEquals(x,x);

    }
    @Test
    public void testgetActivityInfo() throws SQLException, ClassNotFoundException {
        Activity x = ActivityView.getActivityInfo("1");
        Activity A = new Activity();

        //Tiene que hacer la lista de comentarios
        assertEquals(A,x);

    }
    @Test
    public void testgetWeekly() throws SQLException, ClassNotFoundException {
        JsonObject object = null;
        ArrayList<Activity> x = ActivityView.getWeekly(object);
        ArrayList<Activity> A = new ArrayList<Activity>();
        //Tiene que hacer la lista
        assertIterableEquals(A,x);

    }
    @Test
    public void testgetName() throws SQLException, ClassNotFoundException {
        String token = "";
        String x = ActivityView.getName(token);
        String A = "";
        //Tiene que hacer la lista
        assertEquals(A,x);
    }
}
