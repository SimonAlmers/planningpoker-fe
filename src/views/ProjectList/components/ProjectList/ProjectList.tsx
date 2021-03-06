import React from "react";
import ProjectListItem from "./ProjectList.Item";

const ProjectList = ({ projects }: { projects: Project[] }): JSX.Element => {
  return (
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectListItem project={project} />
        </li>
      ))}
    </ul>
  );
};
export default ProjectList;
