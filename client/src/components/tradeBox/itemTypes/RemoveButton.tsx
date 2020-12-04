import { useContext, FC } from "react";

import UserContext from "../../../context/user/UserContext";
import Web3Context from "../../../context/web3/Web3Context";

import {
  UserContext as IUserContext,
  Web3Context as IWeb3Context
} from "context";

type Props = {
  id: string;
  isUser?: boolean;
};

const RemoveButton: FC<Props> = ({ id, isUser }) => {
  const web3Context: IWeb3Context = useContext(Web3Context);
  const { arcaContract } = web3Context;

  const userContext: IUserContext = useContext(UserContext);
  const { cancelItem } = userContext;

  const onClick = (e: any) => {
    if (arcaContract === null) return;

    cancelItem(id, arcaContract);
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

export default RemoveButton;
