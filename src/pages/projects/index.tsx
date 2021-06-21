import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import ProjectListView from "views/ProjectList/ProjectList";

const ProjectListPage = (): JSX.Element => <ProjectListView />;

export default AuthenticatedView(ProjectListPage);
