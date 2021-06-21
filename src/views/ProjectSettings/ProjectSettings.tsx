import React, { useContext } from "react";
import APIKit from "helpers/APIKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import { SnackBarContext } from "pages/_app";
import Head from "next/head";

const ProjectSettingsView = (): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);
  const router = useRouter();

  const deleteProject = async () => {
    const projectId = router.query.projectId?.toString();
    try {
      await APIKit.projects.deleteProject(projectId);
      router.push(RouteKit.project.list.href, RouteKit.project.list.as);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="h-screen bg-gray-900 pt-48 flex justify-center text-white">
      <Head>
        <title>Project Settings | Planning Poker</title>
      </Head>
      <div>
        <h1 className="text-xl font-bold">Project Settings</h1>
        <button
          onClick={deleteProject}
          className="btn bg-red-700 text-white font-bold"
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};
export default ProjectSettingsView;
