import auth from "./endpoints/auth";
import me from "./endpoints/me";
import projects from "./endpoints/projects";
import stories from "./endpoints/stories";
import planningsessions from "./endpoints/planningsessions";
import users from "./endpoints/users";

const APIKit = {
  auth,
  me,
  projects,
  stories,
  planningsessions,
  users,
};

export default APIKit;
