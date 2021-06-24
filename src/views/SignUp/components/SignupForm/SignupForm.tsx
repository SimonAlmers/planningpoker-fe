import { Field, Form, Formik } from "formik";
import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  passwordConfirm: Yup.string().min(6, "Too Short!").required("Required"),
});

const SignupForm = (): JSX.Element => {
  const router = useRouter();
  const nextRoute = router.query.next?.toString();
  const [signupError, setSignupError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async ({
    email,
    firstName,
    lastName,
    password,
    passwordConfirm,
  }) => {
    if (password === passwordConfirm) {
      setPasswordError(false);
      try {
        const { data } = await APIKit.users.signUp({
          email,
          firstName,
          lastName,
          password,
        });

        if (nextRoute) {
          router.push(nextRoute);
        } else {
          router.push(RouteKit.project.list.href, RouteKit.project.list.as);
        }
      } catch (error) {
        setSignupError(true);
        handleError(error);
      }
    } else {
      setPasswordError(true);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="bg-gray-800 text-gray-200 py-8 px-6 shadow-lg rounded-lg items-start">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <fieldset>
            <label className="block font-bold mb-0 mt-3" htmlFor="email">
              Email
            </label>
            <Field
              className="bg-gray-700 py-2 px-4 rounded-sm w-full"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
            />
            {errors.email && touched.email && (
              <p className="text-yellow-400 font-bold">{errors.email}</p>
            )}
          </fieldset>
          <fieldset>
            <label className="block font-bold mb-0 mt-3" htmlFor="firstName">
              First Name
            </label>
            <Field
              className="bg-gray-700 py-2 px-4 rounded-sm w-full"
              type="text"
              name="firstName"
              placeholder="John"
            />
            {errors.firstName && touched.firstName && (
              <p className="text-yellow-400 font-bold">{errors.firstName}</p>
            )}
          </fieldset>
          <fieldset>
            <label className="block font-bold mb-0 mt-3" htmlFor="lastName">
              Last Name
            </label>
            <Field
              className="bg-gray-700 py-2 px-4 rounded-sm w-full"
              type="text"
              name="lastName"
              placeholder="Doe"
            />
            {errors.lastName && touched.lastName && (
              <p className="text-yellow-400 font-bold">{errors.lastName}</p>
            )}
          </fieldset>
          <fieldset>
            <label className="block font-bold mb-0 mt-3" htmlFor="email">
              Password
            </label>
            <Field
              className="bg-gray-700 py-2 px-4 rounded-sm w-full"
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <p className="text-yellow-400 font-bold">{errors.password}</p>
            )}
          </fieldset>
          <fieldset>
            <label
              className="block font-bold mb-0 mt-3"
              htmlFor="passwordConfirm"
            >
              Confirm Password
            </label>
            <Field
              className="bg-gray-700 py-2 px-4 rounded-sm w-full"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm passwords"
            />
            {errors.passwordConfirm && touched.passwordConfirm && (
              <p className="text-yellow-400 font-bold">
                {errors.passwordConfirm}
              </p>
            )}
            {passwordError ? (
              <p className="text-yellow-400 font-bold">
                The passwords doesn't match. Please try again.
              </p>
            ) : null}
          </fieldset>
          <button
            className="w-full font-bold mt-4 bg-yellow-400 text-black px-3 py-2 rounded"
            type="submit"
          >
            Sign Up
          </button>
          {signupError && (
            <div className="my-4 py-2 errorMessage rounded-md">
              <p className="text-center max-w-sm">
                User with this email already exists. Try logging in.
              </p>
            </div>
          )}
          <p className="mt-5 text-center">
            Already have an account?
            <Link
              href={RouteKit.login(nextRoute).href}
              as={RouteKit.login(nextRoute).as}
            >
              <a className="text-yellow-400 font-bold"> Login here.</a>
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};
export default SignupForm;
