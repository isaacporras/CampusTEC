package DatabaseManagement.SelectQuerys;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetCourseInfo {

    public static ResultSet getCourseTeacher(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT persona.* FROM persona INNER JOIN cursopersona" +
                " ON persona.IdPersona = cursopersona.IdPersona  " +
                "WHERE persona.Puesto=TRUE AND cursopersona.IdCurso = ?");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getCourseStudents(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT persona.* FROM persona INNER JOIN cursopersona" +
                " ON persona.IdPersona = cursopersona.IdPersona  " +
                "WHERE persona.Puesto=FALSE AND cursopersona.IdCurso = ?");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getCourseObjectives(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT objetivo.* FROM objetivo INNER JOIN curso c " +
                "on objetivo.IdCurso = c.IdCurso WHERE c.IdCurso = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }
    public static ResultSet getCourseActivities(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT * FROM actividad LEFT JOIN actividadretoacademico" +
                " ON actividad.IdActividad = actividadretoacademico.IdActividad WHERE actividad.IdCurso = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

}
