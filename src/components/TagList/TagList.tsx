import React from "react";
import Tag from "./TagList.Tag";

const TagList = ({ tags }: { tags: Tag[] }): JSX.Element => {
  return (
    <ul className="flex">
      {tags.map((tag, index) => (
        <li key={`${index}-${tag.text}`}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
export default TagList;
