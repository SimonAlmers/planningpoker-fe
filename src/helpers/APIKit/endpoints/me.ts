import HTTPKit from "helpers/HTTPKit";

const MeEndpoints = {
  getMe: () => {
    const url = "/api/v1/users/me/";
    return HTTPKit.get(url);
  },
};

export default MeEndpoints;
