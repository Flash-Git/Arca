import React, { FC, useContext, useEffect, useState } from "react";

import ItemForm from "./ItemForm";
import Items from "./Items";
import Accepted from "./Accepted";

import UserContext from "../../context/user/UserContext";
import TradeContext from "../../context/trade/TradeContext";

import {
  UserContext as IUserContext,
  TradeContext as ITradeContext,
  AddressObj
} from "context";

type Props = {
  isUser?: boolean;
};

const Box: FC<Props> = ({ isUser }) => {
  const userContext: IUserContext = useContext(UserContext);
  const tradeContext: ITradeContext = useContext(TradeContext);

  const addressObj = isUser
    ? userContext.user.addressObj
    : userContext.tradePartner.addressObj;

  //TODO make this a flash animation
  const bord = isUser
    ? tradeContext.user.accepted
      ? "bord-hori-green"
      : ""
    : tradeContext.tradePartner.accepted
    ? "bord-hori-green"
    : "";

  const [trader, setTrader] = useState<AddressObj>({
    address: "initialAdd",
    ens: "ens"
  });

  const { address, ens } = trader;

  useEffect(() => {
    setTrader(addressObj);
  }, [isUser, addressObj]); // Might need userContext.user, userContext.tradePartner

  return (
    <div className={"box shadow"}>
      <div>
        <h2 className="text-center shadow-bot-7 mbot">
          {ens ? ens : address ? address : "Box"}
        </h2>
        <div className="inner-box">
          <Items isUser={isUser} />
          <Accepted isUser={isUser} />
        </div>
      </div>
      {isUser && <ItemForm />}
    </div>
  );
};

export default Box;
