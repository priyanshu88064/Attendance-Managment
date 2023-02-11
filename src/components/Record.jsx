import React, { useState } from "react";

const subjects = [
  "compilerDesign",
  "compilerDesignLab",
  "computerNetwork",
  "fullStack",
  "fullStackLab",
  "elective",
  "careerSkill",
  "careerSkillLab",
  "softwareEngLab",
];

const up = <i className="bi bi-arrow-up"></i>;
const down = <i className="bi bi-arrow-down"></i>;

function Record({
  attendance,
  setAttendance,
  totAttend,
  delta,
  rollno,
  setLoader,
}) {
  const [errorMsg, setErrorMsg] = useState({ msg: "", ssub: "" });

  const col = subjects.map((sub, ind) => {
    return (
      <tr key={ind}>
        <td>
          {sub
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .charAt(0)
            .toUpperCase() + sub.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1)}
        </td>
        <td>{attendance[ind]}</td>
        <td>{totAttend[ind]}</td>
        <td
          style={{
            color: delta[ind] < 0 ? "red" : "darkgreen",
            whiteSpace: "nowrap",
          }}
        >
          {delta[ind] > 0 ? "+" : ""}
          {delta[ind]}
          {delta[ind] > 0 ? up : ""}
          {delta[ind] < 0 ? down : ""}
        </td>
        <td
          style={{
            color:
              (attendance[ind] / totAttend[ind]) * 100 >= 75.0
                ? "darkgreen"
                : "red",
          }}
        >
          {((attendance[ind] / totAttend[ind]) * 100).toPrecision(3)}%
        </td>
        <td>
          <input
            type="date"
            onChange={(e) => {
              setLoader(true);
              fetch(process.env.REACT_APP_SERVER + "/userSubmit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ date: e.target.value, sub, rollno }),
              })
                .then((res) => res.json())
                .then((res) => {
                  setLoader(false);
                  if (res.status === 1) {
                    window.location.reload();
                  } else {
                    setErrorMsg((prev) => ({ msg: res.status, ssub: sub }));
                  }
                })
                .catch((err) => {
                  setLoader(false);
                  setErrorMsg((prev) => ({
                    msg: "Some Error Occured",
                    ssub: sub,
                  }));
                });
            }}
          />
          {errorMsg.ssub === sub ? (
            <div className="submitError">{errorMsg.msg}</div>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="record mt-5">
      <table className="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Attended</th>
            <th>Total</th>
            <th>Delta</th>
            <th>%</th>
            <th>Submit</th>
          </tr>
        </thead>

        <tbody>{col}</tbody>
      </table>
    </div>
  );
}

export default Record;
