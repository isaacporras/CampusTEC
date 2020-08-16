package DatabaseManagement.ModifyQueries;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class UpdateQueries {


    public static ResultSet updatePersonProfile(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("     UPDATE persona  SET  " +
                "    Nombre      =?,  " +
                "    Apellido    =?,  " +
                "    NumTelefono =?,  " +
                "    Email1      =?,  " +
                "    Email2      =?,  " +
                "    PpUrl       =?  " +
                "    WHERE  IdPersona=?;");
        statement.setString(1, parameters.get(0));
        statement.setString(2, parameters.get(1));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        statement.setString(4, parameters.get(3));
        statement.setString(5, parameters.get(4));
        statement.setString(6, parameters.get(5));
        statement.setInt(7, Integer.parseInt(parameters.get(6)));

        return statement.executeQuery();
    }

    public static ResultSet updateActivityPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("     UPDATE persona  SET  " +
                "    Nombre      =?,  " +
                "    Apellido    =?,  " +
                "    NumTelefono =?,  " +
                "    Email1      =?,  " +
                "    Email2      =?,  " +
                "    PpUrl       =?  " +
                "    WHERE  IdPersona=?;");
        statement.setString(1, parameters.get(0));
        statement.setString(2, parameters.get(1));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        statement.setString(4, parameters.get(3));
        statement.setString(5, parameters.get(4));
        statement.setString(6, parameters.get(5));
        statement.setInt(7, Integer.parseInt(parameters.get(6)));

        return statement.executeQuery();
    }
}
