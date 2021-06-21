import { AnimateSharedLayout, motion } from "framer-motion";
import RealTimeKit from "helpers/RealTimeKit";
import { SnackBarContext, UserContext } from "pages/_app";
import React, { useContext, useEffect, useState } from "react";
import styles from "./SnackBar.module.scss";

const variants = {
  initial: { y: 50, opacity: 0 },
  end: { y: 0, opacity: 1 },
};

const SnackBar = (): JSX.Element => {
  const { messages, dismissMessage, queueMessage } =
    useContext(SnackBarContext);
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    const notificationEngine = RealTimeKit.user.notifications(user?.id);
    notificationEngine.onChildAdded((snapchot) => {
      const notification = snapchot.val();
      setNotifications((prev) => ({
        ...prev,
        [notification.id]: notification,
      }));
      queueMessage({
        id: notification.id,
        title: notification.message,
        text: notification.context,
        isError: false,
      });
    });

    return () => {
      notificationEngine.off();
    };
  }, [user]);

  return (
    <div className={styles.snackBarContainer}>
      <AnimateSharedLayout>
        <motion.ul layout>
          {messages.map((message, index) => (
            <motion.div
              layout
              key={`snackbar-${index}`}
              initial="initial"
              animate="end"
              variants={variants}
              className={`${styles.snackBar} bg-gray-200 p-3 rounded-md shadow-lg flex flex-column mt-2`}
            >
              <h1 className="font-bold">{message.title}</h1>
              <p className="mb-3">{message.text}</p>
              <button
                onClick={() => dismissMessage(message.id)}
                className="btn bg-gray-400 align-self-end px-4 font-bold"
              >
                Ok
              </button>
            </motion.div>
          ))}
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  );
};
export default SnackBar;
