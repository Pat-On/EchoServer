import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export default function withSockets(props) {
  return (Component) => () => {
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
      const serverUrl = window.location.origin;
      console.log(`serverUrl: ${serverUrl}`);
      const socket = socketIOClient(serverUrl);
      socket.on("welcomeEvent", (data) => {
        console.log(data);
      });
      socket.on("broadcastEvent", (data) => {
        setDataArray((prevData) => [...prevData, JSON.parse(data)]);
      });
      // CLEAN UP THE EFFECT
      return () => socket.disconnect();
    }, []);

    return (
      <Component dataArray={dataArray} setDataArray={setDataArray}></Component>
    );
  };
}
