import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";

const SignupForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();
  const nextRoute = router.query.next?.toString();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      APIKit.users
        .signUp({ email, firstName, lastName, password })
        .then(() => {
          if (nextRoute) {
            router.push(nextRoute);
          } else {
            router.push(RouteKit.project.list.href, RouteKit.project.list.as);
          }
        })
        .catch(handleError);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-gray-200 py-8 px-6 shadow-lg rounded-lg items-start"
    >
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <fieldset>
        <label className="block font-bold mb-0 mt-3" htmlFor="email">
          Email
        </label>
        <input
          required
          className="bg-gray-700 py-2 px-4 rounded-sm w-full"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="john.doe@example.com"
        />
      </fieldset>
      <fieldset>
        <label className="block font-bold mb-0 mt-3" htmlFor="firstName">
          First Name
        </label>
        <input
          required
          className="bg-gray-700 py-2 px-4 rounded-sm w-full"
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder="John"
        />
      </fieldset>
      <fieldset>
        <label className="block font-bold mb-0 mt-3" htmlFor="lastName">
          Last Name
        </label>
        <input
          required
          className="bg-gray-700 py-2 px-4 rounded-sm w-full"
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder="Doe"
        />
      </fieldset>
      <fieldset>
        <label className="block font-bold mb-0 mt-3" htmlFor="email">
          Password
        </label>
        <input
          required
          className="bg-gray-700 py-2 px-4 rounded-sm w-full"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </fieldset>
      <fieldset>
        <label className="block font-bold mb-0 mt-3" htmlFor="passwordConfirm">
          Confirm Password
        </label>
        <input
          required
          className="bg-gray-700 py-2 px-4 rounded-sm w-full"
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
          placeholder="Confirm passwords"
        />
      </fieldset>
      <button
        className="w-full font-bold mt-4 bg-yellow-400 text-black px-3 py-2 rounded"
        type="submit"
      >
        Sign Up
      </button>
      <p className="mt-5 text-center">
        Already have an account?
        <Link
          href={RouteKit.login(nextRoute).href}
          as={RouteKit.login(nextRoute).as}
        >
          <a className="text-yellow-400 font-bold"> Login here.</a>
        </Link>
      </p>
    </form>
  );
};
export default SignupForm;
