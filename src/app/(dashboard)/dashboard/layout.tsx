"use client";
import ClientProviders from "@/components/public/ClientProviders";
import "../../../styles/globals.css";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);

    // Disable scrolling when the sidebar is open on mobile
    if (!isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };
  const isActive = (path: string) =>
    pathname === path
      ? "bg-indigo-700 text-white"
      : "hover:bg-indigo-700 ";
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <div className="flex h-screen">
            <div
              className={`fixed lg:static top-0 left-0 h-full z-50 bg-indigo-600 text-white p-5 w-64 transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0`}
              aria-hidden={!isSidebarOpen}
            >
              <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
              <nav className="space-y-4">
                <Link
                  href="/dashboard/courses"
                  className={`block py-2 px-4 rounded-lg ${isActive(
                    "/dashboard/courses"
                  )}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span>Courses</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className={`block py-2 px-4 rounded-lg ${isActive(
                    "/dashboard/profile"
                  )}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span>Profile</span>
                </Link>
                <Link
                  href="/"
                  className="block py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  <span>Back to Home</span>
                </Link>
              </nav>
            </div>

            <div className="flex-1 p-6 bg-gray-100">
              <button
                className="lg:hidden text-indigo-600 mb-4"
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
              >
                {isSidebarOpen ? "Close Menu" : "Open Menu"}
              </button>
              {children}
            </div>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={toggleSidebar}
              ></div>
            )}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
