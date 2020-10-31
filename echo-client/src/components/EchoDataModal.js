import React from "react";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from "react-json-pretty/dist/monikai";

import "../styles/EchoDataModal.css";

const Modal = ({ handleClose, show, currentEchoData, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  function renderModalData() {
    return (
      <div>
        <JSONPretty
          id="json-pretty"
          data={currentEchoData}
          theme={JSONPrettyMon}
        ></JSONPretty>
      </div>
    );
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {console.log(currentEchoData)}
        {Object.keys(currentEchoData).length > 0 ? renderModalData() : null}
        <button class="btn btn-light" onClick={handleClose}>
          close
        </button>
      </section>
    </div>
  );
};

export default Modal;
