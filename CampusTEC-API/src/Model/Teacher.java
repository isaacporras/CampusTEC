package Model;

import DatabaseManagement.DBConnection;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import DatabaseManagement.SelectQuerys.GetCourseInfo;
import DatabaseManagement.SelectQuerys.ProfileSelectQueries;
import Model.Objects.Activity;
import Model.Objects.Course;
import Model.Objects.User;

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
}