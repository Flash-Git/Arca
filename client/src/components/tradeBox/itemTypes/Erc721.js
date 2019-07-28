import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Erc721 = ({ item }) => {
  return (
    <Fragment>
      <h3>ERC721</h3>
    </Fragment>
  );
};

Erc721.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc721;
