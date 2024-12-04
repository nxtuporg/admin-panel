"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <div>
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
              onClick={() => router.push("/registration")}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {[
          {
            title: "Add Activities",
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently`,
            button: "Add Activity",
            link: "/activity",
          },
          {
            title: "Event details",
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently`,
            button: "Add Event",
            link: "/events",
          },
          {
            title: "Configure Clan Details",
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently`,
            button: "Change Clan Details",
            link: "/configureclan",
          },
          {
            title: "Make a registration form",
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently`,
            button: "Create a event registration form",
            link: "/registration",
          },
          {
            title: "Add a new admin user",
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently`,
            button: "Create a new Admin User",
            link: "/register",
          },
        ].map((el) => {
          return (
            <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg text-white font-bold mb-4 ">
                  {el.title}
                </h2>
                <p className="text-gray-400 mb-6 line-clamp-2">{el.desc}</p>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => router.push(el.link)}
                >
                  {el.button}
                </button>
              </div>
            </div>
          );
        })}

        {/* 
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black">Event details</h2>
            <p className="text-gray-700 mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently
            </p>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => router.push("/events")}
            >
              Add Event
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black">
              Configure Clan Details
            </h2>
            <p className="text-gray-700 mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently
            </p>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => router.push("/configureclan")}
            >
              Change Clan Details
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black">
              Make a registration form
            </h2>
            <p className="text-gray-700 mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently
            </p>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => router.push("/registration")}
            >
              Create a event registration form
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
