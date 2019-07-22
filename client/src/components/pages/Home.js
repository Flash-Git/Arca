import React, { useEffect, useContext, Fragment } from "react";

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
      {userBox === 0 ? <Box user={true} /> : <Box />}
      {userBox === 1 ? <Box user={true} /> : <Box />}
    </div>
  );
};

export default Home;
