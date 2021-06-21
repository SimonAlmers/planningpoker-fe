import APIKit from "helpers/APIKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { SnackBarContext, UserContext } from "pages/_app";
import React, { useContext, useState } from "react";

const LoginForm = (): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const nextRoute = router.query.next?.toString();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await APIKit.auth.signIn(email, password);
      const { data } = await APIKit.me.getMe();
      setUser(data);
    } catch (error) {
      handleError({
        title: "There Was An Error Logging In",
        text: "Check your credentials and try again.",
      });
    }

    if (nextRoute) {
      router.push(nextRoute);
    } else {
      router.push(RouteKit.project.list.href, RouteKit.project.list.as);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-gray-200 py-8 px-6 shadow-lg rounded-lg items-start"
    >
      <h1 className="text-2xl font-bold">Login</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      <fieldset className="mt-3">
        <label className="block font-bold mb-0" htmlFor="email">
          Email
        </label>
        <input
          className="bg-gray-700 py-2 px-4 rounded-sm w-full"
          type="email"
          name="email"
          id="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={handleEmailChange}
        />
      </fieldset>
      <fieldset className="mt-3">
        <label className="block font-bold mb-0" htmlFor="email">
          Password
        </label>
        <input
          className="bg-gray-700 py-2 px-4 rounded-sm w-full"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </fieldset>
      <button
        className="w-full font-bold mt-4 bg-yellow-400 text-black px-3 py-2 rounded"
        type="submit"
      >
        Login
      </button>
      <p className="mt-5 text-center">
        No account?
        <Link
          href={RouteKit.register(nextRoute).href}
          as={RouteKit.register(nextRoute).as}
        >
          <a className="text-yellow-400 font-bold"> Sign Up Now.</a>
        </Link>
      </p>
    </form>
  );
};
export default LoginForm;
