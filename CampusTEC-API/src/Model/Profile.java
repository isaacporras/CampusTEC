package Model;

import Model.Objects.User;
import RequestObjects.Credentials;

public class Profile {

    public static User getUser(String token) {
        User user = new User("token", "Estudiante", "2017107550", "Oscar Porras", "Activo",
                "imanoisaac1.gmail.com", "imanoisaac23.gmail.com", "82837462", "XTEC", "Cartago");
        return user;
    }

    public static User login(Credentials credentials) {
        User user = new User();
        user.token = "ljasdkhfas";
        user.rol = "estudiante";
        return user;

//        ArrayList list = new ArrayList<String>();
//        list.add(credentials.id);
//        list.add(credentials.password);
//        User user = null;
//        try {
//            ResultSet result = ProfileSelectQueries.getLoginInfo(list, null);
//            if (result.next()) {
////                user =
//            } else {
//
//            }
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//
//        return user;

    }
}
