import Link from "next/link";
import React from "react";

const BreadCrumbs = ({
  links,
}: {
  links: { label: string; url: { href: string; as: string } }[];
}) => {
  const isLastLink = (index: number) => index === links.length - 1;
  return (
    <div className="text-xl">
      <ul className="flex items-center">
        {links.map((crumb, index) =>
          isLastLink(index) ? (
            <li className="mr-2 font-bold" key={crumb.label}>
              {crumb.label}
            </li>
          ) : (
            <li className="mr-2 text-gray-400" key={crumb.label}>
              <Link href={crumb.url.href} as={crumb.url.as}>
                <a>{crumb.label}</a>
              </Link>
              <i className="fas fa-angle-right ml-2"></i>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default BreadCrumbs;
