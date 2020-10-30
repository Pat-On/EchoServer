import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const serverUrl = "http://localhost:3001";

export default function withSockets(props) {
  return (Component) => () => {
    const [socketData, setSocketData] = useState("");

    useEffect(() => {
      const socket = socketIOClient(serverUrl);
      socket.on("welcomeEvent", (data) => {
        setSocketData(data);
      });
      socket.on("broadcastEvent", (data) => {
        setSocketData(data);
      });
      // CLEAN UP THE EFFECT
      return () => socket.disconnect();
    }, []);
    return <Component socketData={socketData}></Component>;
  };
}
