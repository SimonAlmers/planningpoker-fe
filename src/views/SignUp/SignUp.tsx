import React from "react";
import SignupForm from "./components/SignupForm";
import Head from "next/head";

const SignUpView = (): JSX.Element => (
  <div className="h-screen bg-gray-900 flex justify-center pt-48 px-8 items-start">
    <Head>
      <title>Sign Up |┬áPlanning Poker</title>
    </Head>
    <SignupForm />
  </div>
);
export default SignUpView;
