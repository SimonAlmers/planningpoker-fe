import { AnimateSharedLayout, motion } from "framer-motion";
import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RealTimeKit, { objectToArray } from "helpers/RealTimeKit";
import { UserContext } from "pages/_app";
import React, { useContext, useEffect, useState } from "react";
import styles from "./SnackBar.module.scss";

const variants = {
  initial: { y: 50, opacity: 0 },
  end: { y: 0, opacity: 1 },
};

const SnackBar = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState({});

  const dismissMessage = async (id: string) => {
    try {
      await APIKit.notifications.markRead(id);
      const newState = { ...notifications };
      delete newState[id];
      setNotifications({ ...newState });
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const notificationEngine = RealTimeKit.user.notifications(user?.id);
    notificationEngine.onChildAdded((snapshot) => {
      const notification = snapshot.val();
      if (notification.readAt === "None") {
        setNotifications((prev) => ({
          ...prev,
          [notification.id]: notification,
        }));
      }
    });

    return () => {
      notificationEngine.off();
    };
  }, [user]);

  return (
    <div className={styles.snackBarContainer}>
      <AnimateSharedLayout>
        <motion.ul layout>
          {objectToArray(notifications).map((message, index) => (
            <motion.div
              layout
              key={`snackbar-${index}`}
              initial="initial"
              animate="end"
              variants={variants}
              className={`${styles.snackBar} bg-gray-200 p-3 rounded-md shadow-lg flex flex-column mt-2`}
            >
              <h1 className="font-bold">{message.message}</h1>
              <p className="mb-3">{message.context}</p>
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
