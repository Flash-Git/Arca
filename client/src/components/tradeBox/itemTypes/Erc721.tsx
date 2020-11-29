import React, { FC, Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SendBtn from "./SendBtn";
import RemoveButton from "./RemoveButton";

import UserContext from "../../../context/user/UserContext";

import { ArcaSendMethod, UserContext as IUserContext } from "context";

type Props = {
  item: any;
  isUser?: boolean;
};

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

const Erc721: FC<Props> = ({ item, isUser }) => {
  const userContext: IUserContext = useContext(UserContext);
  const { address } = userContext.tradePartner.addressObj;

  const { contractAdd, id } = item.data;
  const { status } = item.network;

  const txData: TxData = {
    method: "pushOfferErc721",
    params: [address, contractAdd, id]
  };

  return (
    <Fragment>
      <RemoveButton id={item.id} isUser={isUser} />
      <h3 className="item-text-1">ERC721</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{id}</span>
      <SendBtn id={item.id} status={status} txData={txData} isUser={isUser} />
    </Fragment>
  );
};

export default Erc721;
