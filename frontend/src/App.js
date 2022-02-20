import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Landing from "./components/pages/Landing";
import Results from "./components/pages/Results";
import EnterInfo from "./components/pages/EnterInfo";
import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verified", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();

      parseResponse === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <div className="body-wrap">
      <Router>
        <Layout>
          <Switch>
            <Route
              exact
              path={"/login"}
              render={(props) =>
                !isAuthenticated ? (
                  <EnterInfo {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/results" />
                )
              }
            />
            <Route
              exact
              path={"/register"}
              render={(props) =>
                !isAuthenticated ? (
                  <EnterInfo {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/results" />
                )
              }
            />
            <Route
              exact
              path={"/results"}
              render={(props) =>
                isAuthenticated ? (
                  <Results {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path={"/"}
              render={(props) =>
                !isAuthenticated ? (
                  <Landing {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/results" />
                )
              }
            />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
