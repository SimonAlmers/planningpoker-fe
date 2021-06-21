import auth from "./endpoints/auth";
import me from "./endpoints/me";
import notifications from "./endpoints/notifications";
import projects from "./endpoints/projects";
import stories from "./endpoints/stories";
import planningsessions from "./endpoints/planningsessions";
import users from "./endpoints/users";

const APIKit = {
  auth,
  me,
  notifications,
  projects,
  stories,
  planningsessions,
  users,
};

export default APIKit;
