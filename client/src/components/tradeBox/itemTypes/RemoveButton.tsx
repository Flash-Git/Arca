import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import TradeContext from "../../../context/trade/TradeContext";

const RemoveButton = ({ id, isUser }) => {
  const tradeContext = useContext(TradeContext);
  const { cancelTradeItem } = tradeContext;

  const onClick = e => {
    cancelTradeItem(id);
  };

  if (!isUser) return <div className="mx-1 btn-sm"></div>; //invisidiv
  return (
    <button className="btn mx btn-sm" onClick={onClick}>
      <span role="img" aria-label="cross">
        &#10060;
      </span>
    </button>
  );
};

RemoveButton.propTypes = {
  id: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired
};

export default RemoveButton;
