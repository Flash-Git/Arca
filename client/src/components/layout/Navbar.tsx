import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppContext from "../../context/app/AppContext";
import AlertContext from "../../context/alert/AlertContext";
import Web3Context from "../../context/web3/Web3Context";

import {
  AppContext as IAppContext,
  AlertContext as IAlertContext,
  Web3Context as IWeb3Context
} from "context";

const Navbar: FC = () => {
  const appContext: IAppContext = useContext(AppContext);
  const alertContext: IAlertContext = useContext(AlertContext);
  const web3Context: IWeb3Context = useContext(Web3Context);

  const { location } = appContext;
  const { addAlert } = alertContext;
  const { signers } = web3Context;

  const [networkText, setNetworkText] = useState<string>("Disconnected");

  useEffect(() => {
    if (signers.length === 0) return;

    const updateNetwork = async () => {
      const chainId = await signers[signers.length - 1].getChainId();
      switch (chainId) {
        case 1:
          setNetworkText("LIVE");
          break;
        case 4:
          setNetworkText("RINKEBY");
          break;
        case 5:
          setNetworkText("GOERLI");
          break;
        default:
          setNetworkText("UNSUPPORTED");
          addAlert("This network is not supported", "danger");
      }
    };

    try {
      updateNetwork();
    } catch (e) {
      addAlert(e, "danger");
    }
  }, [signers]);

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">A R C A</Link>
      </h1>
      <ul>
        <li>
          <Link to="/">
            <strong>
              {location === "home" ? networkText : "Trade Window"}
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
