package DatabaseManagement;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static Connection connection = null;

    public static Boolean setConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/campustecdb?useSSL=false&serverTimezone=UTC", "root", "root");
        return false;
    }

    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        if (connection == null) {
            setConnection();
        }
        return connection;
    }

}
