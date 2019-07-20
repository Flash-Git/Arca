import React, { Fragment, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";

import Alerts from "./components/layout/Alerts";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

import AlertState from "./context/alert/AlertState";
import TradeState from "./context/trade/TradeState";
import UserState from "./context/user/UserState";

import setAuthToken from "./utils/setAuthToken.js";

import "./App.css";

library.add();

localStorage.token && setAuthToken(localStorage.token);

const App = () => (
  <TradeState>
    <UserState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
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
