package DatabaseManagement;

import RequestObjects.Credentials;
import RequestObjects.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;

public class QueryHandler {
    public static ResultSet executeQuery(ArrayList<String> parameters, int num_of_query) {
        switch (num_of_query) {
            case 0:
                return null;
            case 1:
                return null;
            case 2:
                return null;
            case 3:
                return null;
            case 4:
                return null;
            case 5:
                return null;
            case 6:
                return null;
            case 7:
                return null;
            case 8:
                return null;
            default:
                return null;
        }
    }

    public static User getUser(Credentials credentials) {
        User user = new User("Estudiante", "2017107550", "Oscar Porras", "Activo",
                "imanoisaac1.gmail.com", "imanoisaac23.gmail.com", "82837462", "XTEC", "Cartago");
        return user;
    }

}
