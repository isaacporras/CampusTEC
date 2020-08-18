package Model;

import DatabaseManagement.AddQuerys.AddQueries;
import DatabaseManagement.DBConnection;
import DatabaseManagement.ModifyQueries.UpdateQueries;
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
                param = new ArrayList<>();
                param.add(challenge.id);
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

    public static Integer newObjective(Objective objective) {

        ArrayList<String> param = new ArrayList<>();
        param.add(objective.idClass);
        param.add(objective.description);
        try {
            ResultSet resultSet = AddQueries.createObjective(param, DBConnection.getConnection());
            resultSet.next();
            return resultSet.getInt(1);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return -1;
    }

    public static Integer newActivity(Activity activity) {
        try {
            String fileId = "1";
            if (!activity.fileURL.equals("null")) {
                ArrayList<String> param = new ArrayList<>();
                param.add(activity.fileURL);
                param.add("archivo adjunto");
                AddQueries.createFile(param, DBConnection.getConnection());
                param = new ArrayList<>();
                param.add(activity.fileURL);
                ResultSet result = ActivitiesSelectQueries.getFileFromURL(param, DBConnection.getConnection());
                result.next();
                fileId = result.getString("IdFile");
            }
            ArrayList<String> paramActivity = new ArrayList<>();
            paramActivity.add(fileId);
            paramActivity.add(activity.week.toString());
            paramActivity.add("0");
            paramActivity.add(activity.date);
            paramActivity.add(activity.description);
            paramActivity.add(activity.idClass);
            paramActivity.add(activity.name);

            ResultSet resultSet = AddQueries.createActivity(paramActivity, DBConnection.getConnection());
            resultSet.next();
            Integer activityId = resultSet.getInt(1);
            for (Objective obj : activity.objectives) {
                ArrayList<String> paramlink = new ArrayList<>();
                paramlink.add(activityId.toString());
                paramlink.add(obj.id);
                AddQueries.createActivityObjective(paramlink, DBConnection.getConnection());
            }

            ArrayList<String> paramStudents = new ArrayList<>();
            paramStudents.add(activity.idClass);
            ResultSet students = GetCourseInfo.getCourseStudents(paramStudents, DBConnection.getConnection());
            while (students.next()) {
                ArrayList<String> param = new ArrayList();
                param.add(activityId.toString());
                param.add(students.getString("IdPersona"));
                param.add("false");
                AddQueries.setActivityPerson(param, DBConnection.getConnection());
            }

            return activityId;
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return -1;
    }

    public static Integer newChallenge(Challenge challenge) {
        try {
            String fileId = "1";
            if (!challenge.fileURL.equals("null")) {
                ArrayList<String> param = new ArrayList<>();
                param.add(challenge.fileURL);
                param.add("archivo adjunto");
                AddQueries.createFile(param, DBConnection.getConnection());
                param = new ArrayList<>();
                param.add(challenge.fileURL);
                ResultSet result = ActivitiesSelectQueries.getFileFromURL(param, DBConnection.getConnection());
                result.next();
                fileId = result.getString("IdFile");
            }
            ArrayList<String> paramChallenge = new ArrayList<>();
            paramChallenge.add(challenge.description);
            paramChallenge.add(challenge.name);
            paramChallenge.add(challenge.payment);
            paramChallenge.add(challenge.idClass);
            paramChallenge.add(fileId);
            paramChallenge.add(challenge.date);

            ResultSet resultSet = AddQueries.createChallenge(paramChallenge, DBConnection.getConnection());
            resultSet.next();
            Integer challengeId = resultSet.getInt(1);

            for (Activity activity : challenge.activities) {
                Integer activityId = newActivity(activity);
                ArrayList<String> paramLink = new ArrayList<>();
                paramLink.add(challengeId.toString());
                paramLink.add(activityId.toString());
                AddQueries.activityChallenge(paramLink, DBConnection.getConnection());
            }
            for (Objective obj : challenge.objectives) {
                ArrayList<String> paramlink = new ArrayList<>();
                paramlink.add(challengeId.toString());
                paramlink.add(obj.id);
                AddQueries.createChallengeObjective(paramlink, DBConnection.getConnection());
            }

            ArrayList<String> paramStudents = new ArrayList<>();
            paramStudents.add(challenge.idClass);
            ResultSet students = GetCourseInfo.getCourseStudents(paramStudents, DBConnection.getConnection());
            while (students.next()) {
                ArrayList<String> param = new ArrayList();
                param.add(challengeId.toString());
                param.add(students.getString("IdPersona"));
                param.add("false");
                AddQueries.setChallengePerson(param, DBConnection.getConnection());
            }

            return challengeId;
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return -1;
    }

}