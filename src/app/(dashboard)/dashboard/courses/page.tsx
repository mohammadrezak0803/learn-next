"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { addcourses, getcourses as getCoursesApi } from "@/services/courses";
import { useMainContext } from "@/context/MainContext";
import { IAddCourse, ICourse } from "@/model/interface/ICourses";

const CoursesPage = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [loadingGetData, setLoadingGetData] = useState(true);
  const { user } = useMainContext();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICourse>();

  const onAddCourse = (data: ICourse) => {
    const dataForAdd: IAddCourse = {
      description: data.description,
      instructorId: user?.id as number,
      price: data.price,
      title: data.title,
    };

    addcourses(dataForAdd)
      .then((res) => {
        console.log(res);
        const newCourse = {
          ...data,
          id: user?.id as number,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCourses((prevCourses) => [...prevCourses, newCourse]);
        setAddModalOpen(false);
        reset();
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const onUpdateCourse = (data: ICourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === data.id
          ? {
              ...course,
              ...data,
              updatedAt: new Date().toISOString(),
              instructorId: user?.id as number,
            }
          : course
      )
    );
    setUpdateModalOpen(false);
    reset();
  };

  const openUpdateModal = (course: ICourse) => {
    setValue("id", course.id);
    setValue("title", course.title);
    setValue("description", course.description);
    setValue("price", course.price);
    setValue("instructorId", course.instructorId);
    setUpdateModalOpen(true);
  };

  const getCourses = () => {
    setLoadingGetData(true);
    getCoursesApi()
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {})
      .finally(() => {
        setLoadingGetData(false);
      });
  };

  useEffect(() => {
    getCourses();
  }, []);

  if (loadingGetData) return <p>Loading For Get Courses...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 sm:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Courses</h1>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
              onClick={() => openUpdateModal(course)}
            >
              <h2 className="text-lg font-bold text-gray-800">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {course.description}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Price: ${course.price}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-600 text-center">
            No courses available. Add a course to get started.
          </p>
        )}
      </div>

      {/* Add Course Modal */}
      <Transition appear show={isAddModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setAddModalOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                  <Dialog.Title className="text-lg font-bold text-gray-800">
                    Add Course
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(onAddCourse)}
                    className="space-y-4 mt-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        {...register("title", {
                          required: "Title is required",
                        })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is required",
                        })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
                        onClick={() => {
                          setAddModalOpen(false);
                          reset();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Update Course Modal */}
      <Transition appear show={isUpdateModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setUpdateModalOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                  <Dialog.Title className="text-lg font-bold text-gray-800">
                    Update Course
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(onUpdateCourse)}
                    className="space-y-4 mt-4"
                  >
                    <input type="hidden" {...register("id")} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        {...register("title", {
                          required: "Title is required",
                        })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                        })}
                        rows={3}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is required",
                        })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
                        onClick={() => {
                          setUpdateModalOpen(false);
                          reset();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CoursesPage;
