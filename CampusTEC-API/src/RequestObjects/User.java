package RequestObjects;

public class User {
    public String rol;
    public String id;
    public String nombre;
    public String estado;
    public String email1;
    public String email2;
    public String telefono;
    public String universidad;
    public String sede;

    public User(String rol, String id, String nombre, String estado, String email1,
                String email2, String telefono, String universidad, String sede) {

        this.rol = rol;
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.email1 = email1;
        this.email2 = email2;
        this.telefono = telefono;
        this.universidad = universidad;
        this.sede = sede;


    }


}
