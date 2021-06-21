import ChatMessage from "components/ChatMessage";
import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RealTimeKit, { objectToArray } from "helpers/RealTimeKit";
import { UserContext } from "pages/_app";
import React, { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import styles from "../../SessionDetail.module.scss";

const SessionChat = ({
  projectId,
  sessionId,
}: {
  projectId: string;
  sessionId: string;
}): JSX.Element => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState({});
  const [messageDraft, setMessageDraft] = useState("");
  const ref = useRef(null);
  const [playSend] = useSound("/audio/chat-notification-send.mp3", {
    volume: 1,
  });
  const [playRecieve] = useSound("/audio/chat-notification-sound-1.mp3", {
    volume: 1,
  });
  const [autoScrollChat, setAutoScrollChat] = useState(false);

  const sendMessage = async (event?: React.FormEvent) => {
    event?.preventDefault();
    try {
      await APIKit.planningsessions.chat.postMessage(projectId, sessionId, {
        text: messageDraft,
      });
      setMessageDraft("");
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (ref.current && autoScrollChat) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const chatConnection = RealTimeKit.session.chat(projectId, sessionId);

    chatConnection.onChildAdded((snapshot) => {
      const message = snapshot.val();

      message.user.id !== user.id && playRecieve();
      setMessages((prev) => ({ ...prev, [message.id]: message }));
    });

    setTimeout(() => {
      setAutoScrollChat(true);
      if (ref.current && autoScrollChat) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

    return () => {
      chatConnection.off();
    };
  }, [projectId, sessionId]);

  return (
    <div className={`${styles.chatContainer} bg-gray-800 flex flex-column`}>
      <ul style={{ overflowY: "auto" }} className="px-3 h-100">
        <div className="py-2"></div>
        {objectToArray(messages).map((message, index) => (
          <ChatMessage
            key={message.id}
            displayProfileIcon={
              message.user.id !== objectToArray(messages)[index + 1]?.user.id
            }
            displayTimestamp={
              message.user.id !== objectToArray(messages)[index - 1]?.user.id
            }
            message={message}
            me={message.user.id === user.id}
          />
        ))}
        <div ref={ref}></div>
      </ul>

      <form className="p-3">
        <textarea
          style={{ resize: "none" }}
          className="w-100 rounded-lg bg-gray-600 p-3"
          name="message"
          rows={3}
          value={messageDraft}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.metaKey) {
              sendMessage();
              playSend();
            }
          }}
          onChange={(e) => setMessageDraft(e.target.value)}
          placeholder="What's on your mind?"
        />
        <small>
          <p className="text-muted float-right mt-1 mb-0">
            Send message with CMD + Enter
          </p>
        </small>
      </form>
    </div>
  );
};
export default SessionChat;
