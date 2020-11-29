import React, { FC, useContext, useEffect } from "react";

import PropTypes from "prop-types";

import Erc20 from "./itemTypes/Erc20";
import Erc721 from "./itemTypes/Erc721";
import EnsForm from "./itemTypes/EnsForm";

import TradeContext from "../../context/trade/TradeContext";

import { TradeContext as ITradeContext, TradeItem } from "context";

type Props = {
  isUser?: boolean;
};

const Items: FC<Props> = ({ isUser }) => {
  const tradeContext: ITradeContext = useContext(TradeContext);

  const { getTradeItems } = tradeContext;

  const items = isUser
    ? tradeContext.user.tradeItems
    : tradeContext.tradePartner.tradeItems;

  useEffect(() => {
    getTradeItems();
  }, []);

  const internal = (item: TradeItem) => {
    switch (item.data.type) {
      case "erc20":
        return <Erc20 item={item} isUser={isUser} />;
      case "erc721":
        return <Erc721 item={item} isUser={isUser} />;
      case "ens":
        return <EnsForm item={item} isUser={isUser} />;
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

export default Items;
