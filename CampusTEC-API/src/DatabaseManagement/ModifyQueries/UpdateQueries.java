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
        statement.executeUpdate();
        return null;
    }

    public static ResultSet updateActivityPerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement(
                "UPDATE actividadpersona SET" +
                "Completado = ? WHERE IdActividad = ? AND IdPersona=?;");
        statement.setBoolean(1, Boolean.parseBoolean(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        statement.executeUpdate();
        return null;
    }
    public static ResultSet updateChallengePerson(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("UPDATE personareto SET" +
                "Completado = ? WHERE IdRetoAcademico = ? AND IdPersona=?;");
        statement.setBoolean(1, Boolean.parseBoolean(parameters.get(0)));
        statement.setInt(2, Integer.parseInt(parameters.get(1)));
        statement.setInt(3, Integer.parseInt(parameters.get(2)));
        statement.executeUpdate();
        return null;
    }

    public static ResultSet updateHomework(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("UPDATE tarea SET  " +
                "Hora = ?, semana = ?, NumDia = ? " +
                "WHERE tarea.IdTarea =?;");
        statement.setInt(1, Integer.parseInt(parameters.get(1)));
        statement.setInt(2, Integer.parseInt(parameters.get(2)));
        statement.setInt(3, Integer.parseInt(parameters.get(3)));
        statement.setInt(4, Integer.parseInt(parameters.get(4)));
        statement.executeUpdate();
        return null;
    }

    
}
