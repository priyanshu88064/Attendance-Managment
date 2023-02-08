import React, { useEffect, useState } from "react";
import Header from "./Header";
import Performance from "./Performance";
import QuickData from "./QuickData";
import Record from "./Record";
import { useParams } from "react-router-dom";

function App() {
  const { rollno } = useParams();
  const [access, setAccess] = useState(0);
  const [required, setRequired] = useState(0);
  const [attendance, setAttendance] = useState([]);
  const [delta, setDelta] = useState([]);
  const [status, setStatus] = useState("");
  const [totAttend, setTotAttend] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);
  const [section, setSection] = useState("");

  const error = (
    <div
      className="text-center"
      style={{ color: "red", fontSize: "18px", border: "2px solid red" }}
    >
      {status}
    </div>
  );

  useEffect(() => {
    fetch(process.env.RECORD + rollno)
      .then((res) => res.json())
      .then((res) => {
        setStatus(res.status);
        if (res.status === 1) {
          setAccess(res.access);
          setRequired(res.required);
          setAttendance(res.attendance);
          setDelta(res.delta);
          setTotAttend(res.totAttend);
          setTotalClasses(res.totalClasses);
          setSection(res.section);
        }
      });
  }, [rollno]);

  console.log(status);

  return (
    <div className="main">
      <Header rollno={rollno} />
      {status !== 1 ? error : ""}
      <div className="secI">Section-{section}</div>
      <QuickData
        totalAttendance={totalClasses}
        access={access}
        required={required}
      />
      <Record
        attendance={attendance}
        setAttendance={setAttendance}
        totAttend={totAttend}
        delta={delta}
        rollno={rollno}
      />
      <Performance totalClasses={totalClasses} />
    </div>
  );
}

export default App;
