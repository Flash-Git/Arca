import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Erc721 = ({ item }) => {
  const { contractAdd, id } = item.data;

  return (
    <Fragment>
      <h3>ERC721</h3>
      <span>contractAdd</span>
      <span>id</span>
    </Fragment>
  );
};

Erc721.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc721;
