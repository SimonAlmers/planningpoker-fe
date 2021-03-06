import { AxiosPromise } from "axios";
import ChatMessage from "components/ChatMessage";
import handleError from "helpers/ErrorKit";
import { objectToArray } from "helpers/RealTimeKit";
import { UserContext } from "pages/_app";
import React, { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";

const Chat = ({
  className,
  messages,
  muted = false,
  messagePostApiCall,
}: {
  muted?: boolean;
  messages: object;
  className?: string;
  messagePostApiCall: ({ text: string }) => AxiosPromise;
}): JSX.Element => {
  const [messageDraft, setMessageDraft] = useState("");
  const [autoScrollChat, setAutoScrollChat] = useState(false);
  const [playSend] = useSound("/audio/chat-notification-send.mp3", {
    volume: muted ? 0 : 1,
  });
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (ref.current && autoScrollChat) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      setAutoScrollChat(true);
      if (ref.current && autoScrollChat) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  }, []);

  const sendMessage = async (event?: React.FormEvent) => {
    event?.preventDefault();
    try {
      playSend();
      await messagePostApiCall({ text: messageDraft });
      setMessageDraft("");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={`${className} bg-gray-800 flex flex-column`}>
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
export default Chat;
