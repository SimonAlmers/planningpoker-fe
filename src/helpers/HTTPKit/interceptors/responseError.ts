import { AxiosError } from "axios";
import RouteKit from "helpers/RouteKit";
import Router from "next/dist/client/router";

const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response.status === 401) {
    Router.push(
      RouteKit.login(Router.asPath).href,
      RouteKit.login(Router.asPath).as
    );
  }
};

export default responseErrorInterceptor;
