import RealTimeKit from "helpers/RealTimeKit";
import { useEffect, useState } from "react";

const useSessionChat = (projectId: string, sessionId: string) => {
  const [messages, setMessages] = useState({});

  const handleSnapshot = (snapshot) => {
    const message = snapshot.val();
    setMessages((prev) => ({ ...prev, [message.id]: message }));
  };

  useEffect(() => {
    const chatConnection = RealTimeKit.session.chat(projectId, sessionId);

    chatConnection.onChildAdded(handleSnapshot);
    chatConnection.onChildChanges(handleSnapshot);

    return () => {
      chatConnection.off();
    };
  }, [projectId, sessionId]);

  return messages;
};

export default useSessionChat;
