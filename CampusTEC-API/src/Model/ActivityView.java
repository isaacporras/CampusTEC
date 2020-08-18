package Model;

import DatabaseManagement.AddQuerys.AddQueries;
import DatabaseManagement.DBConnection;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import Model.Objects.Comment;

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

}
