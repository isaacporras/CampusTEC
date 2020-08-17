package Model;

import DatabaseManagement.DBConnection;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import Model.Objects.Assignment;

import javax.json.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Planner {

    public static ArrayList<Assignment> getAssignments(JsonObject req) throws SQLException, ClassNotFoundException {
        ArrayList<String> param = new ArrayList<>();
        param.add(req.getString("tokenUsuario"));
        ResultSet result = ActivitiesSelectQueries.getHomeworkFromPerson(param, DBConnection.getConnection());
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
            assignment.activity = result.getString("NombreActividad");

            assignments.add(assignment);
        }
        return assignments;
    }

}
