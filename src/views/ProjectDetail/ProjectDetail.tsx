import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import APIKit from "helpers/APIKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import { SnackBarContext } from "pages/_app";
import CreateStoryModal from "./components/CreateStoryModal";
import ProjectMenu from "./components/ProjectMenu";
import StoryContainer from "./components/StoryContainer";

type Story = { title: string; id: string; description: string };

type ProjectFull = Project & {
  stories: Story[];
};

const ProjectDetailView = (): JSX.Element => {
  const router = useRouter();
  const projectId = router.query.projectId?.toString();
  const { handleError } = useContext(SnackBarContext);
  const [project, setProject] = useState<ProjectFull | null>(null);
  const [displayCreateStoryModal, setDisplayCreateStoryModal] = useState(false);

  const toggleCreateStoryModal = () => {
    setDisplayCreateStoryModal((prev) => !prev);
  };

  const fetchProject = async () => {
    try {
      const { data } = await APIKit.projects.getProject(projectId);
      setProject(data);
    } catch (error) {
      handleError(error);
    }
  };

  const createSession = async () => {
    try {
      const { data } = await APIKit.planningsessions.createSession(
        projectId,
        []
      );
      const sessionDetailRoute = RouteKit.project.sessions.detail(
        projectId,
        data.id
      );
      router.push(sessionDetailRoute.href, sessionDetailRoute.as);
    } catch (error) {
      handleError(error);
    }
  };

  const createStoryCallback = () => {
    toggleCreateStoryModal();
    fetchProject();
  };

  useEffect(() => {
    if (projectId) fetchProject();
  }, [router]);

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-start pt-24 text-white">
      <Head>
        <title>{project?.title || "Project"} | Planning Poker</title>
      </Head>
      {project && (
        <div className="w-full px-12 h-full max-h-full">
          <CreateStoryModal
            projectId={projectId}
            displayCreateStoryModal={displayCreateStoryModal}
            toggleCreateStoryModal={toggleCreateStoryModal}
            onCreateCallback={createStoryCallback}
          />
          <ProjectMenu
            project={project}
            toggleCreateStoryModal={toggleCreateStoryModal}
          />
          <div className="grid gap-3 grid-cols-3 h-full max-h-full">
            <StoryContainer
              title="Current Sprint"
              projectId={projectId}
              stories={project.stories}
              button={{ label: "Start Session", onClick: createSession }}
            />
            <StoryContainer
              title="Backlog"
              projectId={projectId}
              stories={[]}
            />
            <StoryContainer title="Icebox" projectId={projectId} stories={[]} />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectDetailView;
