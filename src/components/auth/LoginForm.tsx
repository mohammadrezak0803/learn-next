"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ILogin } from "@/model/interface/ILogin";
import { loginApi } from "@/services/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMainContext } from "@/context/MainContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const router = useRouter();
  const { setToken } = useMainContext();

  const onSubmit = (data: ILogin) => {
    loginApi(data)
      .then((res) => {
        setToken(res.data.token)
        toast.success("login success");
        router.replace("/");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <div className="max-w-2xl w-[450px] mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
