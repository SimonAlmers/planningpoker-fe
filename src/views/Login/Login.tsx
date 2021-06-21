import LoginForm from "./components/LoginForm";
import Head from "next/head";
import React from "react";

const LoginView = (): JSX.Element => (
  <div className="h-screen bg-gray-900 flex justify-center pt-48 px-8 items-start">
    <Head>
      <title>Login | Planning Poker</title>
    </Head>
    <LoginForm />
  </div>
);
export default LoginView;
