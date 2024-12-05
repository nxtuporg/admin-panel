"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  // const pathname = window.location.href;
  // const headingText = location.pathname === "/register" ? "Register" : "Login";
  async function submitRegister(email, pass) {
    var { data: axres } = await axios.post("/api/register", {
      email,
      password: pass,
    });
    if (axres.status) {
      toast.success(axres.message);
      alert(`User Credentials are:\nEmail:${email}\nPassword:${pass}`);
      router.push("/AllAdminUsers");
    } else {
      // console.log(axres);
      toast.error(axres.message);
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            {"Register"}
          </h2>
          <form
            className="space-y-4"
            onSubmit={(el) => {
              el.preventDefault();
              submitRegister(
                el.currentTarget.email.value,
                el.currentTarget.password.value
              );
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:ring-offset-gray-800 dark:border-gray-700"
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {"Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
