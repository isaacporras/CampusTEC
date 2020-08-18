package Model;

import DatabaseManagement.DBConnection;
import DatabaseManagement.ModifyQueries.UpdateQueries;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import DatabaseManagement.SelectQuerys.GetCourseInfo;
import DatabaseManagement.SelectQuerys.ProfileSelectQueries;
import Model.Objects.Activity;
import Model.Objects.Challenge;
import Model.Objects.Objective;
import Model.Objects.User;

import javax.json.JsonArray;
import javax.json.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ChallengeView {

    public static Challenge getChallengeInfo(String challengeId) throws SQLException, ClassNotFoundException {
        Challenge challenge = new Challenge();
        ArrayList<String> param = new ArrayList<>();
        param.add(challengeId);
        ResultSet result = ActivitiesSelectQueries.getChallengeInfo(param, DBConnection.getConnection());
        result.next();
        challenge.id = challengeId;
        challenge.name = result.getString("Titulo");
        challenge.date = result.getString("Fecha");
        challenge.payment = result.getString("TecColones");
        challenge.fileURL = result.getString("FileURL");


        ArrayList<String> paramActivity = new ArrayList<>();
        paramActivity.add(challenge.id);
        ResultSet resultActivities = ActivitiesSelectQueries.getActivitiesFromChallenge(paramActivity, DBConnection.getConnection());
        while (resultActivities.next()) {
            Activity activity = new Activity();
            activity.id = resultActivities.getString("IdActividad");
            activity.name = resultActivities.getString("Titulo");
            challenge.activities.add(activity);
        }

        challenge.objectives = getObjectives(challengeId);
        return challenge;
    }

    public static ArrayList<Objective> getObjectives(String challenge) {
        ArrayList<Objective> objectives = new ArrayList<>();
        ArrayList<String> param = new ArrayList<>();
        param.add(challenge);
        try {
            ResultSet result = ActivitiesSelectQueries.getObjectivesChallenge(param, DBConnection.getConnection());

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

    public static ArrayList<User> getStudents(String challenge) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(challenge);
        ResultSet resultSet = ActivitiesSelectQueries.getChallengePeople(param, DBConnection.getConnection());
        ArrayList<User> students = new ArrayList<>();
        while (resultSet.next()) {
            String idPersona = resultSet.getString("p.IdPersona");
            ArrayList<String> paramPersona = new ArrayList<>();
            paramPersona.add(idPersona);
            ResultSet userID = ProfileSelectQueries.getIdFromPersonID(paramPersona, DBConnection.getConnection());
            userID.next();
            User user = new User();
            user.id = userID.getString("Carne");
            user.name = resultSet.getString("Nombre");
            user.lastname = resultSet.getString("Apellido");
            user.completed = resultSet.getBoolean("Completado");
            students.add(user);
        }
        return students;

    }

    public static Boolean updateStudents(JsonObject request) throws SQLException, ClassNotFoundException {
        String challengeId = request.getString("challengeId");
        JsonArray students = request.getJsonArray("students");

        for (int i = 0; i < students.size(); i++) {
            JsonObject student = students.getJsonObject(i);
            String studentId = student.getString("token");
            Boolean state = student.getBoolean("state");
            ArrayList<String> param = new ArrayList<>();
            param.add(state.toString());
            param.add(challengeId);
            param.add(studentId);
            UpdateQueries.updateChallengePerson(param, DBConnection.getConnection());
        }
        return true;
    }
}
