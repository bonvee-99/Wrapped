import React from "react";
import "./Body.css";

const Body = () => {
  return (
    <>
      <header className="bg">
        <div className="bg-container">
          <h1>UBC Wrapped for You</h1>
          <h2>See how the grindset paid off</h2>
          <h3>Explore your grades now.</h3>
          <a href="/login" class="myButton">
            Login
          </a>
          <a href="/register" class="myButton">
            Register
          </a>
        </div>
      </header>
    </>
  );
};

export default Body;
