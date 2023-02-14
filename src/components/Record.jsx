import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  dates,
}) {
  const [errorMsg, setErrorMsg] = useState({ msg: "", ssub: "" });
  const [startDate, setStartDate] = useState(new Date());

  const col = subjects.map((sub, ind) => {
    var dateColor = [];

    if (dates[ind] && dates[ind]["green"] && dates[ind]["red"]) {
      dateColor = [
        {
          "react-datepicker__day--highlighted-custom-1": dates[ind][
            "green"
          ].map((d) => {
            return new Date(d);
          }),
        },
        {
          "react-datepicker__day--highlighted-custom-2": dates[ind]["red"].map(
            (d) => {
              return new Date(d);
            }
          ),
        },
      ];
    }
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
          <DatePicker
            onChange={(date) => {
              setStartDate(date);

              const mth =
                (date.getMonth() + 1).toString().length <= 1
                  ? "0" + (date.getMonth() + 1)
                  : "" + (date.getMonth() + 1);
              const dt =
                date.getDate().toString().length <= 1
                  ? "0" + date.getDate()
                  : "" + date.getDate();

              var dateStr = "";
              dateStr = dateStr + date.getFullYear() + "-" + mth + "-" + dt;

              setLoader(true);
              fetch(process.env.REACT_APP_SERVER + "/userSubmit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ date: dateStr, sub, rollno }),
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
            renderInput={(params) => console.log(params)}
            selected={startDate}
            withPortal
            showMonthDropdown
            highlightDates={dateColor}
            className="dat"
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
