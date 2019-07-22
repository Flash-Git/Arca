import React, { useContext, useEffect } from "react";

import Erc20 from "./itemTypes/Erc20";
import Erc721 from "./itemTypes/Erc721";
import EnsForm from "./itemTypes/EnsForm";
import TradeContext from "../../context/trade/TradeContext";

const Items = () => {
  const tradeContext = useContext(TradeContext);

  const internal = item => {
    switch (type) {
      case "erc20":
        return <Erc20 item={item} />;
      case "erc721":
        return <Erc721 item={item} />;
      case "ens":
        return <EnsForm item={item} />;
      default:
        return "";
    }
  };

  return (
    tradeContext.tradeItems.length > 0 &&
    tradeContext.tradeItems.map(item => (
      <div>
        <h3 className="text-primary">ID:{id}</h3>
        {internal}
      </div>
    ))
  );
};
