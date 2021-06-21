import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import ProjectDetailView from "views/ProjectDetail";

const ProjectDetailPage = (): JSX.Element => <ProjectDetailView />;

export default AuthenticatedView(ProjectDetailPage);
