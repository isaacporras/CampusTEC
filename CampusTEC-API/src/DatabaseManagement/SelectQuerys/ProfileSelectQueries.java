package DatabaseManagement.SelectQuerys;

import java.sql.*;

import java.util.ArrayList;

public class ProfileSelectQueries {
    public static ResultSet getCourses(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT cur.IdCurso,cur.Nombre  " +
                "FROM curso AS cur  " +
                "         INNER JOIN (  " +
                "             SELECT * FROM cursopersona AS p WHERE p.IdPersona = ?   " +

                "             ) AS c on cur.IdCurso = c.IdCurso;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getLoginInfo(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT * FROM logininfo c WHERE c.Carne=? AND c.Pin = ? ");
        statement.setString(1, parameters.get(0));
        statement.setString(2, parameters.get(1));
        return statement.executeQuery();
    }

    public static ResultSet getProfileInfo(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT * FROM persona WHERE persona.IdPersona = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getProfileInfoTotal(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT X.*,logininfo.Carne " +
                "FROM (SELECT X.IdPersona, " +
                "             X.Nombre, " +
                "             X.Apellido, " +
                "             X.Activo, " +
                "             X.NumTelefono, " +
                "             X.Email1, " +
                "             X.Email2, " +
                "             X.PpUrl, " +
                "             X.Puesto, " +
                "             X.universidadNombre, " +
                "             sede.Nombre AS sedeNombre " +
                "      FROM (SELECT A.*, sedepersona.IdSede " +
                "            FROM ( " +
                "                     SELECT A.idpersona, " +
                "                            A.nombre, " +
                "                            A.apellido, " +
                "                            A.activo, " +
                "                            A.numtelefono, " +
                "                            A.email1, " +
                "                            A.email2, " +
                "                            A.ppurl, " +
                "                            A.puesto, " +
                "                            universidad.Nombre AS universidadNombre " +
                "                     FROM ( " +
                "                              SELECT persona.*, universidadpersona.IdUniversidad " +
                "                              FROM persona " +
                "                                       INNER JOIN universidadpersona ON persona.IdPersona = universidadpersona.IdPersona " +
                "                              WHERE persona.IdPersona = ? " +
                "                          ) A " +
                "                              INNER JOIN universidad ON A.IdUniversidad = universidad.IdUniversidad " +
                "                 ) A " +
                "                     INNER JOIN sedepersona ON A.IdPersona = sedepersona.IdPersona " +
                "            WHERE sedepersona.IdPersona = ?) X " +
                "               INNER JOIN sede ON X.IdSede = sede.IdSede) X " +
                "         INNER JOIN logininfo on logininfo.IdPersona = x.IdPersona");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getTecColonesInfo(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT * FROM cuenta where cuenta.IdPersona = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getUniversityFromPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT s.*  " +
                "FROM universidadpersona  " +
                "         INNER JOIN universidad s on universidadpersona.IdUniversidad = s.IdUniversidad  " +
                "WHERE universidadpersona.IdPersona = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public static ResultSet getCampusFromPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT s.*  " +
                "SELECT s.*  " +
                "FROM universidadpersona  " +
                "         INNER JOIN universidad s on universidadpersona.IdUniversidad = s.IdUniversidad  " +
                "WHERE universidadpersona.IdPersona = ?;;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

}
