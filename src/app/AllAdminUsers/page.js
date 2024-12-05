"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  var router = useRouter();
  const [allEvents, setallEvents] = useState([]);
  const [updationEventData, setupdationEventData] = useState({});

  useEffect(() => {
    (async () => {
      var { data: axres } = await axios.get("/api/admin");
      if (axres.status) {
        setallEvents(axres.admins);
        // toast.success(axres.message);
      } else {
        toast.error(axres.message);
      }
    })();
  }, []);
  var refreshData = async () => {
    var { data: axres } = await axios.get("/api/admin");
    if (axres.status) {
      setallEvents(axres.admins);
      // toast.success(axres.message);
    } else {
      toast.error(axres.message);
    }
  };
  async function UpdateEventDetailsfunc() {
    var { data: axres } = await axios.put("/api/admin", updationEventData);
    if (axres.status) {
      toast.success(axres.message);
      await refreshData();
    } else {
      toast.error(axres.message);
    }
  }
  return (
    <div className=" p-[2rem]">
      <div className="flex justify-between items-center mb-[1rem]">
        <h3
          className="text-[2rem] font-semibold mb-[1rem]"
          style={{ fontFamily: "outfit" }}
        >
          All Admins
        </h3>
        <button
          onClick={UpdateEventDetailsfunc}
          className="px-[1rem] py-[0.8rem] bg-slate-900 text-white w-[10rem] rounded-md cursor-pointer mt-[1rem]"
        >
          Sync
        </button>
      </div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Password (Encrypted)
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Delete Admin
              </th>
            </tr>
          </thead>
          <tbody>
            {allEvents?.map((el) => {
              return (
                <tr
                  key={el._id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <input
                      type="text"
                      value={updationEventData[el._id]?.email}
                      placeholder={el.email}
                      className="min-w-[15rem] bg-transparent"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? {
                                ...prev[el._id],
                                email: eel.currentTarget?.value,
                              }
                            : { email: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </th>
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      value={updationEventData[el._id]?.password}
                      placeholder={el.password}
                      className="min-w-[15rem] bg-transparent"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? {
                                ...prev[el._id],
                                password: eel.currentTarget?.value,
                              }
                            : { password: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </td>
                  <td>Super Admin</td>
                  <td
                    class="px-6 py-4  cursor-pointer"
                    onClick={async () => {
                      var { data: axres } = await axios.delete(
                        "/api/admin?id=" + el._id
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

export default Page;
