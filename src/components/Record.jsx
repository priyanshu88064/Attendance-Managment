import React, { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Details from "./Details";
import { CSSTransition } from "react-transition-group";

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
  recent,
  totalArray,
}) {
  const [errorMsg, setErrorMsg] = useState({ msg: "", ssub: "" });
  const [startDate, setStartDate] = useState(new Date());
  const [pop, setPop] = useState(false);
  const [sub, setSub] = useState("");
  const nodeRef = useRef(null);
  const nodeRef1 = useRef(null);

  const CusInput = forwardRef(({ value, onClick }, ref) => (
    <button className="dat" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

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

    const MyContainer = ({ className, children }) => {
      return (
        <div>
          <CalendarContainer className={className}>
            <div className="cal-sub">
              {sub
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .charAt(0)
                .toUpperCase() +
                sub.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1)}
            </div>
            <div style={{ position: "relative" }}>{children}</div>
          </CalendarContainer>
        </div>
      );
    };

    return (
      <tr key={ind}>
        <td className="c12">
          <span
            onClick={() => {
              // document.getElementById("t1").style.right = "100%";
              setSub(sub);
              setPop((pop) => !pop);
            }}
          >
            {sub
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .charAt(0)
              .toUpperCase() + sub.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1)}
            {recent === sub ? (
              <sup className="lastupdated">Recent Class</sup>
            ) : (
              ""
            )}
          </span>
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
                    msg: "Cannot connect with server.",
                    ssub: sub,
                  }));
                });
            }}
            renderInput={(params) => console.log(params)}
            selected={startDate}
            withPortal
            showMonthDropdown
            highlightDates={dateColor}
            customInput={<CusInput />}
            calendarContainer={MyContainer}
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
    <div className="record mt-5" id="r5">
      <CSSTransition
        in={pop}
        nodeRef={nodeRef}
        timeout={500}
        classNames="detailpanel"
        unmountOnExit
      >
        <div className="c11" ref={nodeRef}>
          <Details
            setPop={setPop}
            sub={sub}
            totalArray={totalArray}
            dates={dates}
            subjects={subjects}
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={!pop}
        nodeRef={nodeRef1}
        timeout={500}
        classNames="tablepanel"
        unmountOnExit
        onExit={() => {
          document.getElementById("r5").scrollTop = 0;
        }}
      >
        <table className="table" id="t1" ref={nodeRef1}>
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
      </CSSTransition>
    </div>
  );
}

export default Record;
