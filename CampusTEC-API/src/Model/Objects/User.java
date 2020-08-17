package Model.Objects;

public class User {
    public String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getEmail1() {
        return email1;
    }

    public void setEmail1(String email1) {
        this.email1 = email1;
    }

    public String getEmail2() {
        return email2;
    }

    public void setEmail2(String email2) {
        this.email2 = email2;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getUniversidad() {
        return universidad;
    }

    public void setUniversidad(String universidad) {
        this.universidad = universidad;
    }

    public String getSede() {
        return sede;
    }

    public void setSede(String sede) {
        this.sede = sede;
    }

    public String rol;
    public String id;
    public String nombre;
    public String estado;
    public String email1;
    public String email2;
    public String telefono;
    public String universidad;
    public String sede;

    public User(String token, String rol, String id, String nombre, String estado, String email1,
                String email2, String telefono, String universidad, String sede) {

        this.token = token;
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

    public User() {

    }
}