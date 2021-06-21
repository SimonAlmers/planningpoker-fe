import HTTPKit from "helpers/HTTPKit";

const UserEndpoints = {
  signUp: (payload: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    const url = "/api/v1/users/";
    return HTTPKit.post(url, payload);
  },
};

export default UserEndpoints;
