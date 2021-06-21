import React, { useContext, useState } from "react";
import Link from "next/link";
import RouteKit from "helpers/RouteKit";
import { UserContext } from "pages/_app";
import UserMenu from "./NavMenu.UserMenu";
import { motion } from "framer-motion";

const NavMenu = (): JSX.Element => {
  const { user } = useContext(UserContext);

  return (
    <div className="fixed w-screen text-white px-10 py-4 flex justify-center">
      <nav className="max-w-7xl w-full flex justify-between items-center">
        <Link href="/" as="/">
          <a>
            <img src="/img/logo/planningpoker-logo.svg" alt="" />
          </a>
        </Link>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex items-center"
        >
          {user ? (
            <>
              <li className="ml-8">
                <Link
                  href={RouteKit.project.list.href}
                  as={RouteKit.project.list.as}
                >
                  <a>Projects</a>
                </Link>
              </li>
              <li className="ml-8">
                <UserMenu />
              </li>
            </>
          ) : (
            <>
              <li className="ml-8">
                <Link
                  href={RouteKit.register().href}
                  as={RouteKit.register().as}
                >
                  <a className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">
                    Sign Up
                  </a>
                </Link>
              </li>
              <li className="ml-8">
                <Link href={RouteKit.login().href} as={RouteKit.login().as}>
                  <a className="border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded font-bold">
                    Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </motion.ul>
      </nav>
    </div>
  );
};
export default NavMenu;
