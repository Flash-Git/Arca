import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Erc20 = ({ item }) => {
  return (
    <Fragment>
      <h3>ERC20</h3>
    </Fragment>
  );
};

Erc20.propTypes = {
  item: PropTypes.object.isRequired
};

export default Erc20;
