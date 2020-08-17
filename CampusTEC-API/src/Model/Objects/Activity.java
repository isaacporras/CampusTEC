package Model.Objects;

import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.ArrayList;

public class Activity {
    public String userToken;
    public String id;

    public String name;
    public String description;
    public Bool gradable;
    public Integer week;
    public String date;
    public ArrayList<Objective> objectives;
    public ArrayList<Comment> comments;
    public String fileLink;


}
