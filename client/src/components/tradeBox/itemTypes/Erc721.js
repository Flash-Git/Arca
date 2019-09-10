import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";

import SendBtn from "./SendBtn";

import UserContext from "../../../context/user/UserContext";

const Erc721 = ({ item, isUser }) => {
  const userContext = useContext(UserContext);
  const { address } = userContext.tradePartner.addressObj;

  const { contractAdd, id } = item.data;
  const { status } = item.network;

  const txData = {
    method: "pushOfferErc721",
    params: [address, contractAdd, id]
  };

  return (
    <Fragment>
      <h3 className="item-text-1">ERC721</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{id}</span>
      <SendBtn id={item.id} status={status} txData={txData} isUser={isUser} />
    </Fragment>
  );
};

Erc721.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc721;
