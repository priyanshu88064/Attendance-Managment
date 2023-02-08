import React from "react";
import Login from "./Login";
import Sign from "./Sign";

function Home() {
  return (
    <div className="home">
      <div className="bg-secondary text-center display-6 p-1">
        UNOFFICIAL ERP
      </div>
      <Login />
      <h3 className="text-center mt-4">OR</h3>
      <Sign />
    </div>
  );
}

export default Home;
