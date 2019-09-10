import React, { Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import SendBtn from "./SendBtn";

import UserContext from "../../../context/user/UserContext";

const Erc20 = ({ item, isUser }) => {
  const userContext = useContext(UserContext);
  const { address } = userContext.tradePartner.addressObj;

  const { contractAdd, amount } = item.data;
  const { status } = item.network;

  const txData = {
    method: "pushOfferErc20",
    params: [address, contractAdd, amount]
  };

  return (
    <Fragment>
      <h3 className="item-text-1">ERC20</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{amount}</span>

      <SendBtn id={item.id} status={status} txData={txData} isUser={isUser} />
    </Fragment>
  );
};

Erc20.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc20;
