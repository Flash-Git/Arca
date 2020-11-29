import React, { Fragment, useState, useEffect, useContext, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SendBtn from "./SendBtn";
import RemoveButton from "./RemoveButton";

import Web3Context from "../../../context/web3/Web3Context";
import UserContext from "../../../context/user/UserContext";

import {
  Web3Context as IWeb3Context,
  UserContext as IUserContext,
  ArcaSendMethod
} from "context";

type Props = {
  item: any;
  isUser?: boolean;
};

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

let offset = 0;

const EnsForm: FC<Props> = ({ item, isUser }) => {
  const web3Context: IWeb3Context = useContext(Web3Context);
  const userContext: IUserContext = useContext(UserContext);

  const { ens } = web3Context;
  const { address } = isUser
    ? userContext.user.addressObj
    : userContext.tradePartner.addressObj;

  const { addressObj } = userContext.tradePartner;
  const tradePartnerAdd = addressObj.address;

  const { status } = item.network;
  const { id, contractAdd } = item.data;

  const [ensItem, setEnsItem] = useState({
    name: "",
    namehash: "",
    verified: false
  });

  const { name, namehash, verified } = ensItem;

  useEffect(() => {
    offset++;
    setTimeout(validate, 500);
  }, [name]);

  const validate = async () => {
    offset--;
    if (offset !== 0) return;

    if (!ens) return;
    try {
      const owner = await ens.owner(name);
      if (owner === address) {
        setEnsItem({ ...ensItem, verified: true });
      } else {
        setEnsItem({ ...ensItem, verified: false });
      }
    } catch (e) {}
  };

  //Input
  const onChange = (e: any) => {
    setEnsItem({ ...ensItem, [e.target.name]: e.target.value });
    //name => namehash => id
    //if ids match then verify
  };

  const txData: TxData = {
    method: "pushOfferErc721",
    params: [tradePartnerAdd, contractAdd, id]
  };

  //Render
  return (
    <Fragment>
      <RemoveButton id={item.id} isUser={isUser} />
      <h3 className="item-text-1">ENS</h3>
      <form className="item-input">
        <input
          style={{ minWidth: "1rem" }}
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
      </form>
      <span className="item-text-1">{verified && "ICON"}</span>
      <SendBtn id={item.id} status={status} txData={txData} isUser={isUser} />
    </Fragment>
  );
};

export default EnsForm;
