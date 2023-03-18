import React from "react";

const yesno = (
  <div>
    <span>
      <i className="bi bi-x-square" style={{ color: "red" }}></i>
      <span style={{ marginLeft: "10px", fontSize: "12px" }}>Remove</span>
    </span>
  </div>
);

function Details({ setPop, sub, totalArray, dates, subjects }) {
  const row =
    totalArray &&
    totalArray[sub] &&
    totalArray[sub].map((eachDate, ind) => {
      return (
        <tr key={ind}>
          <td>{eachDate}</td>
          <td
            className={
              dates[[...subjects].indexOf(sub)]["green"].indexOf(eachDate) ===
              -1
                ? "dered"
                : "degreen"
            }
          >
            {dates[[...subjects].indexOf(sub)]["green"].indexOf(eachDate) === -1
              ? "Absent"
              : "Present"}
          </td>
          <td>{yesno}</td>
        </tr>
      );
    });

  return (
    <div className="details" id="t2">
      <div className="sub">
        <span className="">
          {sub
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .charAt(0)
            .toUpperCase() + sub.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1)}
        </span>
        <span
          className="cut"
          onClick={() => {
            setPop((pop) => !pop);
          }}
        >
          <i className="bi bi-x-square-fill"></i>
        </span>
      </div>
      <div className="block">
        <table className="table">
          <thead>
            <tr>
              <th>Date (YY/MM/DD)</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Details;
