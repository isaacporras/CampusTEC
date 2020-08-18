package Model;

import DatabaseManagement.AddQuerys.AddQueries;
import DatabaseManagement.DBConnection;
import DatabaseManagement.ModifyQueries.UpdateQueries;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import DatabaseManagement.SelectQuerys.GetCourseInfo;
import DatabaseManagement.SelectQuerys.ProfileSelectQueries;
import Model.Objects.Activity;
import Model.Objects.Assignment;
import Model.Objects.Challenge;
import Model.Objects.Course;

import javax.json.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Planner {

    public static ArrayList<Assignment> getAssignments(JsonObject req) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(req.getString("token"));
        ResultSet result = ActivitiesSelectQueries.getHomeworkFromActivitiesAndPerson(param, DBConnection.getConnection());
        ArrayList<Assignment> assignments = new ArrayList<>();
        while (result.next()) {
            if (req.getString("semana").equals(result.getString("semana"))) {
                continue;
            }
            Assignment assignment = new Assignment();
            assignment.id = result.getString("IdTarea");
            assignment.name = result.getString("Titulo");
            assignment.day = result.getString("NumDia");
            assignment.description = result.getString("Descripcion");
            assignment.time = result.getString("Hora");
            assignment.activity = result.getString("actividad.Titulo");
            assignment.done = result.getBoolean("Completado");
            assignments.add(assignment);
        }
        return assignments;
    }

    public static ArrayList<Course> getChallenges(JsonObject req) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(req.getString("token"));
        ResultSet result = ProfileSelectQueries.getCourses(param, DBConnection.getConnection());
        ArrayList<Course> courses = new ArrayList<>();
        while (result.next()) {
            Course course = new Course();
            course.id = result.getString("IdCurso");
            course.name = result.getString("Nombre");
            course.group = result.getString("Numero");

            ArrayList<String> paramChallenge = new ArrayList<>();
            paramChallenge.add(course.id);
            ResultSet resultChallenges = GetCourseInfo.getCourseChallenges(paramChallenge, DBConnection.getConnection());
            while (resultChallenges.next()) {
                Challenge challenge = new Challenge();
                challenge.id = resultChallenges.getString("IdRetoAcademico");
                challenge.name = resultChallenges.getString("Titulo");
                ArrayList<String> paramActivity = new ArrayList<>();
                paramActivity.add(challenge.id);
                ResultSet resultActivities = ActivitiesSelectQueries.getActivitiesFromChallenge(paramActivity, DBConnection.getConnection());
                while (resultActivities.next()) {
                    Activity activity = new Activity();
                    activity.id = resultActivities.getString("IdActividad");
                    activity.name = resultActivities.getString("Titulo");
                    challenge.children.add(activity);
                }
                course.challenges.add(challenge);
            }
            courses.add(course);
        }
        return courses;
    }

    public static ArrayList<Course> getActivities(JsonObject req) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(req.getString("token"));
        param.add(req.getString("week"));
        ResultSet result = ActivitiesSelectQueries.getActivitiesByPersonAndWeek(param, DBConnection.getConnection());
        ArrayList<Course> courses = new ArrayList<>();
        while (result.next()) {
            Course course = new Course();
            course.id = result.getString("IdCurso");
            course.name = result.getString("Nombre");
//            course.group = result.getString("Numero");

            Activity activity = new Activity();
            activity.id = result.getString("IdActividad");
            activity.name = result.getString("Titulo");
            course.activities.add(activity);
            courses.add(course);
        }
        return courses;
    }

    public static Assignment getAssignment(String id) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(id);
        ResultSet result = ActivitiesSelectQueries.getHomeworkFromID(param, DBConnection.getConnection());
        result.next();
        Assignment assignment = new Assignment();
        assignment.name = result.getString("Titulo");
        assignment.week = result.getInt("Semana");
        assignment.day = result.getString("NumDia");
        assignment.time = result.getString("Hora");
        assignment.description = result.getString("Descripcion");
        assignment.activity = result.getString("a.Titulo");

        return assignment;
    }

    public static Integer newAssignment(Assignment assignment) throws SQLException, ClassNotFoundException {
        ArrayList<String> params = new ArrayList<>();
        params.add(assignment.token);
        params.add(assignment.activity);
        params.add(assignment.name);
        params.add(assignment.week.toString());
        params.add(assignment.day);
        params.add(assignment.description);
        params.add(assignment.time);
        ResultSet resultSet = AddQueries.createHomework(params, DBConnection.getConnection());
        resultSet.next();
        return resultSet.getInt(1);

    }


    public static Activity getActivity(String activity) {
        return null;
    }

    public static Challenge getChallenge(String challenge) throws SQLException, ClassNotFoundException {
        return ChallengeView.getChallengeInfo(challenge);
    }

    public static Boolean updateAssignment(Assignment assignment) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(assignment.name);
        param.add(assignment.description);
        param.add(assignment.time);
        param.add(assignment.day);
        Boolean done = assignment.done;
        param.add(done.toString());
        param.add(assignment.id);
        return UpdateQueries.updateHomework(param, DBConnection.getConnection());


    }
}


