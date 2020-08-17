package DatabaseManagement.RemoveQueries;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class RemoveQueries {

    public static ResultSet updateHomework(ArrayList<String> parameters, Connection con) throws SQLException {
        PreparedStatement statement = con.prepareStatement("DELETE FROM file WHERE FileURL = ?;");
        statement.setString(1, parameters.get(1));
        statement.execute();
        return null;
    }
}
