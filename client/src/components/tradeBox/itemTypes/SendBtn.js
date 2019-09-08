import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { SENT, UNSENT } from "../../../context/sentStatus";

import Web3Context from "../../../context/web3/Web3Context";
import TradeContext from "../../../context/trade/TradeContext";

const SendBtn = ({ status, txData }) => {
  //txData{ method:"pushOfferErc20" }
  //erc - allow
  //arca - send
  //arca - remove
  const web3Context = useContext(Web3Context);
  const tradeContext = useContext(TradeContext);

  const { ArcaSends } = web3Context;
  const { modifyTradeItemStatus } = tradeContext;

  const [content, setContent] = useState("Loading");

  useEffect(() => {
    switch (status) {
      case SENT:
        setContent("Cancel");
        break;
      case UNSENT:
        setContent("Send");
        break;
      default:
        setContent("Error");
        break;
    }
  }, [status]);

  const onClick = e => {
    ArcaSends(txData.method, txData.params);
    modifyTradeItemStatus(status);
  };

  return (
    <button className="btn btn-sm w-5" onClick={onClick}>
      {content}
    </button>
  );
};

SendBtn.propTypes = {
  status: PropTypes.string.isRequired,
  txData: PropTypes.object.isRequired
};

export default SendBtn;
