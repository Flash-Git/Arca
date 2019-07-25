import React, { useEffect, useContext, Fragment } from "react";

import PreTradeForm from "../layout/PreTradeForm";
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
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <PreTradeForm />
      {userBox === 0 ? <Box isUser={true} /> : <Box />}
      {userBox === 1 ? <Box isUser={true} /> : <Box />}
    </div>
  );
};

export default Home;
