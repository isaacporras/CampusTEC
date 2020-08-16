package DatabaseManagement.AddQuerys;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class AddQuerys {

    public static ResultSet createComment(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO comentaro( IdFile, IdActividad," +
                " Comentario, IdPersona, Fecha, Hora ) VALUES (?,?,?,?,?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setString(3, parameters.get(2));
        statement.setInt(4, Integer.parseInt(parameters.get(3)));
        statement.setString(5, parameters.get(4));
        statement.setString(6, parameters.get(5));
        return statement.executeQuery();
    }

    public static ResultSet createHomework(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO actividad( IdFile, NumSemana, TecColones, " +
                "Fecha, Descripcion, IdCurso) VALUES (?,?,?,?,?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        statement.setString(4, parameters.get(3));
        statement.setString(5, parameters.get(4));
        statement.setInt(6, Integer.parseInt(parameters.get(5)));
        return statement.executeQuery();
    }
    public static ResultSet createChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO retoacademico( Descripcion, Titulo," +
                " TecColones, IdCurso) VALUES (?,?,?,?);");
        statement.setString(1, parameters.get(3));
        statement.setString(2, parameters.get(4));
        statement.setInt(3, Integer.parseInt(parameters.get(1)));
        statement.setInt(4, Integer.parseInt(parameters.get(2)));
        return statement.executeQuery();
    }
    public static ResultSet createPerson_Challenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO retoacademico( Descripcion, Titulo," +
                " TecColones, IdCurso) VALUES (?,?,?,?);");
        statement.setString(1, parameters.get(3));
        statement.setString(2, parameters.get(4));
        statement.setInt(3, Integer.parseInt(parameters.get(1)));
        statement.setInt(4, Integer.parseInt(parameters.get(2)));
        return statement.executeQuery();
    }
}
