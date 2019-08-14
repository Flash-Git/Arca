import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Erc721 = ({ item, isUser }) => {
  const { contractAdd, id } = item.data;

  return (
    <Fragment>
      <h3 className="item-text-1">ERC721</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{id}</span>
    </Fragment>
  );
};

Erc721.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc721;
