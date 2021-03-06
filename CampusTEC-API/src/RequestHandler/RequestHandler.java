package RequestHandler;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/")
public class RequestHandler extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet h = new HashSet<Class<?>>();
        h.add(LoginHandler.class);
        h.add(ProfileHandler.class);
        h.add(ClassesHandler.class);
        h.add(PlannerHandler.class);
        h.add(ChallengeHandler.class);
        h.add(CommentHandler.class);
        h.add(AdminHandler.class);
        h.add(ActivityHandler.class);
        return h;
    }


}
