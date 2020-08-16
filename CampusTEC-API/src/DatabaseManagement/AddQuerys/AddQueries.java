package DatabaseManagement.AddQuerys;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class AddQueries {

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

    public static ResultSet createActivity(ArrayList<String> parameters, Connection con) throws SQLException {
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

    public static ResultSet createPersonChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO retoacademicopersona(IdRetoAcademico, " +
                "IdPersona, Completado) VALUES (?,?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setBoolean(3, Boolean.parseBoolean(parameters.get(2)));
        return statement.executeQuery();
    }

    public static ResultSet createPersonActivity(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO actividadpersona(IdActividad," +
                " IdPersona, Completado) VALUES (?,?,?)");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setBoolean(3, Boolean.parseBoolean(parameters.get(2)));
        return statement.executeQuery();
    }

    public static ResultSet createPsicoChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO retopsicologico( TecColones, " +
                "Titulo) VALUES (?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setString(2, parameters.get(1));
        return statement.executeQuery();
    }

    public static ResultSet createPiscoQuestion(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO preguntapsico( idretopsicologico," +
                " pregunta) VALUES (?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setString(2, parameters.get(1));
        return statement.executeQuery();
    }

    public static ResultSet createPiscoAnswer(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO  respuesta(idpreguntapsico," +
                " respuesta) VALUES (?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setString(2, parameters.get(1));
        return statement.executeQuery();
    }

    public static ResultSet createObjective(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO objetivo(descripcion," +
                " idcurso) VALUES (?,?)");
        statement.setString(1, parameters.get(1));
        statement.setInt(2, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }
    public static ResultSet createHomework(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO tarea(idpersona, idactividad, titulo," +
                " descripcion, hora) VALUES (?,?,?,?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setString(3, parameters.get(2));
        statement.setString(4, parameters.get(3));
        statement.setString(5, parameters.get(4));
        return statement.executeQuery();
    }

    public static ResultSet CreateRespuestaPregunta(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO respuestapregunta(idresultado, " +
                "idpreguntapsico, idrespuesta) VALUES (?,?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        return statement.executeQuery();
    }
    public static ResultSet CreateResult(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO resultado( idretopsicologico)" +
                " VALUES (?);" +
                "SELECT LAST_INSERT_ID();");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }



    public static ResultSet CreateResultadoPersona(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO resultadopersona(idpersona, " +
                "idresultado) VALUES (?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        return statement.executeQuery();
    }

    public static ResultSet CreateResultadoPersona(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO resultadopersona(idpersona, " +
                "idresultado) VALUES (?,?);");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        return statement.executeQuery();
    }



}
