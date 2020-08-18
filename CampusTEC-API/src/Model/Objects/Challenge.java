package Model.Objects;

import java.util.ArrayList;

public class Challenge {

    public String id="";
    public String name = "";
    public Course course = new Course();
    public String fileURL = "";
    public String idClass = "";
    public String payment = "";
    public String date = "";
    public String description = "";
    public ArrayList<Activity> activities = new ArrayList<>();
    public ArrayList<Objective> objectives = new ArrayList<>();

    public ArrayList<Activity> children = new ArrayList<>();
}
