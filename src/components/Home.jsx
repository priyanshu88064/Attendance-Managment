import React from "react";
import Login from "./Login";
import Sign from "./Sign";

function Home({ loader, setLoader }) {
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
