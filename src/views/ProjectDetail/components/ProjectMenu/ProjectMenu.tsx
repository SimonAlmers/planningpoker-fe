import RouteKit from "helpers/RouteKit";
import Link from "next/link";
import React from "react";

const projectListRoute = RouteKit.project.list;

const ProjectMenu = ({
  project: { title, description, id },
  toggleCreateStoryModal,
}: {
  project: {
    id: string;
    title: string;
    description: string;
  };
  toggleCreateStoryModal: () => void;
}): JSX.Element => {
  return (
    <div className="py-8 flex justify-between items-center">
      <div>
        <Link href={projectListRoute.href} as={projectListRoute.as}>
          <a className="text-yellow-400">
            <i className="fas fa-angle-left mr-2" />
            Projects
          </a>
        </Link>
        <h1 className="text-xl font-bold">{title}</h1>
        <p>{description}</p>
      </div>
      <nav>
        <ul className="flex items-center">
          <li className="ml-4">
            <button
              onClick={toggleCreateStoryModal}
              className="btn bg-yellow-400 text-black font-bold"
            >
              Add Story
            </button>
          </li>
          <li className="ml-4">
            <Link
              href={RouteKit.project.members(id).href}
              as={RouteKit.project.members(id).as}
            >
              <a>Members</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link
              href={RouteKit.project.settings(id).href}
              as={RouteKit.project.settings(id).as}
            >
              <a>Settings</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default ProjectMenu;
