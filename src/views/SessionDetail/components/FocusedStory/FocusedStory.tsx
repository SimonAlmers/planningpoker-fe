import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "../../SessionDetail.module.scss";

const FocusedStory = ({
  story: { title, description },
}: {
  story: Story;
}): JSX.Element => (
  <div className={`${styles.story} bg-gray-700 rounded-lg p-5`}>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <p className="font-bold">Description</p>
    <ReactMarkdown source={description} escapeHtml linkTarget="_blank" />
  </div>
);
export default FocusedStory;
