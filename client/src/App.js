import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

import Alerts from "./components/layout/Alerts";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

import AlertState from "./context/alert/AlertState";
import TradeState from "./context/trade/TradeState";
import UserState from "./context/user/UserState";

import setAuthToken from "./utils/setAuthToken.js";

import "./App.css";

library.add(faBoxOpen);

localStorage.token && setAuthToken(localStorage.token);

const App = () => (
  <TradeState>
    <UserState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <Sidebar />
            <div className="container">
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </UserState>
  </TradeState>
);

export default App;
