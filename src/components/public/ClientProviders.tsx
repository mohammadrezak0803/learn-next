"use client";

import { UserProvider } from "@/context/MainContext";
import { store } from "@/redux/store";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserProvider >
        <ToastContainer position="top-right" autoClose={5000} />
        {children}
      </UserProvider>
    </>
  );
}
