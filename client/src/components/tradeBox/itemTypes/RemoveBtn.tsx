import { useContext, FC } from "react";

import UserContext from "../../../context/user/UserContext";
import Web3Context from "../../../context/web3/Web3Context";

import {
  ArcaSendMethod,
  UserContext as IUserContext,
  Web3Context as IWeb3Context
} from "context";

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

type Props = {
  id: string;
  txData: TxData;
  isUser?: boolean;
};

const RemoveBtn: FC<Props> = ({ id, txData, isUser }) => {
  const web3Context: IWeb3Context = useContext(Web3Context);
  const { arcaContract } = web3Context;

  const userContext: IUserContext = useContext(UserContext);
  const { cancelItem } = userContext;

  const onClick = (e: any) => {
    if (arcaContract === null) return;

    cancelItem(id, arcaContract, txData.method, txData.params);
  };

  if (!isUser) return <div className="mx-1 btn-sm"></div>; //invisidiv

  return (
    <button className="btn mx btn-sm nobg" onClick={onClick}>
      <span role="button" aria-label="cross">
        &#10060;
      </span>
    </button>
  );
};

export default RemoveBtn;
