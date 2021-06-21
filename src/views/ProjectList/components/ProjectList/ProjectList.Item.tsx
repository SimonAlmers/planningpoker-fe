import TagList from "components/TagList";
import RouteKit from "helpers/RouteKit";
import Link from "next/link";
import React from "react";

const ProjectListItem = ({
  project: { title, description, id },
}: {
  project: Project;
}): JSX.Element => {
  const { href, as } = RouteKit.project.detail(id);
  return (
    <Link href={href} as={as}>
      <a>
        <div className="h-full shadow-md bg-gray-800 p-4 rounded-md">
          <h2 className="text-xl text-gray-200 font-bold">{title}</h2>
          <p className="text-gray-400 mb-3">{description}</p>
          <TagList
            tags={[
              { text: "5", icon: "fas fa-users" },
              { text: "124", icon: "fas fa-star" },
              { text: "15", icon: "fas fa-bug" },
              { text: "38", icon: "fas fa-chart-line" },
            ]}
          />
        </div>
      </a>
    </Link>
  );
};
export default ProjectListItem;
