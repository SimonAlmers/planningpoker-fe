import React from "react";

const StoryListItem = ({
  story,
  highlighted,
  className,
}: {
  story: Story;
  highlighted: boolean;
  className?: string;
}): JSX.Element => {
  return (
    <li
      className={`${className} ${
        highlighted ? "bg-green-700" : "bg-gray-700"
      } rounded-sm py-3 px-2`}
    >
      <h3 className="font-bold">{story.title}</h3>
    </li>
  );
};
export default StoryListItem;
