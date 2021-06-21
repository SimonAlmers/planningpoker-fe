import Cookie from "js-cookie";
import NavMenu from "components/NavMenu";
import SnackBar from "components/SnackBar";
import APIKit from "helpers/APIKit";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { COOKIES } from "helpers/Constants";

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

export const SnackBarContext = createContext<{
  messages: SnackBarMessage[];
  queueMessage: (message: SnackBarMessage) => void;
  dismissMessage: (id: string) => void;
  handleError: (error: { title: string; text: string }) => void;
}>({
  messages: [],
  queueMessage: () => {},
  dismissMessage: () => {},
  handleError: () => {},
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

  const [messages, setMessages] = useState<SnackBarMessage[]>([]);

  const dismissMessage = (id: string) => {
    setMessages(() => messages.filter((message) => message.id !== id));
  };

  const queueMessage = (message: SnackBarMessage) => {
    setMessages((prev) => [...prev, message]);

    setTimeout(() => {
      dismissMessage(message.id);
    }, 3000);
  };

  const randomId = (): string => `${Math.ceil(Math.random() * 10000)}`;

  const handleError = (error: { title: string; text: string }) => {
    queueMessage({
      ...error,
      id: randomId(),
      isError: true,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SnackBarContext.Provider
        value={{ messages, dismissMessage, queueMessage, handleError }}
      >
        <NavMenu />
        <SnackBar />
        <Component {...pageProps} />
      </SnackBarContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
