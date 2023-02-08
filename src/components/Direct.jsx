import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Home";

function Direct() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:rollno" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Direct;
