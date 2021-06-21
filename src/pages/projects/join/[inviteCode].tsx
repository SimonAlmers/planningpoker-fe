import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import JoinProjectView from "views/JoinProject";

const JoinProjectPage = (): JSX.Element => <JoinProjectView />;

export default AuthenticatedView(JoinProjectPage);
