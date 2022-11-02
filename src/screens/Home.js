import React, { useEffect, useState } from "react";
import userApi from "../api/userApi";

const Home = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const data = await userApi.dashboard();
        setText(data);
        console.log({ data });
      } catch (error) {
        console.log("Failed to load api: ", error);
      }
    })();
  }, []);
  return <div>{text.status === true ? text.message : "Home"}</div>;
};

export default Home;
