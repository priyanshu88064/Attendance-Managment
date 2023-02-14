import React from "react";
import { useNavigate } from "react-router";

function Header({ rollno }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <i className="bi bi-list list" />
      <span className="name">{rollno}</span>
      <i
        className="bi bi-box-arrow-right"
        onClick={() => {
          navigate("/");
        }}
      ></i>
    </div>
  );
}

export default Header;
