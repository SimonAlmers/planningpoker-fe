import APIKit from "helpers/APIKit";

import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import { SnackBarContext } from "pages/_app";
import React, { useContext } from "react";

const JoinProjectView = (): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);
  const router = useRouter();
  const inviteCode = router.query.inviteCode?.toString();

  const joinProject = async () => {
    try {
      const { data } = await APIKit.projects.invites.acceptInvite(inviteCode);
      const projectRoute = RouteKit.project.detail(data.projectId);
      router.push(projectRoute.href, projectRoute.as);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="pt-48 bg-gray-900 h-screen flex justify-center text-white">
      <div className="max-w-7xl w-full">
        <h1 className="text-xl font-bold">Join The Project</h1>
        <button
          onClick={joinProject}
          className="btn bg-yellow-400 text-black font-bold"
        >
          <i className="fas fa-user-plus mr-2" /> Join Project
        </button>
      </div>
    </div>
  );
};
export default JoinProjectView;
