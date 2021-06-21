import AuthToken from "helpers/AuthKit/TokenKit";
import { COOKIES } from "helpers/Constants";
import { NextPageContext } from "next";
import ServerCookie from "next-cookies";
import React, { Component } from "react";
import { ServerResponse } from "http";
import RouteKit from "helpers/RouteKit";
import Router from "next/dist/client/router";

export type AuthProps = {
  token: string;
  auth: AuthToken;
};

const redirectToLogin = (server?: ServerResponse, nextRoute?: string) => {
  const loginRoute = RouteKit.login(nextRoute);
  if (server) {
    server.writeHead(302, { Location: loginRoute.as });
    server.end();
  } else {
    // only client side pages have access to next/router
    Router.push(loginRoute.href, loginRoute.as);
  }
};

const AuthenticatedView = (WrappedComponent: any) => {
  return class extends Component<AuthProps> {
    static async getInitialProps(ctx: NextPageContext) {
      const token = ServerCookie(ctx)[COOKIES.ACCESS_TOKEN];
      const auth = new AuthToken(token);
      const initialProps = { auth };

      if (!auth.token) redirectToLogin(ctx.res, ctx.asPath);

      let componentInitialProps = {};
      if (WrappedComponent.getInitialProps)
        componentInitialProps = await WrappedComponent.getInitialProps(ctx);
      return { ...initialProps, ...componentInitialProps };
    }

    get auth() {
      // the server pass to the client serializes the token
      // so we have to reinitialize the authToken class
      //
      // @see https://github.com/zeit/next.js/issues/3536
      return new AuthToken(this.props.auth?.token);
    }

    render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...this.props} auth={this.auth} />;
    }
  };
};

export default AuthenticatedView;
