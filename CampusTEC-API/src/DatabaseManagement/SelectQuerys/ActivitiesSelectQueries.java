package DatabaseManagement.SelectQuerys;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ActivitiesSelectQueries {

    public static ResultSet activitiesFromChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT L.IdActividad, l.IdFile, l.NumSemana," +
                " l.TecColones, l.Fecha, l.Descripcion, l.IdCurso " +
                "FROM " +
                "      (SELECT a.* " +
                "       FROM actividad a " +
                "                INNER JOIN actividadretoacademico a2 on a.IdActividad = a2.IdActividad " +
                "       WHERE ? = a2.IdRetoAcademico) " +
                "      l " +
                ";");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getHomeworkFromActivities(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT tarea.* FROM tarea INNER JOIN actividad a on " +
                "tarea.IdActividad = a.IdActividad WHERE a.IdActividad = ?; ");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getHomeworkFromPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT tarea.* FROM tarea INNER JOIN persona a on " +
                "tarea.IdPersona = a.IdPersona WHERE a.IdPersona = ?; ");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getHomeworkFromActivitiesAndPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT tarea.* FROM tarea INNER JOIN actividad a on " +
                "tarea.IdActividad = a.IdActividad WHERE a.IdActividad = ? AND tarea.IdPersona = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getActivitiesFromChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("    SELECT actividad.*  FROM actividad INNER JOIN" +
                " actividadretoacademico ar WHERE ar.IdRetoAcademico = ?\n;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }
}
