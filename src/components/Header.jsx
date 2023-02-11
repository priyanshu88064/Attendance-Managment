import React from "react";

function Header({ rollno }) {
  return (
    <div className="header">
      <i className="bi bi-list list" />
      <span className="name">{rollno}</span>
      <i class="bi bi-box-arrow-right"></i>
    </div>
  );
}

export default Header;
