import { useState } from "react";
import LoginWithGoogle from "../components/LoginWithGoogle";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import SubmitLoader from "../components/Loader/SubmitLoader";
import { signIn } from "next-auth/react";
import { redirectLink } from "../config/data";

const RegisterPage = () => {
  const router = useRouter();
  const { query } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const formElement = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];

  async function onFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };

    await fetch("/api/auth/signup", options)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status) {
          const status = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
            callbackUrl: query.redirect_page
              ? query.redirect_page
              : redirectLink,
          });

          if (status.ok) {
            setIsLoading(false);
            router.push(status.url);
          } else {
            setIsLoading(false);
            setErrorMessage(status.error);
          }
        } else {
          setIsLoading(false);
          setErrorMessage(data.error);
        }
      });
  }

  return (
    <div>
      <Head>
        <title>Register | Sahib AI</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
        <div className="max-w-md w-full m-4 py-4">
          <form
            className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={onFormSubmit}
          >
            <div className="w-full text-center text-2xl font-bold text-gray-700 mb-4">
              Sign Up
            </div>
            {formElement.map((formItem, key) => (
              <div className="mb-4" key={key}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={formItem.name}
                >
                  {formItem.label}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={formItem.name}
                  name={formItem.name}
                  type={formItem.type}
                  placeholder={formItem.label}
                  value={form[formItem.name]}
                  onChange={handleFormChange}
                  required="required"
                />
              </div>
            ))}
            {errorMessage && (
              <div className="text-sm text-gray-800 font-semibold text-center">
                {errorMessage}
              </div>
            )}
            <div className="text-center mt-8">
              {!isLoading ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 text-center w-[175px] rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              ) : (
                <SubmitLoader />
              )}
              <p className="font-bold mt-5 text-gray-500">OR</p>
              <LoginWithGoogle
                redirectLink={
                  query.redirect_page ? query.redirect_page : redirectLink
                }
              />
            </div>
          </form>
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                Log In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
