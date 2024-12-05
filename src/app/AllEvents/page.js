"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  var router = useRouter();
  const [allEvents, setallEvents] = useState([]);
  useEffect(() => {
    (async () => {
      var { data: axres } = await axios.get("/api/events");
      if (axres.status) {
        setallEvents(axres.events);
        // toast.success(axres.message);
      } else {
        toast.error(axres.message);
      }
    })();
  }, []);
  var refreshData = async () => {
    var { data: axres } = await axios.get("/api/events");
    if (axres.status) {
      setallEvents(axres.events);
      // toast.success(axres.message);
    } else {
      toast.error(axres.message);
    }
  };

  return (
    <div className=" p-[2rem]">
      <h3
        className="text-[2rem] font-semibold mb-[1rem]"
        style={{ fontFamily: "outfit" }}
      >
        All events
      </h3>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Events
              </th>
              <th scope="col" class="px-6 py-3">
                Day
              </th>
              <th scope="col" class="px-6 py-3">
                Time
              </th>
              <th scope="col" class="px-6 py-3">
                address
              </th>
              <th scope="col" class="px-6 py-3">
                description
              </th>
              <th scope="col" class="px-6 py-3">
                type
              </th>
              <th scope="col" class="px-6 py-3">
                Add Registration Form
              </th>
              <th scope="col" class="px-6 py-3">
                Delete Registration Form
              </th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((el) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.name}
                  </th>
                  <td class="px-6 py-4">{el.day}</td>
                  <td class="px-6 py-4">{el.time}</td>
                  <td class="px-6 py-4">{el.address}</td>
                  <td class="px-6 py-4 line-clamp-1">{el.description}</td>
                  <td class="px-6 py-4">{el.type}</td>
                  <td
                    class="px-6 py-4  cursor-pointer"
                    onClick={() => {
                      router.push("/events/Register?id=" + el._id);
                    }}
                  >
                    ➕
                  </td>
                  <td
                    class="px-6 py-4  cursor-pointer"
                    onClick={async () => {
                      var { data: axres } = await axios.delete(
                        "/api/events?id=" + el._id
                      );
                      if (axres.status) {
                        await refreshData();
                        toast.success(axres.message);
                      } else {
                        toast.error(axres.message);
                      }
                    }}
                  >
                    🗑️
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
