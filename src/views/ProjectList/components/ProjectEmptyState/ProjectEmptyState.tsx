import EmptyState from "components/EmptyState";
import React from "react";

const ProjectEmptyState = ({
  isSearch,
  onClick,
}: {
  isSearch: boolean;
  onClick: () => void;
}): JSX.Element => (
  <EmptyState
    img="/img/illustrations/project_empty_state.svg"
    title={
      isSearch
        ? "Hmm... couldn't find the project you were looking for..."
        : "Create your first project!"
    }
    bodyCopy="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dicta pariatur corporis aspernatur sunt? Officia iste magni, libero quibusdam quam ullam eum quia asperiores quae non vitae hic exercitationem excepturi. "
    button={{
      label: "Create Project",
      onClick,
    }}
  />
);
export default ProjectEmptyState;
