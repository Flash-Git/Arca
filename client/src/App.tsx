import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBoxOpen,
  faExclamationCircle,
  faTimesCircle,
  faInfoCircle,
  faAt,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faTwitter,
  faEthereum,
  faBitcoin
} from "@fortawesome/free-brands-svg-icons";

import Alerts from "./components/layout/Alerts";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/layout/Footer";

import AlertState from "./context/alert/AlertState";
import AppState from "./context/app/AppState";
import UserState from "./context/user/UserState";
import PartnerState from "./context/partner/PartnerState";
import Web3State from "./context/web3/Web3State";

import setAuthToken from "./utils/setAuthToken";

import "./App.css";

library.add(
  faBoxOpen,
  faExclamationCircle,
  faTimesCircle,
  faInfoCircle,
  faAt,
  faBars,
  faGithub,
  faTwitter,
  faEthereum,
  faBitcoin
);

localStorage.token && setAuthToken(localStorage.token);

const App: FC = () => (
  <AlertState>
    <AppState>
      <UserState>
        <PartnerState>
          <Web3State>
            <Router>
              <Navbar />
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </Router>
          </Web3State>
        </PartnerState>
      </UserState>
    </AppState>
  </AlertState>
);

export default App;
