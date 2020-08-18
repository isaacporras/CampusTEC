package Model;

import DatabaseManagement.AddQuerys.AddQueries;
import DatabaseManagement.DBConnection;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import Model.Objects.Activity;
import Model.Objects.Comment;
import Model.Objects.Objective;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ActivityView {


    public static Integer newComment(Comment comment) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        String fileId = "1";
        if (!comment.fileURL.equals("null")) {
            ArrayList<String> paramFile = new ArrayList<>();
            paramFile.add(comment.fileURL);
            paramFile.add("archivo adjunto");
            AddQueries.createFile(paramFile, DBConnection.getConnection());
            paramFile = new ArrayList<>();
            paramFile.add(comment.fileURL);
            ResultSet result = ActivitiesSelectQueries.getFileFromURL(paramFile, DBConnection.getConnection());
            result.next();
            fileId = result.getString("IdFile");
        }
        param.add(fileId);
        param.add(comment.activityId);
        param.add(comment.description);
        param.add(comment.token);
        param.add(comment.date);
        param.add(comment.time);
        ResultSet resultSet = AddQueries.createComment(param, DBConnection.getConnection());
        resultSet.next();

        return resultSet.getInt(1);
    }

    public static ArrayList<Comment> getComments(String activityId) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(activityId);
        ResultSet resultSet = ActivitiesSelectQueries.getCommentsActivity(param, DBConnection.getConnection());
        ArrayList<Comment> comments = new ArrayList<>();
        while (resultSet.next()) {
            Comment comment = new Comment();
            comment.fileURL = resultSet.getString("FileURL");
            comment.activityId = resultSet.getString("IdActividad");
            comment.date = resultSet.getString("Fecha");
            comment.description = resultSet.getString("Comentario");
            comment.time = resultSet.getString("Hora");
            comment.id = resultSet.getString("IdComentairo");
            comment.user = resultSet.getString("Nombre") + " " + resultSet.getString("Apellido");
            comments.add(comment);
        }
        return comments;
    }


    public static Activity getActivityInfo(String ActivityId) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(ActivityId);
        ResultSet resultSet = ActivitiesSelectQueries.getActivityInfo(param, DBConnection.getConnection());
        resultSet.next();
        Activity activity = new Activity();
        activity.id = resultSet.getString("IdActividad");
        activity.name = resultSet.getString("Titulo");
        activity.description = resultSet.getString("Descripcion");
        activity.evaluable = resultSet.getBoolean("Evaluable");
        activity.week = resultSet.getInt("NumSemana");
        activity.date = resultSet.getString("Fecha");
        param = new ArrayList<>();
        param.add(activity.id);
        ResultSet resultObj = ActivitiesSelectQueries.getObjectivesActivity(param, DBConnection.getConnection());
        while (resultObj.next()) {
            Objective objective = new Objective();
            objective.id = resultObj.getString("IdObjetivo");
            objective.description = resultObj.getString("Descripcion");
            activity.objectives.add(objective);
        }
        return activity;
    }
}
