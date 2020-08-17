package RequestHandler;

import Model.Objects.Activity;
import Model.Objects.Assignment;
import Model.Objects.Challenge;
import Model.Objects.Course;
import Model.Planner;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;

@Path("/planner")
public class PlannerHandler {

    @POST
    @Path("/assignments")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAssignments(JsonObject request) throws Exception {

        ArrayList<Assignment> assignments = Planner.getAssignments(request);

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Assignment assignment : assignments) {
            array.add(Json.createObjectBuilder().add("id", assignment.id)
                    .add("name", assignment.name)
                    .add("day", assignment.day)
                    .add("description", assignment.description)
                    .add("time", assignment.time)
                    .add("done", assignment.done)
                    .add("activity", assignment.activity));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();
        return Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @POST
    @Path("/challenges")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChallenges(JsonObject request) throws Exception {

        ArrayList<Course> courses = Planner.getChallenges(request);

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Course course : courses) {
            JsonArrayBuilder challengesArray = Json.createArrayBuilder();
            for (Challenge challenge : course.challenges) {
                JsonArrayBuilder activityArray = Json.createArrayBuilder();
                for (Activity activity : challenge.children) {
                    activityArray.add(Json.createObjectBuilder().add("id", activity.id)
                            .add("name", activity.name));
                }
                challengesArray.add(Json.createObjectBuilder().add("id", challenge.id)
                        .add("name", challenge.name)
                        .add("children", activityArray.build()));
            }
            array.add(Json.createObjectBuilder().add("name", course.name)
                    .add("children", challengesArray));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();
        return Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }


}
