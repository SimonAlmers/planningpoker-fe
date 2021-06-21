import React, { useContext, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import RouteKit from "helpers/RouteKit";
import { UserContext } from "pages/_app";
import Link from "next/link";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <Dropdown toggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
      <DropdownToggle className="bg-transparent p-0 border-0">
        {user.firstName} {user.lastName}
      </DropdownToggle>

      <DropdownMenu className="bg-gray-800 text-gray-200 py-4 shadow-lg">
        <ul>
          <li className="px-3">
            <Link href={RouteKit.settings.href} as={RouteKit.settings.as}>
              <a>Settings</a>
            </Link>
          </li>
          <hr className="bg-gray-600 my-3" />
          <li className="px-3">
            <Link href={RouteKit.logout.href} as={RouteKit.logout.as}>
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      </DropdownMenu>
    </Dropdown>
  );
};
export default UserMenu;
