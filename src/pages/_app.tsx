import Cookie from "js-cookie";
import NavMenu from "components/NavMenu";
import SnackBar from "components/SnackBar";
import APIKit from "helpers/APIKit";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "assets/main.scss";
import { COOKIES } from "helpers/Constants";
import handleError from "helpers/ErrorKit";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
};

export const UserContext = createContext<{
  user: null | User;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: (user: User) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  const fetchMe = async () => {
    try {
      const { data: user } = await APIKit.me.getMe();
      setUser(user);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const token = Cookie.get(COOKIES.ACCESS_TOKEN);
    if (token) fetchMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavMenu />
      <SnackBar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
