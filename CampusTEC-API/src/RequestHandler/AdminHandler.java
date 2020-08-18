package RequestHandler;

import DatabaseManagement.DBConnection;
import DatabaseManagement.ModifyQueries.UpdateQueries;
import DatabaseManagement.SelectQuerys.ActivitiesSelectQueries;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Path("/admin")
public class AdminHandler {
    @GET
    @Path("/tecolones")
    @Produces(MediaType.APPLICATION_JSON)
    public static Response getTecolones() throws SQLException, ClassNotFoundException {
        ResultSet resultSet = ActivitiesSelectQueries.getPresupuesto(DBConnection.getConnection());
        resultSet.next();

        JsonObjectBuilder respBuilder = Json.createObjectBuilder();

        respBuilder.add("max", resultSet.getString(1));
        JsonObject resp = respBuilder.build();
        return Response.ok(resp).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD").build();
    }

}
