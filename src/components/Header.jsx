import React from "react";

function Header({ rollno }) {
  return (
    <div className="header">
      <span className="name">{rollno}</span>
      <i className="bi bi-list list" />
    </div>
  );
}

export default Header;
