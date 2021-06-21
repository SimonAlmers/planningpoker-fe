import { motion } from "framer-motion";
import RouteKit from "helpers/RouteKit";
import Link from "next/link";
import React from "react";

const projectListRoute = RouteKit.project.list;

const CallToActionCard = (): JSX.Element => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
    className="p-6 max-w-3xl mx-auto bg-gray-700 -mt-12 rounded-xl shadow-lg flex justify-between items-center"
  >
    <div>
      <h2 className="text-white text-2xl font-bold">Get started today!</h2>
      <p className="text-gray-300 max-w-md">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
        maiores recusandae enim.
      </p>
    </div>
    <Link href={projectListRoute.href} as={projectListRoute.as}>
      <a className="btn bg-yellow-400 font-bold text-xl rounded-md p-2">
        Create Project
      </a>
    </Link>
  </motion.div>
);

export default CallToActionCard;
