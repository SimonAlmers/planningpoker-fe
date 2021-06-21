import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import StoryDetailView from "views/StoryDetail";

const StoryDetailPage = (): JSX.Element => <StoryDetailView />;
export default AuthenticatedView(StoryDetailPage);
