"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMainContext } from "@/context/MainContext";
import { toast } from "react-toastify";
import { IUpdateUser } from "@/model/interface/IUpdateUser";
import { updateuser } from "@/services/users";

const ProfilePage = () => {
  const { user, setUser } = useMainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateUser>({
    defaultValues: {
      email: "",
      name: "",
      role: "STUDENT",
    },
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const onSubmit = async (data: IUpdateUser) => {
    setIsUpdating(true);
    updateuser(data)
      .then((res) => {
        setUser(res.data.user);
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        toast.error("Failed to update profile!");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  if (!user) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 sm:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Update Profile
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Teacher</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isUpdating}
              className={`mt-4 w-full sm:w-auto px-6 py-2 rounded-md font-medium text-white shadow-md transition ${
                isUpdating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
