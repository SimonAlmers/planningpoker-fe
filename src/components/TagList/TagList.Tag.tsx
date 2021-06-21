import React from "react";

const Tag = ({
  tag: { text, icon, iconPosition = "LEADING" },
}: {
  tag: Tag;
}): JSX.Element => {
  return (
    <span className="bg-gray-700 text-gray-300 py-1 text-sm px-2 rounded-full mr-1">
      {icon && iconPosition === "LEADING" && <i className={icon + " mr-1"} />}
      {text}
      {icon && iconPosition === "TRAILING" && <i className={icon + " ml-1"} />}
    </span>
  );
};
export default Tag;
