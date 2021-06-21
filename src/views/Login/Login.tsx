import LoginForm from "./components/LoginForm";
import React from "react";

const LoginView = (): JSX.Element => (
  <div className="h-screen bg-gray-900 flex justify-center pt-48 items-start">
    <LoginForm />
  </div>
);
export default LoginView;
