import { AnimateSharedLayout, motion } from "framer-motion";
import { objectToArray } from "helpers/RealTimeKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "./SnackBar.module.scss";
import useNotifications from "./useNotifications";

const variants = {
  initial: { y: 50, opacity: 0 },
  end: { y: 0, opacity: 1 },
};

const SnackBar = (): JSX.Element => {
  const { notifications, dismissNotification } = useNotifications();
  const router = useRouter();

  return (
    <div className={styles.snackBarContainer}>
      <AnimateSharedLayout>
        <motion.ul layout>
          {objectToArray(notifications).map(
            (message: NotificationMessage, index) => (
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
                {message.kind === 2 ? (
                  <div className="flex align-self-end">
                    <button
                      onClick={() => {
                        dismissNotification(message.id);
                      }}
                      className="btn px-4 font-bold mr-2"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => {
                        const sessionRoute = RouteKit.project.sessions.detail(
                          message.projectId,
                          message.sessionId
                        );
                        dismissNotification(message.id);
                        router.push(sessionRoute.href, sessionRoute.as);
                      }}
                      className="btn bg-gray-400 px-4 font-bold"
                    >
                      Join
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => dismissNotification(message.id)}
                    className="btn bg-gray-400 align-self-end px-4 font-bold"
                  >
                    Ok
                  </button>
                )}
              </motion.div>
            )
          )}
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  );
};
export default SnackBar;
