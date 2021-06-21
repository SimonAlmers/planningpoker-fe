import Cookies from "js-cookie";
import { COOKIES } from "helpers/Constants";

const requestInterceptor = (options) => {
  const config = options;
  const accessToken = Cookies.get(COOKIES.ACCESS_TOKEN);
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

export default requestInterceptor;
