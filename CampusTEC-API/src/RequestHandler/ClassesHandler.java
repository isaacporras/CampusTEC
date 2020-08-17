package RequestHandler;

import Model.Objects.*;
import Model.Profile;
import Model.Teacher;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.ResultSet;
import java.util.ArrayList;

@Path("/classes")
public class ClassesHandler {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClasses(JsonObject token) throws Exception {
        ArrayList<Course> courses = Teacher.getClasses(token.getString("token"));

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Course course : courses) {
            array.add(Json.createObjectBuilder().add("id", course.id).add("name", course.name).add("group", course.group));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();

        return Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/activities/{class}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getActivities(@PathParam("class") String course) throws Exception {
        System.out.println(course);
        ArrayList<Activity> activities = Teacher.getActivities(course);

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Activity activity : activities) {
            array.add(Json.createObjectBuilder().add("id", activity.id).add("name", activity.name));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();

        return Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/objectives/{class}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getObjectives(@PathParam("class") String course) throws Exception {

        ArrayList<Objective> objectives = Teacher.getObjectives(course);

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Objective objective : objectives) {
            array.add(Json.createObjectBuilder().add("id", objective.id).add("description", objective.description));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();

        Response rsp = Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
        System.out.println(rsp.getEntity().toString());
        return rsp;
    }

    @GET
    @Path("/challenges/{class}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getActivitiesAndChallenges(@PathParam("class") String course) throws Exception {
        ArrayList<Challenge> challenges = Teacher.getActivitiesAndChallenges(course);

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Challenge challenge : challenges) {
            JsonArrayBuilder activityArray = Json.createArrayBuilder();
            for (Activity activity : challenge.children) {
                activityArray.add(Json.createObjectBuilder().add("id", activity.id).add("name", activity.name));
            }
            array.add(Json.createObjectBuilder().add("id", challenge.id).add("name", challenge.name).add("children", activityArray.build()));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();
        System.out.println(root.toString());
        return Response.ok(root.toString()).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/info/{class}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInfo(@PathParam("class") String id) throws Exception {
        Course course = Teacher.getCourse(id);

        return Response.ok(course).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }


}
