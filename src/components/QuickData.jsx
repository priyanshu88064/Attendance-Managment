import React from "react";

function QuickData({ totalAttendance, access, required }) {
  return (
    <div className="quickdata mt-5">
      <div className="totalper">
        <span
          className="per"
          style={{ border: "3px solid green", fontSize: "17px" }}
        >
          {totalAttendance}%
        </span>
        <div>Total Attendance</div>
      </div>
      <hr />
      <div className="reqclasses mt-3">
        <span className="per" style={{ border: "3px solid green" }}>
          {access}
        </span>
        <div>You can skip {access} classes.</div>
      </div>
      <hr />
      <div className="reqclasses mt-3">
        <span className="per" style={{ border: "3px solid red" }}>
          {required}
        </span>
        <div>You have to attend {required} more classes.</div>
        <hr />
      </div>
    </div>
  );
}

export default QuickData;
