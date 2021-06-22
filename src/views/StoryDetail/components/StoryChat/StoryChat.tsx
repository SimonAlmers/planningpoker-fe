import Chat from "components/Chat/Chat";
import APIKit from "helpers/APIKit";
import React from "react";
import useStoryComments from "./useStoryComments";

const StoryChat = ({
  projectId,
  storyId,
}: {
  projectId: string;
  storyId: string;
}): JSX.Element => {
  const messages = useStoryComments(projectId, storyId);
  return (
    <Chat
      className={"h-50 bg-gray-700"}
      messages={messages}
      messagePostApiCall={({ text }) =>
        APIKit.stories.comments.postComment(projectId, storyId, {
          text,
        })
      }
    />
  );
};

export default StoryChat;
