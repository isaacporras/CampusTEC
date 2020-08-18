package Model.Objects;

import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.ArrayList;

public class Activity {

    public String id = "";
    public String name = "";
    public String idClass = "";
    public String description = "";
    public Boolean evaluable = false;
    public Integer week = 1;
    public String date = "";
    public ArrayList<Objective> objectives = new ArrayList<>();
    public ArrayList<Comment> comments = new ArrayList<>();
    public String fileURL = "null";
    public Boolean newComents = false;


}
