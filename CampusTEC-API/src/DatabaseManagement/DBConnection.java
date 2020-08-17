package DatabaseManagement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static Connection connection;

    public static Boolean setConnection() throws SQLException {
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306?"
                + "user=root&password=root");
        return false;
    }

    public static Connection getConnection() throws SQLException {
        setConnection();
        return connection;
    }
}
