import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { SENT, UNSENT } from "../../../context/sentStatus";

import Web3Context from "../../../context/web3/Web3Context";
import TradeContext from "../../../context/trade/TradeContext";

const SendBtn = ({ status, txData, isUser }) => {
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
    if (!isUser) {
      setContent("Sent");
      return;
    }

    switch (status) {
      case SENT:
        setContent("Cancel");
        return;
      case UNSENT:
        setContent("Send");
        return;
      default:
        setContent("Error");
        return;
    }
  }, [status]);

  const onClick = e => {
    ArcaSends(txData.method, txData.params);
    //modifyTradeItemStatus(status);
  };

  const button = () => {
    if (isUser) {
      return (
        <button className="btn btn-sm w-5" onClick={onClick}>
          {content}
        </button>
      );
    } else {
      return <div className="btn btn-sm w-5">{content}</div>;
    }
  };

  return button();
};

SendBtn.propTypes = {
  status: PropTypes.string.isRequired,
  txData: PropTypes.object,
  isUser: PropTypes.bool.isRequired
};

export default SendBtn;
