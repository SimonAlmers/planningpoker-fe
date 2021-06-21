import React from "react";

const EmptyState = ({
  search = false,
  onClick,
}: {
  search?: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <div className="flex items-center flex-column">
      <img className="w-50 my-12" src="/img/emptystate/projects.svg" alt="" />
      <h2 className="text-3xl font-bold">
        {search
          ? "Hmm... couldn't find the project you were looking for..."
          : "Create your first project!"}
      </h2>
      <p className="text-center w-1/3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dicta
        pariatur corporis aspernatur sunt? Officia iste magni, libero quibusdam
        quam ullam eum quia asperiores quae non vitae hic exercitationem
        excepturi.
      </p>
      <button
        onClick={onClick}
        className="text-xl bg-yellow-400 font-bold py-2 px-4 text-black rounded-md my-4"
      >
        Create Project
      </button>
    </div>
  );
};
export default EmptyState;
