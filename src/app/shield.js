"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shield = ({ children }) => {
  const [authtoken, setauthtoken] = useState("");
  const [canallow, setcanallow] = useState(<></>);
  var pathname = usePathname();
  var router = useRouter();
  useEffect(() => {
    if (getCookie("token")) {
      setauthtoken(getCookie("token"));
    }
  }, [pathname]);
  var compToInit = <div>{children}</div>;
  useEffect(() => {
    if (!getCookie("token")) {
      if (pathname != "/login") {
        setcanallow(<></>);
        router.push("/login");
      } else {
        setcanallow(compToInit);
      }
    } else {
      setcanallow(compToInit);
    }
  }, [pathname, authtoken]);

  //   console.log("->", pathname);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        limit={3}
        stacked={true}
      />
      <div>{canallow}</div>
    </>
  );
};

export default Shield;
