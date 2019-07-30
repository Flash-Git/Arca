import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Erc20 = ({ item }) => {
  const { contractAdd, amount } = item.data;

  return (
    <Fragment>
      <h3 className="item-text">ERC20</h3>
      <span className="item-text">{contractAdd}</span>
      <span className="item-text">{amount}</span>
    </Fragment>
  );
};

Erc20.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc20;
