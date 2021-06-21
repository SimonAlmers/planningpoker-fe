import TagList from "components/TagList";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="h-full flex flex-column shadow-md bg-gray-800 p-4 rounded-md"
        >
          <h2 className="text-xl text-gray-200 font-bold">{title}</h2>
          <p className="text-gray-400 mb-3 h-full">{description}</p>
          <div className="">
            <TagList
              tags={[
                { text: "5", icon: "fas fa-users" },
                { text: "124", icon: "fas fa-star" },
                { text: "15", icon: "fas fa-bug" },
                { text: "38", icon: "fas fa-chart-line" },
              ]}
            />
          </div>
        </motion.div>
      </a>
    </Link>
  );
};
export default ProjectListItem;
