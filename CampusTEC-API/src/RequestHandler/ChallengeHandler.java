package RequestHandler;

import Model.ChallengeView;
import Model.Objects.Challenge;
import Model.Objects.Objective;
import Model.Objects.User;
import Model.Teacher;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.ArrayList;

@Path("/challenge")
public class ChallengeHandler {

    @GET
    @Path("/info/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChallengeInfo(@PathParam("challenge") String challengeId) throws SQLException, ClassNotFoundException {
        Challenge challenge = ChallengeView.getChallengeInfo(challengeId);

        return Response.ok(challenge).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/objectives/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getObjectives(@PathParam("challenge") String challenge) throws Exception {

        ArrayList<Objective> objectives = ChallengeView.getObjectives(challenge);

        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Objective objective : objectives) {
            array.add(Json.createObjectBuilder().add("id", objective.id).add("description", objective.description));
        }
        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();

        return Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

    @GET
    @Path("/students/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStudents(@PathParam("challenge") String challenge) throws SQLException, ClassNotFoundException {
        ArrayList<User> students = ChallengeView.getStudents(challenge);
        JsonArrayBuilder array = Json.createArrayBuilder();
        for (User user : students) {
            array.add(Json.createObjectBuilder().add("id", user.id).add("name", user.name)
                    .add("lastname", user.lastname).add("status", user.completed));
        }

        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();

        return Response.ok(root).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }


}

