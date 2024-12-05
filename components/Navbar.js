"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-gray-800 text-white">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex justify-evenly w-full">
            <a
              className="px-3 py-1 text-sm font-medium text-white hover:underline cursor-pointer"
              onClick={() => router.push("/activity")}
            >
              Add Activity
            </a>

            <a
              className="px-3 py-1 text-sm font-medium text-white hover:underline cursor-pointer"
              onClick={() => router.push("/events")}
            >
              Add Events
            </a>

            <a
              className="px-3 py-1 text-sm font-medium text-white hover:underline cursor-pointer"
              onClick={() => router.push("/configureclan")}
            >
              Change Clan Details
            </a>
            <a
              className="px-3 py-1 text-sm font-medium text-white hover:underline cursor-pointer"
              onClick={() => router.push("/events/Register")}
            >
              Make a registration form
            </a>

            <a
              className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-400 dark:hover:bg-blue-500 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Logout
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
