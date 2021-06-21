import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import ProjectMemberListView from "views/ProjectMemberList";

const ProjectMembersPage = (): JSX.Element => <ProjectMemberListView />;
export default AuthenticatedView(ProjectMembersPage);
