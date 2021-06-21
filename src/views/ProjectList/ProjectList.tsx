import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import ProjectList from "./components/ProjectList";
import CreateProjectForm from "./components/CreateProjectForm";
import APIKit from "helpers/APIKit";

import { Modal } from "reactstrap";
import { SnackBarContext } from "pages/_app";
import ProjectEmptyState from "./components/ProjectEmptyState";

// TODO June 19, 2021: Add debouncing
const ProjectListView = (): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCreateProjectModal, setDisplayCreateProjectModal] =
    useState(false);

  const toggleCreateProjectModal = () => {
    setDisplayCreateProjectModal((prev) => !prev);
  };

  const fetchProjectList = async () => {
    setIsLoading(true);
    APIKit.projects
      .getProjects(searchTerm)
      .then(({ data }) => {
        setProjects(data.results);
        setIsLoading(false);
      })
      .catch(handleError);
  };

  const projectCreateCallback = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
    setDisplayCreateProjectModal(false);
  };

  useEffect(() => {
    fetchProjectList();
  }, [searchTerm]);
  return (
    <div className="pt-48 px-4 bg-gray-900 h-screen flex justify-center text-white">
      <Head>
        <title>My Projects | Planning Poker</title>
      </Head>
      <h1 className="sr-only">My Projects</h1>
      <Modal
        isOpen={displayCreateProjectModal}
        toggle={toggleCreateProjectModal}
        contentClassName="bg-transparent"
        modalClassName="mt-48"
      >
        <CreateProjectForm projectCreateCallback={projectCreateCallback} />
      </Modal>
      {!isLoading && searchTerm.length === 0 && projects.length === 0 ? (
        <ProjectEmptyState
          isSearch={searchTerm.length > 0}
          onClick={() => {
            setDisplayCreateProjectModal(true);
          }}
        />
      ) : (
        <div className="max-w-7xl w-full">
          <div className="flex justify-between items-center px-2">
            <form>
              <input
                className="bg-gray-700 rounded-md py-2 px-4"
                type="search"
                name=""
                id=""
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                placeholder="Search projects"
              />
            </form>
            <button
              onClick={() => setDisplayCreateProjectModal(true)}
              className="btn bg-yellow-400 text-black font-weight-bold"
            >
              Create Project
            </button>
          </div>
          <hr className="bg-gray-700 my-3 mx-2" />
          {projects.length === 0 && !isLoading ? (
            <ProjectEmptyState
              isSearch={searchTerm.length > 0}
              onClick={() => {
                setDisplayCreateProjectModal(true);
              }}
            />
          ) : (
            <ProjectList projects={projects} />
          )}
        </div>
      )}
    </div>
  );
};
export default ProjectListView;
