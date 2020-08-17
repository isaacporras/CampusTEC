package Model;

import DatabaseManagement.AddQuerys.AddQueries;
import DatabaseManagement.DBConnection;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import DatabaseManagement.SelectQuerys.GetCourseInfo;
import DatabaseManagement.SelectQuerys.ProfileSelectQueries;
import Model.Objects.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Teacher {


    public static ArrayList<Course> getClasses(String token) {
        ArrayList<Course> classes = new ArrayList<>();
        ArrayList<String> param = new ArrayList<>();
        param.add(token);
        try {
            ResultSet result = ProfileSelectQueries.getCourses(param, DBConnection.getConnection());

            while (result.next()) {
                Course course = new Course();
                course.id = result.getString("IdCurso");
                course.name = result.getString("Nombre");
                course.group = result.getString("Numero");
                classes.add(course);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return classes;
    }

    public static ArrayList<Activity> getActivities(String course) {
        ArrayList<Activity> activities = new ArrayList<>();
        ArrayList<String> param = new ArrayList<>();
        param.add(course);
        try {
            ResultSet result = GetCourseInfo.getCourseActivities(param, DBConnection.getConnection());

            while (result.next()) {
                Activity activity = new Activity();
                activity.id = result.getString("IdActividad");
                activity.name = result.getString("Titulo");
                activities.add(activity);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return activities;
    }

    public static ArrayList<Challenge> getActivitiesAndChallenges(String course) {
        ArrayList<Challenge> challenges = new ArrayList<>();
        ArrayList<String> param = new ArrayList<>();
        param.add(course);
        try {
            ResultSet result = GetCourseInfo.getCourseChallenges(param, DBConnection.getConnection());

            while (result.next()) {
                Challenge challenge = new Challenge();
                challenge.id = result.getString("IdRetoAcademico");
                challenge.name = result.getString("Titulo");
                ResultSet resultActivities = ActivitiesSelectQueries.getActivitiesFromChallenge(param, DBConnection.getConnection());
                while (resultActivities.next()) {
                    Activity activity = new Activity();
                    activity.id = resultActivities.getString("IdActividad");
                    activity.name = resultActivities.getString("Titulo");
                    challenge.children.add(activity);
                }
                challenges.add(challenge);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return challenges;
    }

    public static ArrayList<Objective> getObjectives(String course) {
        ArrayList<Objective> objectives = new ArrayList<>();
        ArrayList<String> param = new ArrayList<>();
        param.add(course);
        try {
            ResultSet result = GetCourseInfo.getCourseObjectives(param, DBConnection.getConnection());

            while (result.next()) {
                Objective objective = new Objective();
                objective.id = result.getString("IdObjetivo");
                objective.description = result.getString("Descripcion");
                objectives.add(objective);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return objectives;
    }

    public static Course getCourse(String id) {

        Course course = new Course();
        ArrayList<String> param = new ArrayList<>();
        param.add(id);
        try {
            ResultSet result = GetCourseInfo.getInfo(param, DBConnection.getConnection());
            result.next();
            course.id = result.getString("IdCurso");
            course.name = result.getString("Nombre");
            course.group = result.getString("Numero");

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return course;
    }

    public static Boolean newObjective(Objective objective) {

        ArrayList<String> param = new ArrayList<>();
        param.add(objective.idClass);
        param.add(objective.description);
        try {
            AddQueries.createObjective(param, DBConnection.getConnection());

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return true;
    }

}