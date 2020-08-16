import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;


@Path("/login")
public class LoginHandler {
    @GET
    @Produces("application/json")
    public String authenticate(){
        return "{\"title\": \"Tarea mate\", \"days\": 2, \"hours\": 10}";
    }
}
