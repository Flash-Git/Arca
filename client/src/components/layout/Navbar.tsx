import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "../../context/app/AppContext";
import Web3Context from "../../context/web3/Web3Context";

import {
  AppContext as IAppContext,
  Web3Context as IWeb3Context
} from "context";

const Navbar: FC = () => {
  const appContext: IAppContext = useContext(AppContext);
  const web3Context: IWeb3Context = useContext(Web3Context);

  const { location } = appContext;
  const { web3, network } = web3Context;

  const networkText = () => {
    if (web3 === null) {
      return "Not Connected";
    }

    switch (network) {
      case 1:
        return "LIVE";
      case 4:
        return "RINKEBY";
      case 5:
        return "GOERLI";
      default:
        return "UNSUPPORTED";
    }
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">A R C A</Link>
      </h1>
      <ul>
        <li>
          <Link to="/">
            <strong>
              {location === "home" ? networkText() : "Trade Window"}
            </strong>
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
