import { useEffect, useContext, FC } from "react";

import Sidebar from "../layout/Sidebar";
import PreTradeForm from "../layout/PreTradeForm";
import Box from "../tradeBox/Box";

import AlertContext from "../../context/alert/AlertContext";
import AppContext from "../../context/app/AppContext";
import Web3Context from "../../context/web3/Web3Context";

import {
  AlertContext as IAlertContext,
  AppContext as IAppContext,
  Web3Context as IWeb3Context
} from "context";

const Home: FC = () => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;
  
  const appContext: IAppContext = useContext(AppContext);
  const { setLocation } = appContext;

  const web3Context: IWeb3Context = useContext(Web3Context);
  const {
    signers,
    loadProvider,
    loadArcaAddress,
    loadArcaContract
  } = web3Context;

  useEffect(() => {
    setLocation("home");

    const windowEth: any = window;
    if (typeof windowEth.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      loadProvider();
    }
    addAlert(
      "You need a Web3 enabled browser to use this app",
      "danger",
      50000
    );
  }, []);

  useEffect(() => {
    if (signers.length === 0) return;

    loadArcaAddress();
    loadArcaContract(signers[signers.length - 1]);
  }, [signers]);

  return (
    <div style={{ display: "block" }}>
      <Sidebar />
      <div className="container">
        <PreTradeForm />
        <Box />
        <Box isUser={true} />
      </div>
    </div>
  );
};

export default Home;
