import React from "react";

const ProfileIcon = ({
  size = "md",
  initials,
  fullName,
}: {
  size?: "md" | "lg";
  initials: string;
  fullName?: string;
}): JSX.Element => {
  const sizes = {
    md: "32px",
    lg: "48px",
  };
  return (
    <div
      title={fullName}
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: sizes[size],
      }}
      className="bg-gray-600 text-white shadow-sm flex justify-center items-center"
    >
      <span className="font-bold">{initials}</span>
    </div>
  );
};
export default ProfileIcon;
