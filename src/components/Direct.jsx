import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Loading from "./Loading";

function Direct() {
  const [loader, setLoader] = useState(false);

  return (
    <BrowserRouter>
      {loader === true ? <Loading /> : ""}
      <Routes>
        <Route path="/" element={<Home setLoader={setLoader} />} />
        <Route path="/user/:rollno" element={<App setLoader={setLoader} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Direct;
