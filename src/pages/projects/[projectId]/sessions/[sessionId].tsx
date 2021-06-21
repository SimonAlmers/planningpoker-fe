import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import SessionDetailView from "views/SessionDetail";

const SessionDetailPage = (): JSX.Element => <SessionDetailView />;
export default AuthenticatedView(SessionDetailPage);
