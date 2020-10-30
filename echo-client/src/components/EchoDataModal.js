import React from "react";

import "../styles/EchoDataModal.css";

const Modal = ({ handleClose, show, currentEchoData, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  function syntaxHighlight(json) {
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  }

  function createJsonMarkup(json) {
    const jsonStr = syntaxHighlight(JSON.stringify(json, null, 2));
    return jsonStr;
    // return {
    //   __html: jsonStr,
    // };
  }

  function renderModalData() {
    return (
      <div>
        <pre>{createJsonMarkup(currentEchoData)}</pre>
      </div>
    );
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {console.log(currentEchoData)}
        {Object.keys(currentEchoData).length > 0 ? renderModalData() : null}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default Modal;
