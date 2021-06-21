import React from "react";
import styles from "../../SessionDetail.module.scss";

const FocusedStory = ({
  story: { title, description },
}: {
  story: Story;
}): JSX.Element => (
  <div className={`${styles.story} bg-gray-700 rounded-lg p-5`}>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <h3 className="font-bold">Description</h3>
    <p>{description}</p>
  </div>
);
export default FocusedStory;
