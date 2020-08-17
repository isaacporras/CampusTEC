package Model;

import DatabaseManagement.DBConnection;
import DatabaseManagement.ModifyQueries.UpdateQueries;
import DatabaseManagement.SelectQuerys.ProfileSelectQueries;
import Model.Objects.Course;
import Model.Objects.User;
import RequestObjects.Credentials;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Profile {

    public static User getUser(String token) {
        User user = new User();
        ArrayList<String> param = new ArrayList<>();
        param.add(token);
        try {
            ResultSet resultUser = ProfileSelectQueries.getProfileInfoTotal(param, DBConnection.getConnection());

            if (resultUser.next()) {

                user.token = resultUser.getString("IdPersona");
                user.nombre = resultUser.getString("Nombre");
                user.apellido = resultUser.getString("Apellido");
                user.estado = resultUser.getString("Activo");
                user.telefono = resultUser.getString("NumTelefono");
                user.email1 = resultUser.getString("Email1");
                user.email2 = resultUser.getString("Email2");
                user.universidad = resultUser.getString("Universidadnombre");
                user.sede = resultUser.getString("sedeNombre");
                user.ppurl = resultUser.getString("PpUrl");

            }
            ArrayList<String> paramTecolones = new ArrayList<>();
            paramTecolones.add(user.token);
            ResultSet resultTecolones = ProfileSelectQueries.getTecColonesInfo(paramTecolones, DBConnection.getConnection());
            if (resultTecolones.next()) {
                user.tecolones = resultTecolones.getInt("TecColones");
            } else {
                user.tecolones = 0;
            }

            ArrayList<String> paramCursos = new ArrayList<>();
            paramCursos.add(user.token);
            ResultSet resultCursos = ProfileSelectQueries.getCourses(paramCursos, DBConnection.getConnection());
            while (resultCursos.next()) {
                Course course = new Course();
                course.id = resultCursos.getString("IdCurso");
                course.nombre = resultCursos.getString("Nombre");
                user.courses.add(course);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return user;
    }

    public static Boolean editUser(User user) {
        ArrayList<String> param = new ArrayList<>();
        param.add(user.nombre);
        param.add(user.apellido);
        param.add(user.telefono);
        param.add(user.email1);
        param.add(user.email2);
        param.add(user.ppurl);
        param.add(user.token);
        try {
            ResultSet resultEdit = UpdateQueries.updatePersonProfile(param, DBConnection.getConnection());

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return true;
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
                } else {
                    user.rol = "estudiante";
                }
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return user;
    }
}
