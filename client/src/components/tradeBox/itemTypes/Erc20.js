import React, { Fragment } from "react";
import PropTypes from "prop-types";

import SendBtn from "./SendBtn";

const Erc20 = ({ item, isUser }) => {
  const { contractAdd, amount } = item.data;
  const { status } = item.network;

  return (
    <Fragment>
      <h3 className="item-text-1">ERC20</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{amount}</span>
      <SendBtn status={status} />
    </Fragment>
  );
};

Erc20.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc20;
