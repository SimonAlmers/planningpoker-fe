import { COOKIES } from "helpers/Constants";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import AuthToken from "./TokenKit";

const useToken = (): AuthToken | undefined => {
  const [token, setToken] = useState<AuthToken>();

  useEffect(() => {
    const token = Cookie.get(COOKIES.ACCESS_TOKEN);
    const authToken = new AuthToken(token);
    setToken(authToken);
  }, []);

  return token;
};

export default useToken;
