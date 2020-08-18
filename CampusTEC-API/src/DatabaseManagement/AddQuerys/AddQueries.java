package DatabaseManagement.AddQuerys;

import java.sql.Statement;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class AddQueries {

    public static ResultSet createComment(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO comentario( IdFile, IdActividad," +
                " Comentario, IdPersona, Fecha, Hora ) VALUES (?,?,?,?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setString(3, parameters.get(2));
        statement.setInt(4, Integer.parseInt(parameters.get(3)));
        statement.setString(5, parameters.get(4));
        statement.setString(6, parameters.get(5));

        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createActivity(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO actividad( IdFile, NumSemana, TecColones, " +
                "Fecha, Descripcion, IdCurso,Titulo) VALUES (?,?,?,?,?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        statement.setString(4, parameters.get(3));
        statement.setString(5, parameters.get(4));
        statement.setInt(6, Integer.parseInt(parameters.get(5)));
        statement.setString(7, parameters.get(6));

        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO retoacademico( Descripcion, Titulo," +
                " TecColones, IdCurso,IdFile,Fecha) VALUES (?,?,?,?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setString(1, parameters.get(0));
        statement.setString(2, parameters.get(1));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        statement.setInt(4, Integer.parseInt(parameters.get(3)));
        statement.setInt(5, Integer.parseInt(parameters.get(4)));

        statement.setString(6, parameters.get(5));

        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createPersonChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO retoacademicopersona(IdRetoAcademico, " +
                "IdPersona, Completado) VALUES (?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setBoolean(3, Boolean.parseBoolean(parameters.get(2)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createPersonActivity(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO actividadpersona(IdActividad," +
                " IdPersona, Completado) VALUES (?,?,?)", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setBoolean(3, Boolean.parseBoolean(parameters.get(2)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createPsicoChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO retopsicologico( TecColones, " +
                "Titulo) VALUES (?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setString(2, parameters.get(1));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createPiscoQuestion(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO preguntapsico( idretopsicologico," +
                " pregunta) VALUES (?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setString(2, parameters.get(1));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createPiscoAnswer(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO  respuesta(idpreguntapsico," +
                " respuesta) VALUES (?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setString(2, parameters.get(1));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createObjective(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO objetivo(descripcion," +
                " idcurso) VALUES (?,?)", Statement.RETURN_GENERATED_KEYS);
        statement.setString(1, parameters.get(1));
        statement.setInt(2, Integer.parseInt(parameters.get(0)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createHomework(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO tarea(idpersona, idactividad, " +
                "titulo, semana, numdia, descripcion, hora) VALUES (?,?,?,?,?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setString(3, parameters.get(2));
        statement.setInt(4, Integer.parseInt(parameters.get(3)));
        statement.setInt(5, Integer.parseInt(parameters.get(4)));
        statement.setString(6, parameters.get(5));
        statement.setInt(7, Integer.parseInt(parameters.get(6)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createAnswerQuestion(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" INSERT INTO respuestapregunta(idresultado, " +
                "idpreguntapsico, idrespuesta) VALUES (?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createResult(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO resultado( idretopsicologico)" +
                " VALUES (?);" +
                "SELECT LAST_INSERT_ID();", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createResultPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO resultadopersona(idpersona, " +
                "idresultado) VALUES (?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createFile(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO file(fileurl, filename, valid) " +
                "VALUES (?,?,TRUE)", Statement.RETURN_GENERATED_KEYS);
        statement.setString(1, parameters.get(0));
        statement.setString(2, parameters.get(1));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createActivityObjective(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("    INSERT INTO actividadobjetivo(IdActividad," +
                " IdObjetivo) VALUES (?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet activityChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO actividadretoacademico(IDRETOACADEMICO, " +
                "IDACTIVIDAD) VALUES (?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet createChallengeObjective(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO objetivoreto(IDRETO, " +
                "IDOBJETIVO) VALUES (?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet setActivityPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO actividadpersona(IDACTIVIDAD, " +
                "IDPERSONA,COMPLETADO) VALUES (?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setBoolean(3, Boolean.parseBoolean(parameters.get(2)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }

    public static ResultSet setChallengePerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("INSERT INTO personareto(IDRETOACADEMICO, " +
                "IDPERSONA,COMPLETADO) VALUES (?,?,?);", Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setBoolean(3, Boolean.parseBoolean(parameters.get(2)));
        long lastInsertedID = statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        return rs;
    }
}