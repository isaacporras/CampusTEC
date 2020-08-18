package RequestHandler;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import Model.Objects.User;
import RequestObjects.Credentials;


import static Model.Profile.login;


@Path("/login")
public class LoginHandler {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticate(Credentials credentials) throws Exception {
        User user = login(credentials);
        JsonObjectBuilder respBuilder = Json.createObjectBuilder();

        if (user == null) {
            respBuilder.add("status", 0);
        } else {
            respBuilder.add("status", 1);
            respBuilder.add("token", user.token);
            respBuilder.add("role", user.role);
        }
        JsonObject resp = respBuilder.build();
        return Response.ok(resp).build();
    }

}
