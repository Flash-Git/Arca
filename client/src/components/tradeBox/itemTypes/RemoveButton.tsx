import React, { useState, useContext, useEffect, FC } from "react";

import TradeContext from "../../../context/trade/TradeContext";

import { TradeContext as ITradeContext } from "context";

type Props = {
  id: string;
  isUser?: boolean;
};

const RemoveButton: FC<Props> = ({ id, isUser }) => {
  const tradeContext: ITradeContext = useContext(TradeContext);
  const { cancelTradeItem } = tradeContext;

  const onClick = (e: any) => {
    cancelTradeItem(id);
  };

  if (!isUser) return <div className="mx-1 btn-sm"></div>; //invisidiv
  return (
    <button className="btn mx btn-sm nobg" onClick={onClick}>
      <span role="button" aria-label="cross">
        &#10060;
      </span>
    </button>
  );
};

export default RemoveButton;
