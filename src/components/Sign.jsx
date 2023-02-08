import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sign() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const user = {
          rollno: e.target[0].value,
          section: e.target[1][e.target[1].selectedIndex].text,
        };

        fetch(process.env.REACT_APP_SERVER + "/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((res) => {
            setMsg(res.message);
            if (res.message === 1) {
              navigate("/user/" + user.rollno);
            }
          })
          .catch((err) => {
            setMsg("Some Error Occured");
          });
      }}
    >
      <div className="sign text-center mt-4">
        <h6>Create a New Unofficial Erp Account.</h6>
        <input
          type="number"
          placeholder="Enter University Roll No."
          min="2000000"
          required
        />
        <br />
        <label htmlFor="section">Select your section:&nbsp;&nbsp;&nbsp;</label>
        <select className="mt-2" required id="section" defaultValue="I">
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
          <option>E</option>
          <option>F</option>
          <option>G</option>
          <option>H</option>
          <option>I</option>
          <option>J</option>
          <option>K</option>
          <option>L</option>
          <option>M</option>
          <option>N</option>
        </select>
        <br />
        <button className=" mt-2 btn btn-sm btn-primary">Create Account</button>
        <br />

        {msg ? (
          <div className="mt-4">
            <span className="alert alert-danger">{msg}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default Sign;
