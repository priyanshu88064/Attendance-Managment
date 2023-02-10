import React from "react";

function Loading({ innerRef }) {
  return (
    <div ref={innerRef} className="loadscreen">
      <div className="box">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loading;
