package DatabaseManagement.SelectQuerys;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ActivitiesSelectQueries {

    public static ResultSet activitiesFromChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT L.IdActividad, l.IdFile, l.NumSemana," +
                " l.TecColones, l.Fecha, l.Descripcionm,l.Titulo, l.IdCurso " +
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
        PreparedStatement statement = con.prepareStatement("SELECT Z.* , actividad.Titulo  " +
                "FROM (  " +
                "         SELECT tarea.*  " +
                "         FROM tarea  " +
                "                  INNER JOIN persona a on tarea.IdPersona = a.IdPersona  " +
                "         WHERE a.IdPersona = ?) Z INNER JOIN actividad ON Z.IdActividad= actividad.IdActividad;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getActivitiesFromChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("    SELECT actividad.*  FROM actividad INNER JOIN actividadretoacademico ar ON Actividad.IdActividad = ar.IdActividad WHERE ar.IdRetoAcademico = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getActivitiesByPersonAndWeek(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" SELECT F.*,curso.Nombre FROM curso INNER JOIN ( " +
                "    SELECT Z.* " +
                "FROM (SELECT actividadpersona.IdActividad " +
                "      FROM persona " +
                "               INNER JOIN actividadpersona ON persona.IdPersona = actividadpersona.IdPersona " +
                "      AND persona.IdPersona = ?) A " +
                "         INNER JOIN ( " +
                "    SELECT actividad.* " +
                "    FROM actividad " +
                "    WHERE actividad.IdActividad NOT IN ( " +
                "        SELECT actividad.IdActividad " +
                "        FROM actividad " +
                "                 INNER JOIN actividadretoacademico a on actividad.IdActividad = a.IdActividad) " +
                ") Z " +
                "                    ON A.IdActividad = Z.IdActividad WHERE Z.NumSemana = ? " +
                "    ) F ON F.IdCurso = curso.IdCurso;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));

        return statement.executeQuery();
    }

    public static ResultSet getFileFromURL(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" SELECT * FROM file WHERE FileURL=?;");
        statement.setString(1, parameters.get(0));
        return statement.executeQuery();
    }

    public static ResultSet getHomeworkFromID(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT tarea.*, a.Titulo FROM tarea INNER JOIN actividad a on " +
                "tarea.IdActividad = a.IdActividad WHERE tarea.IdTarea = ?; ");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getChallengePeople(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT  * FROM personareto INNER JOIN persona" +
                " p on personareto.IdPersona = p.IdPersona WHERE personareto.IdRetoAcademico = ?; ");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getObjectivesChallenge(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT objetivo.* FROM objetivo INNER join objetivoreto" +
                " o on objetivo.IdObjetivo = o.IdObjetivo where o.IdReto = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getObjectivesActivity(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT objetivo.* FROM objetivo INNER  JOIN " +
                "actividadobjetivo a on objetivo.IdObjetivo = a.IdObjetivo WHERE A.IdActividad=?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getChallengeInfo(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(" SELECT ra.*, f.FileURL FROM retoacademico ra INNER JOIN file f on ra.IdFile = f.IdFile WHERE ra.IdRetoAcademico=?;");
        statement.setString(1, parameters.get(0));
        return statement.executeQuery();
    }


    public static ResultSet getCommentsActivity(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT persona.Nombre,persona.Apellido,A.*  " +
                "FROM (  " +
                "         SELECT A.*, F.FileURL  " +
                "         FROM (  " +
                "                  SELECT comentario.*  " +
                "                  FROM comentario  " +
                "                           INNER JOIN  " +
                "                       actividad a on comentario.IdActividad = a.IdActividad  " +
                "                  WHERE a.IdActividad = ?) A  " +
                "                  INNER JOIN file F ON A.IdFile = F.IdFile) A  " +
                "         INNER JOIN persona ON persona.IdPersona = A.Idpersona;");
        statement.setString(1, parameters.get(0));
        return statement.executeQuery();
    }
}
