package DatabaseManagement;

import DatabaseManagement.SelectQuerys.ProfileSelectQueries;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import static DatabaseManagement.SelectQuerys.ProfileSelectQueries.getLoginInfo;

public class DBConnection {
    private static Connection connection;

    public static Boolean setConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/campustecdb?useSSL=false", "root", "root");
        return false;
    }

    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        setConnection();
        return connection;
    }

}
