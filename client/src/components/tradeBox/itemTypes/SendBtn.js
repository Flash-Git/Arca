import React from "react";
import PropTypes from "prop-types";

import { SENT, UNSENT } from "../../../context/sentStatus";

const SendBtn = ({ status }) => {
  const content = status => {
    switch (status) {
      case SENT:
        return "Cancel";
      case UNSENT:
        return "Send";
      default:
        return "Error";
    }
  };

  return <button className="btn btn-sm">{content(status)}</button>;
};

SendBtn.propTypes = {
  status: PropTypes.string.isRequired
};

export default SendBtn;
