import React, { useContext, useEffect } from "react";

import PropTypes from "prop-types";

import Erc20 from "./itemTypes/Erc20";
import Erc721 from "./itemTypes/Erc721";
import EnsForm from "./itemTypes/EnsForm";
import TradeContext from "../../context/trade/TradeContext";

const Items = ({ user }) => {
  const tradeContext = useContext(TradeContext);

  const items = user
    ? tradeContext.user.tradeItems
    : tradeContext.tradePartner.tradeItems;

  const internal = item => {
    switch (item.type) {
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
    items.length > 0 &&
    items.map(item => (
      <div>
        <h3 className="text-primary">ID:{item.id}</h3>
        {internal(item)}
      </div>
    ))
  );
};

Items.propTypes = {
  user: PropTypes.bool.isRequired
};

export default Items;
