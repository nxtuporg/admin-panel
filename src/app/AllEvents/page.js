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
  //   console.log(allEvents);
  const getAllEvents = async () => {
    try {
      setLoading(true);
      var { data: axres } = await axios.get("/api/events");
      if (axres.status) {
        setallEvents(axres.events.reverse());
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
    try {
      const updatedEvents = Object.entries(updationEventData).map(
        ([id, data]) => ({
          id,
          ...data,
        })
      );
      const { data: axres } = await axios.put("/api/events", {
        events: updatedEvents,
      });
      if (axres.status) {
        toast.success(axres.message);
        setupdationEventData({}); // Clear the updates after successful sync
      } else {
        toast.error(axres.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className=" p-[2rem]">
      <div className="flex justify-between items-center mb-[1rem]">
        <h3
          className="text-[2rem] font-semibold mb-[1rem]"
          style={{ fontFamily: "outfit" }}
        >
          All Events
        </h3>
        <button
          onClick={UpdateEventDetailsfunc}
          className="px-[1rem] py-[0.8rem] bg-slate-900 text-white w-[10rem] rounded-md cursor-pointer mt-[1rem]"
        >
          Sync
        </button>
      </div>
      {!loading ? (
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Events
                </th>
                <th scope="col" class="px-4 py-3">
                  Day
                </th>
                <th scope="col" class="px-4 py-3">
                  Time
                </th>
                <th scope="col" class="px-4 py-3">
                  address
                </th>
                <th scope="col" class="px-4 py-3">
                  description
                </th>
                <th scope="col" class="px-4 py-3">
                  type
                </th>
                <th scope="col" class="px-4 py-3">
                  Activate For Banner
                </th>
                <th scope="col" class="px-4 py-3">
                  Activated
                </th>
                <th scope="col" class="px-4 py-3">
                  Registration Form
                </th>
                <th scope="col" class="px-4 py-3">
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
                      class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <input
                        type="text"
                        // value={updationEventData[el._id]?.name}
                        className="bg-transparent"
                        // placeholder={el.name}
                        value={el.name}
                        onChange={(eel) => {
                          setupdationEventData((prev) => ({
                            ...prev,
                            [el._id]: {
                              ...(prev[el._id] || {}),
                              name: eel.target?.value,
                            },
                          }));
                          setallEvents((prev) =>
                            prev.map((event) =>
                              event._id === el._id
                                ? { ...event, name: eel.target?.value }
                                : event
                            )
                          );
                        }}

                        // onChange={(eel) => {
                        //   setupdationEventData((prev = {}) => {
                        //     prev[el._id] = prev[el._id]
                        //       ? {
                        //           ...prev[el._id],
                        //           name: eel.target?.value,
                        //         }
                        //       : { name: eel.target?.value };
                        //     return prev;
                        //   });
                        // }}
                      />
                    </th>
                    <td class="px-4 py-4">
                      <input
                        type="text"
                        // value={updationEventData[el._id]?.day}
                        // placeholder={el.day}
                        className="bg-transparent w-[5rem]"
                        // onChange={(eel) => {
                        //   setupdationEventData((prev = {}) => {
                        //     prev[el._id] = prev[el._id]
                        //       ? {
                        //           ...prev[el._id],
                        //           day: eel.target?.value,
                        //         }
                        //       : { day: eel.target?.value };
                        //     return prev;
                        //   });
                        // }}
                        value={el.day}
                        onChange={(eel) => {
                          setupdationEventData((prev) => ({
                            ...prev,
                            [el._id]: {
                              ...(prev[el._id] || {}),
                              day: eel.target?.value,
                            },
                          }));
                          setallEvents((prev) =>
                            prev.map((event) =>
                              event._id === el._id
                                ? { ...event, day: eel.target?.value }
                                : event
                            )
                          );
                        }}
                      />
                    </td>
                    <td class="px-4 py-4">
                      <input
                        type="text"
                        // value={updationEventData[el._id]?.time}
                        // placeholder={el.time}
                        className="bg-transparent w-[3rem]"
                        // onChange={(eel) => {
                        //   setupdationEventData((prev = {}) => {
                        //     prev[el._id] = prev[el._id]
                        //       ? {
                        //           ...prev[el._id],
                        //           time: eel.target?.value,
                        //         }
                        //       : { time: eel.target?.value };
                        //     return prev;
                        //   });
                        // }}
                        value={el.time}
                        onChange={(eel) => {
                          setupdationEventData((prev) => ({
                            ...prev,
                            [el._id]: {
                              ...(prev[el._id] || {}),
                              time: eel.target?.value,
                            },
                          }));
                          setallEvents((prev) =>
                            prev.map((event) =>
                              event._id === el._id
                                ? { ...event, time: eel.target?.value }
                                : event
                            )
                          );
                        }}
                      />
                    </td>
                    <td class="px-4 py-4">
                      <input
                        type="text"
                        // value={updationEventData[el._id]?.address}
                        // placeholder={el.address}
                        className="bg-transparent"
                        // onChange={(eel) => {
                        //   setupdationEventData((prev = {}) => {
                        //     prev[el._id] = prev[el._id]
                        //       ? {
                        //           ...prev[el._id],
                        //           address: eel.target?.value,
                        //         }
                        //       : { address: eel.target?.value };
                        //     return prev;
                        //   });
                        // }}
                        value={el.address}
                        onChange={(eel) => {
                          setupdationEventData((prev) => ({
                            ...prev,
                            [el._id]: {
                              ...(prev[el._id] || {}),
                              address: eel.target?.value,
                            },
                          }));
                          setallEvents((prev) =>
                            prev.map((event) =>
                              event._id === el._id
                                ? { ...event, address: eel.target?.value }
                                : event
                            )
                          );
                        }}
                      />
                    </td>
                    <td class="px-4 py-4 /line-clamp-1">
                      <input
                        type="text"
                        // value={updationEventData[el._id]?.description}
                        // placeholder={el.description}
                        className="bg-transparent"
                        // onChange={(eel) => {
                        //   setupdationEventData((prev = {}) => {
                        //     prev[el._id] = prev[el._id]
                        //       ? {
                        //           ...prev[el._id],
                        //           description: eel.target?.value,
                        //         }
                        //       : { description: eel.target?.value };
                        //     return prev;
                        //   });
                        // }}
                        value={el.description}
                        onChange={(eel) => {
                          setupdationEventData((prev) => ({
                            ...prev,
                            [el._id]: {
                              ...(prev[el._id] || {}),
                              description: eel.target?.value,
                            },
                          }));
                          setallEvents((prev) =>
                            prev.map((event) =>
                              event._id === el._id
                                ? {
                                    ...event,
                                    description: eel.target?.value,
                                  }
                                : event
                            )
                          );
                        }}
                      />
                    </td>
                    <td class="px-4 py-4">
                      <input
                        type="text"
                        // value={updationEventData[el._id]?.type}
                        // placeholder={el.type}
                        className="bg-transparent w-[5rem]"
                        // onChange={(eel) => {
                        //   setupdationEventData((prev = {}) => {
                        //     prev[el._id] = prev[el._id]
                        //       ? {
                        //           ...prev[el._id],
                        //           type: eel.target?.value,
                        //         }
                        //       : { type: eel.target?.value };
                        //     return prev;
                        //   });
                        // }}
                        value={el.type}
                        onChange={(eel) => {
                          setupdationEventData((prev) => ({
                            ...prev,
                            [el._id]: {
                              ...(prev[el._id] || {}),
                              type: eel.target?.value,
                            },
                          }));
                          setallEvents((prev) =>
                            prev.map((event) =>
                              event._id === el._id
                                ? {
                                    ...event,
                                    type: eel.target?.value,
                                  }
                                : event
                            )
                          );
                        }}
                      />
                    </td>
                    <td
                      class={`px-4 py-4  cursor-pointer ${
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
                      <label class="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={el.ActivatedForCarousel}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {el.ActivatedForCarousel
                            ? "Activated"
                            : "DeActivated"}
                        </span>
                      </label>
                      {/* {el.ActivatedForCarousel ? "Activated" : "DeActivated"} */}
                    </td>
                    <td
                      class={`px-4 py-4  cursor-pointer ${
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
                      <label class="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={el.Activated}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {el.Activated ? "Activated" : "DeActivated"}
                        </span>
                      </label>
                      {/* {el.Activated ? "Activated" : "DeActivated"} */}
                    </td>
                    <td
                      class="px-4 py-4  cursor-pointer"
                      onClick={() => {
                        router.push(
                          `/events/Register?id=${el._id}&type=AllEvents`
                        );
                      }}
                    >
                      ➕
                    </td>
                    <td
                      class="px-4 py-4  cursor-pointer"
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
      ) : (
        <div
          role="status"
          className="h-[50vh] flex items-center justify-center"
        >
          <svg
            aria-hidden="true"
            class="w-[3rem] h-[3rem] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Page;
