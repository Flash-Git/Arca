import React, { useState, useContext, useEffect, FC } from "react";

import { SENT, UNSENT } from "../../../context/sentStatus";

import Web3Context from "../../../context/web3/Web3Context";
import TradeContext from "../../../context/trade/TradeContext";

import {
  Status,
  Web3Context as IWeb3Context,
  TradeContext as ITradeContext,
  ArcaSendMethod
} from "context";

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

type Props = {
  id: string;
  isUser?: boolean;
  status: Status;
  txData: TxData;
};

const SendBtn: FC<Props> = ({ id, status, txData, isUser }) => {
  //txData{ method:"pushOfferErc20" }
  //erc - allow
  //arca - send
  //arca - remove
  const web3Context: IWeb3Context = useContext(Web3Context);
  const tradeContext: ITradeContext = useContext(TradeContext);

  const { connected, arcaSends } = web3Context;
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

  const onClick = (e: any) => {
    if (!connected) return;

    arcaSends(txData.method, txData.params);
    modifyTradeItemStatus(id, status === SENT ? UNSENT : SENT);
  };

  const button = () => {
    if (isUser) {
      return (
        <button className="btn btn-sm w-5" onClick={onClick}>
          {content}
        </button>
      );
    } else {
      return <button className="btn btn-sm w-5">{content}</button>;
    }
  };

  return button();
};

export default SendBtn;
