"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  var router = useRouter();
  const [allEvents, setallEvents] = useState([]);
  const [updationEventData, setupdationEventData] = useState({});
  const [loading, setLoading] = useState(false);
const getAllEvents = async () => {
  try {
      setLoading(true);
  var { data: axres } = await axios.get("/api/events");
  if (axres.status) {
    setallEvents(axres.events);
    // toast.success(axres.message);
  } else {
    toast.error(axres.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    getAllEvents();
  }, []);

  var refreshData = async () => {
    // var { data: axres } = await axios.get("/api/events");
    // if (axres.status) {
    //   setallEvents(axres.events);
    //   // toast.success(axres.message);
    // } else {
    //   toast.error(axres.message);
    // }
    getAllEvents();
  };
  async function UpdateEventDetailsfunc() {
    var { data: axres } = await axios.put("/api/events", updationEventData);
    if (axres.status) {
      toast.success(axres.message);
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
          All events
        </h3>
        <button
          onClick={UpdateEventDetailsfunc}
          className="px-[1rem] py-[0.8rem] bg-slate-900 text-white w-[10rem] rounded-md cursor-pointer mt-[1rem]"
        >
          Sync
        </button>
      </div>
     {!loading? <div class="relative overflow-x-auto">
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
                Activate For Banner
              </th>
              <th scope="col" class="px-6 py-3">
                Activated
              </th>
              <th scope="col" class="px-6 py-3">
                Add Registration Form
              </th>
              <th scope="col" class="px-6 py-3">
                Delete Event
              </th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((el) => {
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
                      value={updationEventData[el._id]?.name}
                      placeholder={el.name}
                      className="bg-transparent"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? {
                                ...prev[el._id],
                                name: eel.currentTarget?.value,
                              }
                            : { name: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </th>
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      value={updationEventData[el._id]?.day}
                      placeholder={el.day}
                      className="bg-transparent"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? { ...prev[el._id], day: eel.currentTarget?.value }
                            : { day: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </td>
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      value={updationEventData[el._id]?.time}
                      placeholder={el.time}
                      className="bg-transparent"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? {
                                ...prev[el._id],
                                time: eel.currentTarget?.value,
                              }
                            : { time: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </td>
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      value={updationEventData[el._id]?.address}
                      placeholder={el.address}
                      className="bg-transparent"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? {
                                ...prev[el._id],
                                address: eel.currentTarget?.value,
                              }
                            : { address: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </td>
                  <td class="px-6 py-4 /line-clamp-1">
                    <input
                      type="text"
                      value={updationEventData[el._id]?.description}
                      placeholder={el.description}
                      className="bg-transparent"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? {
                                ...prev[el._id],
                                description: eel.currentTarget?.value,
                              }
                            : { description: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </td>
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      value={updationEventData[el._id]?.type}
                      placeholder={el.type}
                      className="bg-transparent w-[5rem]"
                      onChange={(eel) => {
                        setupdationEventData((prev = {}) => {
                          prev[el._id] = prev[el._id]
                            ? {
                                ...prev[el._id],
                                type: eel.currentTarget?.value,
                              }
                            : { type: eel.currentTarget?.value };
                          return prev;
                        });
                      }}
                    />
                  </td>
                  <td
                    class={`px-6 py-4  cursor-pointer ${
                      el.ActivatedForCarousel
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                    onClick={async () => {
                      var { data: axres } = await axios.post(
                        "/api/eventsCrud",
                        { type: "bannerActive", id: el._id }
                      );
                      await refreshData();
                      if (!axres.status) {
                        toast.error(axres.message);
                      }
                    }}
                  >
                    {el.ActivatedForCarousel ? "Activated" : "DeActivated"}
                  </td>
                  <td
                    class={`px-6 py-4  cursor-pointer ${
                      el.Activated ? "text-green-600" : "text-red-600"
                    }`}
                    onClick={async () => {
                      var { data: axres } = await axios.post(
                        "/api/eventsCrud",
                        { type: "activation", id: el._id }
                      );
                      await refreshData();
                      if (!axres.status) {
                        toast.error(axres.message);
                      }
                    }}
                  >
                    {el.Activated ? "Activated" : "DeActivated"}
                  </td>
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
      </div> :  <div  className="flex justify-center items-center h-[50vh]">Loading</div>}
    </div>
  );
};

export default Page;
