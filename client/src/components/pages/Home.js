import React, { useEffect, useContext } from "react";

import Sidebar from "../layout/Sidebar";
import PreTradeForm from "../layout/PreTradeForm";
import Loader from "../loading/Loader";
import Box from "../tradeBox/Box";

import AppContext from "./../../context/app/AppContext";
import TradeContext from "./../../context/trade/TradeContext";

const Home = props => {
  const appContext = useContext(AppContext);
  const tradeContext = useContext(TradeContext);

  const { setLocation } = appContext;
  const { userBox } = tradeContext;

  useEffect(() => {
    setLocation("home");
  }, []);

  return (
    <div style={{ display: "block" }}>
      <Sidebar />
      <div className="container">
        <PreTradeForm />
        <Loader />
        {userBox === 0 ? <Box isUser={true} /> : <Box />}
        {userBox === 1 ? <Box isUser={true} /> : <Box />}
      </div>
    </div>
  );
};

export default Home;
