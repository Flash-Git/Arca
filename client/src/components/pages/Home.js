import React, { useEffect, useContext, Fragment } from "react";

import Box from "../tradeBox/Box";
import UserContext from "./../../context/user/UserContext";
import TradeContext from "./../../context/trade/TradeContext";

const Home = () => {
  const userContext = useContext(UserContext);
  const tradeContext = useContext(TradeContext);

  const { userBox } = tradeContext;

  useEffect(() => {
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
