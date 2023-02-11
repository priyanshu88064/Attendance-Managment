import React from "react";

function Performance({ totalClasses }) {
  const prof = [
    "Labour",
    "Bund Ki Factory",
    "Wipro",
    "Infosys",
    "Amazon",
    "MACHINE",
  ];

  var perf, color;

  if (totalClasses < 20) {
    color = "#ff0000";
    perf = prof[0];
  } else if (totalClasses < 40) {
    color = "#ffa700";
    perf = prof[1];
  } else if (totalClasses < 60) {
    color = "#fff400";
    perf = prof[2];
  } else if (totalClasses < 75) {
    color = "#a3ff00";
    perf = prof[3];
  } else if (totalClasses < 80) {
    color = "#2cba00";
    perf = prof[4];
  } else {
    color = "#2cba00";
    perf = prof[5];
  }

  return (
    <div className="perf mt-5 mb-5">
      <span>
        <button className="btn btn-primary">Performance</button>
      </span>
      <span>
        &nbsp;<i className="bi bi-arrow-right-circle-fill"></i>&nbsp;
      </span>
      <span>
        <button
          style={{ backgroundColor: color, color: "black" }}
          className="btn btn-danger"
        >
          {perf}
        </button>
      </span>
    </div>
  );
}

export default Performance;
