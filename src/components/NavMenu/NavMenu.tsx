import React from "react";
import Link from "next/link";
import RouteKit from "helpers/RouteKit";

const NavMenu = (): JSX.Element => {
  return (
    <div className="fixed w-screen text-white px-10 py-4 flex justify-center">
      <nav className="max-w-7xl w-full flex justify-between items-center">
        <Link href="/" as="/">
          <a>
            <img src="/img/logo/planningpoker-logo.svg" alt="" />
          </a>
        </Link>
        <ul className="flex">
          <li className="ml-8">
            <Link
              href={RouteKit.project.list.href}
              as={RouteKit.project.list.as}
            >
              <a>Projects</a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href={""} as={""}>
              <a>Settings</a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href={RouteKit.register().href} as={RouteKit.register().as}>
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
        </ul>
      </nav>
    </div>
  );
};
export default NavMenu;
