import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setLoader }) {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login text-center mt-4">
      <h6>Login into your Attentendance portal.</h6>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          setLoader(true);

          const user = {
            rollno: e.target[0].value,
          };

          fetch(process.env.REACT_APP_SERVER + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((res) => {
              setLoader(false);
              setMsg(res.message);
              if (res.message === 1) {
                navigate("/user/" + user.rollno);
              }
            })
            .catch((err) => {
              setMsg("Some Error Occured");
              setLoader(false);
            });
        }}
      >
        <input
          type="number"
          placeholder="Enter University Roll No."
          min="2000000"
          required
        />
        <br />
        <button className="mt-2 btn btn-sm btn-primary">Login</button>

        {msg ? (
          <div className="mt-4">
            <span className="alert alert-danger">{msg}</span>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Login;
