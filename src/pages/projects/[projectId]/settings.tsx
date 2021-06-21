import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import ProjectSettingsView from "views/ProjectSettings";

const ProjectSettingsPage = (): JSX.Element => <ProjectSettingsView />;
export default AuthenticatedView(ProjectSettingsPage);
