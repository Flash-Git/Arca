import React, { useContext } from "react";
import PropTypes from "prop-types";

import { SENT, UNSENT } from "../../../context/sentStatus";

import Web3Context from "../../../context/web3/Web3Context";

const SendBtn = ({ status, txData }) => {
  const web3Context = useContext(Web3Context);

  const { sendTx } = web3Context;

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

  const createTx = txData => {
    //Create tx
    //Send tx and add it to active reqs in web3Context
    sendTx(txData);
    //Modify item status
  };

  return (
    <button className="btn btn-sm" onClick={createTx(txData)}>
      {content(status)}
    </button>
  );
};

SendBtn.propTypes = {
  status: PropTypes.string.isRequired,
  txData: PropTypes.object.isRequired
};

export default SendBtn;
