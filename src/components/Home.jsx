import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Sign from "./Sign";

function Home({ loader, setLoader }) {
  const [rollno, setRollno] = useState(
    localStorage.getItem("rollno") ? localStorage.getItem("rollno") : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (rollno) {
      navigate("/user/" + rollno);
    }
  }, [rollno]);

  return (
    <div className="home">
      <div className="header">
        <span className="name" style={{ margin: "auto" }}>
          Unofficial ERP
        </span>
      </div>
      <Login setLoader={setLoader} />
      <h3 className="text-center mt-4">OR</h3>
      <Sign setLoader={setLoader} />
    </div>
  );
}

export default Home;
