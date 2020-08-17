package Model.Objects;

import java.util.ArrayList;

public class Challenge {

    public String id="";
    public String name = "";
    public Course course = new Course();
    public ArrayList<Activity> children = new ArrayList<>();
}
