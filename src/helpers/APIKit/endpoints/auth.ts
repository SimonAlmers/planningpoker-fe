import { COOKIES } from "helpers/Constants";
import HTTPKit from "helpers/HTTPKit";
import Cookie from "js-cookie";

const AuthEndpoints = {
  signIn: (email: string, password: string) => {
    const url = "/auth/api-token-auth/";
    return HTTPKit.post(url, { email, password }).then((response) => {
      const { data } = response;
      Cookie.set(COOKIES.ACCESS_TOKEN, data.access);
      Cookie.set(COOKIES.REFRESH_TOKEN, data.refresh);
      return response;
    });
  },
  refreshTokens: () => {
    const url = "/auth/api-token-refresh/";
    const refresh = Cookie.get(COOKIES.REFRESH_TOKEN);
    return HTTPKit.post(url, { refresh }).then((response) => {
      const { data } = response;
      Cookie.set(COOKIES.ACCESS_TOKEN, data.access);
      Cookie.set(COOKIES.REFRESH_TOKEN, data.refresh);
      return response;
    });
  },
};

export default AuthEndpoints;
