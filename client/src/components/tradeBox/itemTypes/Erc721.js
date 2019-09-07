import React, { Fragment } from "react";
import PropTypes from "prop-types";

import SendBtn from "./SendBtn";

const Erc721 = ({ item, isUser }) => {
  const { contractAdd, id } = item.data;
  const { status } = item.network;

  const txData = () => {
    //pass data to create tx
  };

  return (
    <Fragment>
      <h3 className="item-text-1">ERC721</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{id}</span>
      <SendBtn status={status} txData={txData} />
    </Fragment>
  );
};

Erc721.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc721;
