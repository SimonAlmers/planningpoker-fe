import ProfileIcon from "components/ProfileIcon";
import { formatDistance } from "date-fns";
import { motion } from "framer-motion";
import React from "react";

const variants = {
  initial: { y: 50, opacity: 0 },
  end: { y: 0, opacity: 1 },
};

const ChatMessage = ({
  message: { user, text, createdAt },
  displayProfileIcon = true,
  displayTimestamp = true,
  me = false,
}: {
  message: {
    user: {
      id: string;
      initials: string;
      firstName: string;
      lastName: string;
    };
    text: string;
    createdAt: string;
  };
  me?: boolean;
  displayProfileIcon?: boolean;
  displayTimestamp?: boolean;
}): JSX.Element => {
  return (
    <motion.li
      initial="initial"
      animate="end"
      variants={variants}
      className={`flex flex-column ${me ? "items-end" : ""}`}
    >
      {displayTimestamp && (
        <p style={{ fontSize: "0.625rem" }} className="mb-0 text-white">
          {formatDistance(new Date(createdAt.replace(" ", "T")), new Date())}
        </p>
      )}
      <div
        className={`w-75 rounded-md shadow-sm p-2 mb-2 ${
          me ? "self-end bg-green-700 text-white" : " bg-gray-700"
        }`}
      >
        <p className="mb-0">{text}</p>
      </div>
      {displayProfileIcon && (
        <div className="mb-3">
          <ProfileIcon
            initials={user.initials}
            fullName={`${user.firstName} ${user.lastName}`}
          />
        </div>
      )}
    </motion.li>
  );
};
export default ChatMessage;
