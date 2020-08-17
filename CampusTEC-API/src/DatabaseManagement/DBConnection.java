package DatabaseManagement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static Connection connection;

    public static Boolean setConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/CampusTecDB?characterEncoding=utf8", "root", "root");
        return false;
    }

    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        setConnection();
        return connection;
    }

    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        setConnection();
    }
}
