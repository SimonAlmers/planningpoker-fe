import HTTPKit from "helpers/HTTPKit";

const NotificationEndpoints = {
  markRead: (id: string) => {
    const url = `/api/v1/notifications/${id}/mark_read`;
    return HTTPKit.patch(url, {});
  },
};

export default NotificationEndpoints;
