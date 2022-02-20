import React from "react";
import "./EnterForm.css";
import { useState } from "react";

const EnterForm = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <body>
        <div class="enterform">
          <form onSubmit={onSubmitForm}>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={onChange}
            />
            <button>Submit</button>
          </form>
        </div>
        <div class="enterform">
          <a href="/Results" class="otherButton">
            See How You Match Up
          </a>
        </div>
      </body>
    </>
  );
};

export default EnterForm;
