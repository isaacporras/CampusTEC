package Model.Objects;

import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.ArrayList;

public class Activity {
    public String userToken;
    public String id;

    public String nombre;
    public String descripcion;
    public Bool evaluable;
    public Integer semana;
    public String fechaEntrega;
    public ArrayList<Objective> objetivos;
    public ArrayList<Comment> comentarios;
    public String linkArchivo;


}
