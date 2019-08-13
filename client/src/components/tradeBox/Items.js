import React, { useContext, useEffect } from "react";

import PropTypes from "prop-types";

import Erc20 from "./itemTypes/Erc20";
import Erc721 from "./itemTypes/Erc721";
import EnsForm from "./itemTypes/EnsForm";

import TradeContext from "../../context/trade/TradeContext";

const Items = ({ isUser }) => {
  const tradeContext = useContext(TradeContext);

  const { getTradeItems } = tradeContext;

  const items = isUser
    ? tradeContext.user.tradeItems
    : tradeContext.tradePartner.tradeItems;

  useEffect(() => {
    getTradeItems();
  }, []);

  const internal = item => {
    switch (item.data.type) {
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
    <div className="items">
      {items.length > 0 &&
        items.map((item, i) =>
          i < items.length - 1 ? (
            <div className="item shadow-bot" key={item.id}>
              {internal(item)}
            </div>
          ) : (
            <div className="item" key={item.id}>
              {internal(item)}
            </div>
          )
        )}
    </div>
  );
};

Items.propTypes = {
  isUser: PropTypes.bool.isRequired
};

export default Items;
