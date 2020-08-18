package RequestHandler;

import DatabaseManagement.DBConnection;
import DatabaseManagement.SelectQuerys.GetCourseInfo;
import Model.Objects.*;
import Model.Profile;
import Model.Teacher;
import Model.TwitterPublisher;
import twitter4j.TwitterException;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.ResultSet;
import java.sql.SQLException;
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
    public Response getInfo(@PathParam("class") String id) {
        Course course = Teacher.getCourse(id);

        return Response.ok(course).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @POST
    @Path("/objectives/new")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response newObjective(Objective obj) {
        Integer result = Teacher.newObjective(obj);

        JsonObjectBuilder respBuilder = Json.createObjectBuilder();

        respBuilder.add("status", result);
        JsonObject resp = respBuilder.build();

        return Response.ok(resp).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @POST
    @Path("/activities/new")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response newActivity(Activity activity) {

        Integer result = Teacher.newActivity(activity);

        JsonObjectBuilder respBuilder = Json.createObjectBuilder();

        respBuilder.add("status", result);
        JsonObject resp = respBuilder.build();

        return Response.ok(resp).build();
    }

    @POST
    @Path("/challenges/new")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response newChallenge(Challenge challenge) throws SQLException, ClassNotFoundException, TwitterException {

        Integer result = Teacher.newChallenge(challenge);

        JsonObjectBuilder respBuilder = Json.createObjectBuilder();

        respBuilder.add("status", result);
        JsonObject resp = respBuilder.build();
        ArrayList<String> param = new ArrayList<>();
        param.add(challenge.idClass);
        ResultSet resultCourse = GetCourseInfo.getInfo(param, DBConnection.getConnection());
        String nombre = resultCourse.getString("Nombre");
        TwitterPublisher.updateTweet(TwitterPublisher.getTwitterInstance(), "Nuevo Reto:\n" + challenge.name + " Creado en el curso " + nombre + ", por " + challenge.payment + " TEColones.");

        return Response.ok(resp).build();
    }


}
