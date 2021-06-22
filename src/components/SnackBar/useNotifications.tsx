import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RealTimeKit from "helpers/RealTimeKit";
import { UserContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";

const useNotifications = () => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState({});

  const handleSnapshot = (snapshot) => {
    const notification = snapshot.val();
    if (notification.readAt === "None") {
      setNotifications((prev) => ({
        ...prev,
        [notification.id]: notification,
      }));
    }
  };

  const dismissNotification = async (id: string) => {
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

    notificationEngine.onChildAdded(handleSnapshot);
    notificationEngine.onChildChanges(handleSnapshot);

    return () => {
      notificationEngine.off();
    };
  }, [user]);

  return { notifications, dismissNotification };
};
export default useNotifications;
