import React from "react";
import AuthenticatedView from "helpers/AuthenticatedView";
import SettingsView from "views/Settings";

const UserSettingsPage = (): JSX.Element => <SettingsView />;
export default AuthenticatedView(UserSettingsPage);
