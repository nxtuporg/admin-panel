"use client";

import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const Register = () => {
  // var router = useRouter();
  // var params = useParams();
  var searchParams = useSearchParams();
  useEffect(() => {
    // var paramss = params.event;
    var eventid = searchParams.get("id");
    console.log(eventid);
    //for the api part
    // var {data:axres} = axios.post("/api/login",{name:"",pass:""})
  }, []);

  const [alluserComponents, setalluserComponents] = useState([]);
  return (
    <div className="flex justify-center ">
      <div className="p-[1rem]">
        <h3
          className="px-[1rem] font-bold text-3xl"
          style={{ fontFamily: "Outfit" }}
        >
          Registration form
        </h3>
        <div className="p-[1rem] flex flex-col gap-[0.5rem]">
          <h3>Your Event Name</h3>
          <input
            type="text"
            name="eventTitle"
            className="w-[26rem] text-black px-[1rem] py-[0.5rem] rounded-md"
            placeholder="Damru"
          />
        </div>
        <div className="p-[1rem] flex flex-col gap-[0.5rem]">
          <h3>Event description</h3>
          <input
            type="text"
            name="eventDesc"
            className="w-[26rem] px-[1rem] py-[0.5rem] rounded-md text-black"
            placeholder="NST-RU cultural fest"
          />
        </div>

        <div className="p-[1rem]">
          <h3 className="pb-[1rem] font-semibold">Add inputs for user</h3>
          <div
            className={`/px-[1rem] ${
              alluserComponents[0] ? "mb-[1.5rem]" : ""
            } flex flex-col gap-[0.8rem]`}
          >
            {alluserComponents.map((el) => {
              if (el.type == "Text") {
                return (
                  <>
                  <div className="flex flex-col gap-[0.5rem] py-[0.5rem]">
                    {/* <h3
                      contentEditable
                      className="w-[26rem] outline-none focus:border-white focus:outline-[1px] focus:outline-solid focus:outline-white pr-[0.5rem] rounded-sm"
                    >
                      {el?.inputName}
                    </h3> */}
                    <input
                      type="text"
                      placeholder={el?.inputName}
                      className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-black"
                    />
                    <input
                      type="text"
                      placeholder={el?.placeholder}
                      className="py-[0.5rem] px-[1rem] text-black w-[26rem] rounded-md"
                    />
                  </div>
                  </>
                );
              } else if (el.type == "Radio") {
                return (
                  <>
                  <div className="flex flex-col gap-[0.5rem]">
                    {/* <h3
                      contentEditable
                      className="w-[26rem] outline-none focus:border-white focus:outline-[1px] focus:outline-solid focus:outline-white pr-[0.5rem] rounded-sm"
                    >
                      {el?.inputName}
                    </h3> */}

                    <input
                      type="text"
                      placeholder={el?.inputName}
                      className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-black"
                    />
                    <div className="flex gap-[0.5rem]">
                      <textarea
                        type="text"
                        className=" text-black  rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                        placeholder="Radio button values (',' seperated values)"
                      />
                    </div>
                  </div>
                  </>
                );
              } else if (el.type == "Select") {
                return (
                  <>
                  <div className="flex flex-col gap-[0.5rem]">
                    <input
                      type="text"
                      placeholder={el?.inputName}
                      className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-black"
                    />
                    <div className="flex gap-[0.5rem]">
                      <textarea
                        type="text"
                        className=" text-black  rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                        placeholder="Select option values (',' seperated values)"
                      />
                    </div>
                  </div>
                  </>
                );
              } else if (el.type == "Checkbox") {
                return (
                  <>
                  <div className="flex flex-col gap-[0.5rem]">
                    <input
                      type="text"
                      placeholder={el?.inputName}
                      className="/py-[0.5rem] /px-[1rem] pl-[0.2rem] text-white w-[26rem] rounded-md bg-black"
                    />
                    <div className="flex gap-[0.5rem]">
                      <textarea
                        type="text"
                        className="text-black rounded-md w-[26rem] px-[1rem] py-[0.5rem]"
                        placeholder="Checkbox option values (',' seperated values)"
                      />
                    </div>
                  </div>
                  </>
                );
              }
            })}
          </div>
          <button
            onClick={(el) => {
              if (el.currentTarget.nextElementSibling.style.opacity == 1) {
                el.currentTarget.nextElementSibling.nextElementSibling.style.height =
                  "0px";
                el.currentTarget.nextElementSibling.style.opacity = 0;
              } else {
                el.currentTarget.nextElementSibling.nextElementSibling.style.height =
                  "222.6px";
                el.currentTarget.nextElementSibling.style.opacity = 1;
              }
            }}
            className="px-[1rem] py-[0.8rem] bg-slate-900 w-[26rem] rounded-tl-md rounded-tr-md cursor-pointer "
          >
            + Add input
          </button>
          <div className="w-[26rem] opacity-0 transition-all duration-200 h-[2px] bg-slate-800" />
          <div className="flex flex-col gap-[0.5rem] h-0 overflow-hidden bg-slate-900 w-[26rem] rounded-bl-md rounded-br-md transition-all duration-300">
            {[
              {
                type: "Text",
                inputName: "Example Text input title (Editable)",
                placeholder: "Text Placeholder (Editable)",
                currentId: Math.random() * 99999,
              },
              {
                type: "Radio",
                inputName: "Example Radio input title (Editable)",
                currentId: Math.random() * 99999,
              },
              {
                type: "Select",
                inputName: "Example Select input title (Editable)",
                currentId: Math.random() * 99999,
              },
              {
                type: "Checkbox",
                inputName: "Example Checkbox input title (Editable)",
                currentId: Math.random() * 99999,
              },
            ].map((el) => (
              <div
                key={Math.floor(Math.random() * 999) + el.type}
                onClick={() => {
                  setalluserComponents((prev) => [...prev, { ...el }]);
                }}
                className="text-center py-[0.8rem] px-[1rem] hover:bg-slate-800 transition-all duration-200 cursor-pointer"
              >
                {el.type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
