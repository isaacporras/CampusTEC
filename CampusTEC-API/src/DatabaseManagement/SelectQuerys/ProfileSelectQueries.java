package DatabaseManagement.SelectQuerys;

import java.sql.*;

import java.util.ArrayList;

public class ProfileSelectQueries {
    public ResultSet getCourses(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT cur.IdCurso,cur.Nombre\n" +
                "FROM curso AS cur\n" +
                "         INNER JOIN (\n" +
                "             SELECT * FROM cursopersona AS p WHERE p.IdPersona = ? \n" +
                "             ) AS c on cur.IdCurso = c.IdCurso;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }

    public ResultSet getLoginInfo(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT * FROM logininfo c WHERE c.Carne=? AND c.Pin = ? ");
        statement.setString(1, parameters.get(0));
        statement.setString(2, parameters.get(1));
        return statement.executeQuery();
    }

    public ResultSet getProfileInfo(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("SELECT * FROM persona WHERE persona.IdPersona = ?;");
        statement.setInt(1, Integer.parseInt(parameters.get(0)));
        return statement.executeQuery();
    }


}
