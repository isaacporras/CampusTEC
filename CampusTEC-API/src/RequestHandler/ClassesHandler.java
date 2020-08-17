package RequestHandler;

import Model.Objects.Activity;
import Model.Objects.Course;
import Model.Objects.Objective;
import Model.Objects.User;
import Model.Profile;
import Model.Teacher;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;

@Path("/classes")
public class ClassesHandler {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClasses(JsonObject token) throws Exception {
        ArrayList<Course> course = Teacher.getClasses(token.getString("token"));
        return Response.ok(course).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/activities/{class}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getActivities(@PathParam("class") String course) throws Exception {
        System.out.println(course);
        ArrayList<Activity> activities =  Teacher.getActivities(course);

        return Response.ok(activities).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/objectives/{class}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getObjectives(@PathParam("class") String course) throws Exception {
        System.out.println(course);
        ArrayList<Objective> objectives =  Teacher.getObjectives(course);

        return Response.ok(objectives).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

}
