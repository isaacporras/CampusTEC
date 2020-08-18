package RequestHandler;

import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;
import Model.ActivityView;
import Model.ChallengeView;
import Model.Objects.Comment;
import Model.Objects.User;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.ArrayList;

@Path("/comment")
public class CommentHandler {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public static Response newComment(Comment comment) throws SQLException, ClassNotFoundException {
        Integer result = ActivityView.newComment(comment);

        return Response.ok(result).build();
    }

    @GET
    @Path("/{activityId}")
    @Produces(MediaType.APPLICATION_JSON)
    public static Response getComments(@PathParam("activityId") String activityId) throws SQLException, ClassNotFoundException {
        ArrayList<Comment> comments = ActivityView.getComments(activityId);
        JsonArrayBuilder array = Json.createArrayBuilder();
        for (Comment comment : comments) {
            array.add(Json.createObjectBuilder().add("id", comment.id).add("description", comment.description)
                    .add("time", comment.time).add("date", comment.date).add("user", comment.user).add("activityId", comment.activityId)
                    .add("fileURL", comment.fileURL));
        }

        JsonObject root = Json.createObjectBuilder().add("treeview", array).build();

        return Response.ok(root).build();
    }


    @POST
    @Path("/getName")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public static Response getName(JsonObject userId) throws SQLException, ClassNotFoundException {
        String name = ActivityView.getName(userId.getString("id"));
        JsonObjectBuilder respBuilder = Json.createObjectBuilder();

        respBuilder.add("user", name);
        respBuilder.add("id", userId.getString("id"));
        JsonObject resp = respBuilder.build();

        return Response.ok(resp).build();
    }
}
