import React, { useEffect, useState } from "react";
import APIKit from "helpers/APIKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import BreadCrumbs from "components/BreadCrumbs";
import handleError from "helpers/ErrorKit";
import { useProjectTitle } from "helpers/hooks";

const ProjectSettingsView = (): JSX.Element => {
  const router = useRouter();
  const projectId = router.query.projectId?.toString();
  const projectTitle = useProjectTitle(projectId);

  const deleteProject = async () => {
    try {
      await APIKit.projects.deleteProject(projectId);
      router.push(RouteKit.project.list.href, RouteKit.project.list.as);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="pt-48 bg-gray-900 h-screen flex flex-wrap justify-center items-start text-white">
      <Head>
        <title>Project Settings | Planning Poker</title>
      </Head>
      <div className="max-w-7xl w-full">
        <div className=" flex justify-between items-start">
          <BreadCrumbs
            links={[
              { label: "Projects", url: RouteKit.project.list },
              {
                label: projectTitle,
                url: RouteKit.project.detail(projectId),
              },
              { label: "Project Settings", url: RouteKit.project.list },
            ]}
          />
          <button
            onClick={deleteProject}
            className="btn bg-red-700 text-white font-bold"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectSettingsView;
