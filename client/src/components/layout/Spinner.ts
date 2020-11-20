import React from "react";
import PropTypes from "prop-types";

import spinner from "./spinner.gif";

const Spinner = ({ size }) => {
  const style = {
    margin: "auto",
    display: "block"
  };

  if (size) {
    style.width = size + "rem";
    style.height = size + "rem";
  } else {
    style.width = "100%";
  }

  return <img src={spinner} alt="Loading..." style={style} />;
};

Spinner.propTypes = {
  size: PropTypes.number
};

export default Spinner;
