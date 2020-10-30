import React from "react";
import withSockets from "../HOCs/withSockets";

function EchoTable({ socketData }) {
  return (
    <div>
      <h1>Echo Table</h1>
      <time dateTime={socketData}>
        {socketData} <b>YO</b>
      </time>
    </div>
  );
}

export default withSockets()(EchoTable);
