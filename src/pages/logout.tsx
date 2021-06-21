import React, { useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { COOKIES } from "helpers/Constants";
import { NextPageContext } from "next";
import { UserContext } from "./_app";
import { useRouter } from "next/dist/client/router";
import RouteKit from "helpers/RouteKit";

const LogoutPage = (): JSX.Element => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    setUser(null);
    router.push(RouteKit.home.href, RouteKit.home.as);
  }, []);
  return <div className="h-screen bg-gray-900"></div>;
};

LogoutPage.getInitialProps = async (ctx: NextPageContext) => {
  await Cookie.remove(COOKIES.ACCESS_TOKEN);
  await Cookie.remove(COOKIES.REFRESH_TOKEN);
  return {};
};

export default LogoutPage;
