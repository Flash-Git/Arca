import React, { FC, useContext } from "react";

import ItemForm from "./ItemForm";
import Items from "./Items";
import Accepted from "./Accepted";

import UserContext from "../../context/user/UserContext";
import PartnerContext from "../../context/partner/PartnerContext";

import {
  UserContext as IUserContext,
  PartnerContext as IPartnerContext
} from "context";

type Props = {
  isUser?: boolean;
};

const Box: FC<Props> = ({ isUser }) => {
  const userContext: IUserContext = useContext(UserContext);
  const partnerContext: IPartnerContext = useContext(PartnerContext);

  const address = isUser ? userContext.address : partnerContext.address;

  // TODO make this a flash animation
  const bord = isUser
    ? userContext.accepted
      ? "bord-hori-green"
      : ""
    : partnerContext.accepted
    ? "bord-hori-green"
    : "";

  return (
    <div className={"box shadow"}>
      <div>
        <h2 className="text-center shadow-bot-7 mbot">
          {address ? address : "Box"}
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
