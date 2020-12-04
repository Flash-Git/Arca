import { useState, useContext, useEffect, FC } from "react";

import { SENT, SENDING, UNSENT } from "../../../context/sendState";

import UserContext from "../../../context/user/UserContext";
import Web3Context from "../../../context/web3/Web3Context";

import {
  UserContext as IUserContext,
  Web3Context as IWeb3Context,
  ArcaSendMethod,
  SendState
} from "context";

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

type Props = {
  id: string;
  isUser?: boolean;
  status: SendState;
  txData: TxData;
};

const SendBtn: FC<Props> = ({ id, status, txData, isUser }) => {
  //txData{ method:"pushOfferErc20" }
  //erc - allow
  //arca - send
  //arca - remove
  const userContext: IUserContext = useContext(UserContext);
  const { sendItem } = userContext;

  const web3Context: IWeb3Context = useContext(Web3Context);
  const { arcaContract } = web3Context;

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
    if (arcaContract === null) return;

    // TODO cancel
    sendItem(id, arcaContract, txData.method, txData.params);
  };

  const button = () => {
    if (isUser) {
      return (
        <button className="btn btn-sm btn-dark w-5" onClick={onClick}>
          {content}
        </button>
      );
    } else {
      return <button className="btn btn-sm btn-dark w-5">{content}</button>;
    }
  };

  return button();
};

export default SendBtn;
