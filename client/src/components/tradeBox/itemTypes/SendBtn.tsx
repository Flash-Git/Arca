import { useState, useContext, useEffect, FC } from "react";

import { SendState } from "../../../context/Enums";

import UserContext from "../../../context/user/UserContext";
import Web3Context from "../../../context/web3/Web3Context";

import {
  UserContext as IUserContext,
  Web3Context as IWeb3Context,
  ArcaSendMethod
} from "context";

const { SENT, UNSENT, CANCELLING, SENDING } = SendState;

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

type Props = {
  id: string;
  status: SendState;
  txData: TxData;
  txCancel: TxData;
  isUser?: boolean;
};

const SendBtn: FC<Props> = ({ id, status, txData, txCancel, isUser }) => {
  //txData{ method:"pushOfferErc20" }
  //erc - allow
  //arca - send
  //arca - remove
  const userContext: IUserContext = useContext(UserContext);
  const { sendItem, cancelItem } = userContext;

  const web3Context: IWeb3Context = useContext(Web3Context);
  const { arcaContract } = web3Context;

  const [content, setContent] = useState("Loading");

  const [disabled, setDisabled] = useState(false);

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
      case CANCELLING:
        setContent("Loading");
        setDisabled(true);
        return;
      case SENDING:
        setContent("Loading");
        setDisabled(true);
        return;
      default:
        setContent("Error");
        return;
    }
  }, [status]);

  const onClick = (e: any) => {
    if (arcaContract === null) return;

    if (content === "Cancel")
      cancelItem(id, arcaContract, txCancel.method, txCancel.params);
    else if (content === "Send")
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
