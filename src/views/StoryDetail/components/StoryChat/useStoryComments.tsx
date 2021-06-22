import RealTimeKit from "helpers/RealTimeKit";
import { useEffect, useState } from "react";

const useStoryComments = (projectId: string, storyId: string) => {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const chatConnection = RealTimeKit.story.chat(projectId, storyId);

    chatConnection.onChildAdded((snapshot) => {
      const message = snapshot.val();
      setMessages((prev) => ({ ...prev, [message.id]: message }));
    });

    return () => {
      chatConnection.off();
    };
  }, [projectId, storyId]);

  return messages;
};

export default useStoryComments;
