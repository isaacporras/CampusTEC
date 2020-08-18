package RequestHandler;

import Model.ActivityView;
import Model.Objects.Activity;
import Model.Objects.Comment;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;

@Path("/activities")
public class ActivityHandler {

    @GET
    @Path("/info/{activity}")
    @Produces(MediaType.APPLICATION_JSON)
    public static Response getActivityInfo(@PathParam("activity") String activityId) throws SQLException, ClassNotFoundException {
        Activity activity = ActivityView.getActivityInfo(activityId);
        return Response.ok(activity).build();
    }

}
