package RequestHandler;

import Model.ActivityView;
import Model.Objects.Activity;
import Model.Objects.Assignment;
import Model.Objects.Challenge;
import Model.Objects.Course;
import Model.Planner;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
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

    @GET
    @Path("/assignment/{assignment}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAssignment(@PathParam("assignment") String id) throws Exception {

        Assignment assignment = Planner.getAssignment(id);

        return Response.ok(assignment).header("Access-Control-Allow-Origin", "*")
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

    @POST
    @Path("/activities")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getActivities(JsonObject request) throws Exception {
        ArrayList<Course> courses = Planner.getActivities(request);

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Course course : courses) {
            JsonArrayBuilder activitiesArray = Json.createArrayBuilder();
            for (Activity activity : course.activities) {
                activitiesArray.add(Json.createObjectBuilder().add("id", activity.id)
                        .add("name", activity.name)
                        .add("newComments", activity.newComents).build());
            }
            array.add(Json.createObjectBuilder().add("name", course.name)
                    .add("children", activitiesArray));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();
        return Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @POST
    @Path("/newAssignment")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response newAssignment(Assignment assignment) throws Exception {

        Integer result = Planner.newAssignment(assignment);
        JsonObjectBuilder respBuilder = Json.createObjectBuilder();

        respBuilder.add("status", result);
        JsonObject resp = respBuilder.build();
        return Response.ok(resp).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/activities/{activity}}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getActivity(@PathParam("activity") String activity) throws Exception {

        Activity result = ActivityView.getActivityInfo(activity);

        return Response.ok(result).build();
    }

    @GET
    @Path("/challenge/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChallenge(@PathParam("challenge") String challenge) throws Exception {

        Challenge result = Planner.getChallenge(challenge);

        return Response.ok(result).build();
    }


    @POST
    @Path("/activities/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getWeekly(JsonObject obj) throws Exception {

        ArrayList<Activity> result = ActivityView.getWeekly(obj);

        return Response.ok(result).build();
    }
}
