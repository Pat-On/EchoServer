import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export default function withSockets(props) {
  return (Component) => () => {
    const [socketDataArray, setSocketDataArray] = useState([]);

    useEffect(() => {
      const serverUrl = window.location.origin;
      console.log(`serverUrl: ${serverUrl}`);
      const socket = socketIOClient(serverUrl);
      socket.on("welcomeEvent", (data) => {
        console.log(data);
      });
      socket.on("broadcastEvent", (data) => {
        setSocketDataArray((prevData) => [...prevData, data]);
      });
      // CLEAN UP THE EFFECT
      return () => socket.disconnect();
    }, []);

    return <Component socketDataArray={socketDataArray}></Component>;
  };
}
