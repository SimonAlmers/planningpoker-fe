import { Field, Form, Formik } from "formik";
import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { UserContext } from "pages/_app";
import React, { useContext, useState } from "react";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const LoginForm = (): JSX.Element => {
  const [loginError, setLoginError] = useState(false);
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const nextRoute = router.query.next?.toString();

  const handleSubmit = async ({ email, password }) => {
    try {
      await APIKit.auth.signIn(email, password);
      const { data } = await APIKit.me.getMe();
      setUser(data);
      if (nextRoute) {
        router.push(nextRoute);
      } else {
        router.push(RouteKit.project.list.href, RouteKit.project.list.as);
      }
    } catch (error) {
      setLoginError(true);
      handleError(error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="bg-gray-800 text-gray-200 py-8 px-6 shadow-lg rounded-lg items-start">
          <h1 className="text-2xl font-bold">Login</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          <fieldset className="mt-3">
            <label className="block font-bold mb-0" htmlFor="email">
              Email
            </label>
            <Field
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              className="bg-gray-700 py-2 px-3 rounded-sm w-full"
            />
            {errors.email && touched.email ? (
              <p className="text-yellow-400 font-bold">{errors.email}</p>
            ) : null}
          </fieldset>
          <fieldset className="mt-3">
            <label className="block font-bold mb-0" htmlFor="email">
              Password
            </label>
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="bg-gray-700 py-2 px-3 rounded-sm w-full"
            />
            {errors.password && touched.password ? (
              <p className="text-yellow-400 font-bold">{errors.password}</p>
            ) : null}
          </fieldset>
          <button
            className="w-full font-bold mt-4 bg-yellow-400 text-black px-3 py-2 rounded"
            type="submit"
          >
            Login
          </button>
          {loginError && (
            <div className="my-4 py-2 errorMessage rounded-md">
              <p className="text-center max-w-sm">
                No active account found with the given credentials. Check your
                spelling and try again.
              </p>
            </div>
          )}
          <p className="mt-5 text-center">
            No account?
            <Link
              href={RouteKit.register(nextRoute).href}
              as={RouteKit.register(nextRoute).as}
            >
              <a className="text-yellow-400 font-bold"> Sign Up Now.</a>
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
