import StoryListItem from "components/StoryListItem";
import APIKit from "helpers/APIKit";
import { SnackBarContext } from "pages/_app";
import React, { useContext } from "react";
import styles from "../../SessionDetail.module.scss";

const StoryList = ({
  stories,
  sessionId,
  projectId,
  focusedStoryId,
}: {
  sessionId: string;
  projectId: string;
  stories: Story[];
  focusedStoryId: string | undefined;
}): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);

  const focusOnStory = async (storyId: string) => {
    try {
      await APIKit.planningsessions.updateSession(projectId, sessionId, {
        focusedStoryId: storyId,
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={`${styles.storyContainer} bg-gray-800 p-3`}>
      <h2 className="font-bold mb-3">Stories</h2>
      <ul>
        {stories.map((story) => (
          <button
            key={story.id}
            className="w-full text-left"
            onClick={() => focusOnStory(story.id)}
          >
            <StoryListItem
              highlighted={story.id === focusedStoryId}
              story={story}
            />
          </button>
        ))}
      </ul>
    </div>
  );
};
export default StoryList;
