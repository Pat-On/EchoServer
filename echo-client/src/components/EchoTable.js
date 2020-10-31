import React, { useState } from "react";

import EchoDataModal from "./EchoDataModal";
import withSockets from "../HOCs/withSockets";
import "../styles/EchoTable.css";

function EchoTable({ socketDataArray }) {
  const [show, setShow] = useState(false);
  const [currentEchoData, setCurrentEchoData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function renderModal(echoData) {
    setCurrentEchoData(echoData);
    handleShow();
  }

  function sortDataArrayByTimestamp(socketDataArray) {
    return socketDataArray.sort((item1, item2) => {
      if (new Date(item1.timestamp) < new Date(item2.timestamp)) return 1;
      if (new Date(item1.timestamp) > new Date(item2.timestamp)) return -1;
      return 0;
    });
  }

  function createDataTable(jsonSocketDataArray) {
    const socketDataArray = jsonSocketDataArray.map(JSON.parse);
    const sockertArrayTimeSortedDesc = sortDataArrayByTimestamp(
      socketDataArray
    );
    return (
      <tbody>
        {sockertArrayTimeSortedDesc.map((echoData, i) => {
          return (
            <tr onClick={() => renderModal(echoData)}>
              <td>{sockertArrayTimeSortedDesc.length - i}</td>
              <td>{echoData.fullUrl}</td>
              <td>{echoData.timestamp}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  return (
    <div>
      <h1>Echo</h1>

      <EchoDataModal
        show={show}
        handleClose={handleClose}
        currentEchoData={currentEchoData}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Url</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        {createDataTable(socketDataArray)}
      </table>
    </div>
  );
}

export default withSockets()(EchoTable);
