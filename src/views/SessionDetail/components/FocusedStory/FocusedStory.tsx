import React from "react";
import styles from "../../SessionDetail.module.scss";

const FocusedStory = ({
  story: { title, description },
}: {
  story: Story;
}): JSX.Element => (
  <div className={`${styles.story} bg-gray-700 rounded-lg p-5`}>
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{description}</p>
  </div>
);
export default FocusedStory;
