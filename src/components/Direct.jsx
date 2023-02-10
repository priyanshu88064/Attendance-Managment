import React, { useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import App from "./App";
import Home from "./Home";
import Loading from "./Loading";

function Direct() {
  const [loader, setLoader] = useState(false);
  const nodeRef = useRef(null);
  const loadRef = useRef(null);

  return (
    <BrowserRouter>
      {loader === true ? (
        <CSSTransition
          in={loader}
          appear={true}
          timeout={250}
          classNames="load-ani"
          nodeRef={loadRef}
        >
          <Loading innerRef={loadRef} />
        </CSSTransition>
      ) : (
        ""
      )}
      <CSSTransition
        nodeRef={nodeRef}
        in={true}
        appear={true}
        timeout={300}
        classNames="rel"
      >
        <div ref={nodeRef}>
          <Routes>
            <Route path="/" element={<Home setLoader={setLoader} />} />
            <Route
              path="/user/:rollno"
              element={<App setLoader={setLoader} />}
            />
          </Routes>
        </div>
      </CSSTransition>
    </BrowserRouter>
  );
}

export default Direct;
