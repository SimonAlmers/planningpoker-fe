import Chat from "components/Chat/Chat";
import APIKit from "helpers/APIKit";
import React from "react";
import useSessionChat from "./useSessionChat";
import styles from "../../SessionDetail.module.scss";

const SessionChat = ({
  projectId,
  sessionId,
}: {
  projectId: string;
  sessionId: string;
}): JSX.Element => {
  const messages = useSessionChat(projectId, sessionId);
  return (
    <Chat
      className={styles.chatContainer}
      messages={messages}
      messagePostApiCall={({ text }) =>
        APIKit.planningsessions.chat.postMessage(projectId, sessionId, {
          text,
        })
      }
    />
  );
};
export default SessionChat;
