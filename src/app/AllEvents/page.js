"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [allEvents, setallEvents] = useState([]);
  useEffect(() => {
    (async () => {
      var { data: axres } = await axios.get("/api/events");
      if (axres.status) {
        toast.success(axres.message);
      } else {
        toast.error(axres.message);
      }
    })();
  }, []);

  return <></>;
};

export default page;
