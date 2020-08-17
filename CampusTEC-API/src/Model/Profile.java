package Model;

import DatabaseManagement.DBConnection;
import DatabaseManagement.SelectQuerys.ProfileSelectQueries;
import Model.Objects.User;
import RequestObjects.Credentials;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Profile {

    public static User getUser(String token) {
        User user = new User("token", "Estudiante", "2017107550", "Oscar Porras", "Activo",
                "imanoisaac1.gmail.com", "imanoisaac23.gmail.com", "82837462", "XTEC", "Cartago");
        return user;
    }

    public static User login(Credentials credentials) {
        ArrayList<String> list = new ArrayList<>();
        list.add(credentials.id);
        list.add(credentials.password);
        User user = null;
        try {
            ResultSet result = ProfileSelectQueries.getLoginInfo(list, DBConnection.getConnection());
            if (result.next()) {
                user = new User();
                user.token = result.getString("IdPersona");
                ArrayList<String> param = new ArrayList<>();
                param.add(user.token);
                ResultSet resultUser = ProfileSelectQueries.getProfileInfo(param, DBConnection.getConnection());
                resultUser.next();
                if (result.getBoolean("type")) {
                    user.rol = "administrador";
                } else if (resultUser.getBoolean("Puesto")) {
                    user.rol = "profesor";
                }else{
                    user.rol = "estudiante";
                }
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return user;

    }
}
