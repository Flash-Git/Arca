import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import ItemForm from "./ItemForm";
import Items from "./Items";
import Accepted from "./Accepted";

import UserContext from "../../context/user/UserContext";
import TradeContext from "../../context/trade/TradeContext";

const Box = ({ isUser }) => {
  const userContext = useContext(UserContext);
  const tradeContext = useContext(TradeContext);

  const addressObj = isUser
    ? userContext.user.addressObj
    : userContext.tradePartner.addressObj;

  //TODO make this a flash animation
  const bord = isUser
    ? tradeContext.user.accepted
      ? "bord-hori-green bord-vert-green"
      : ""
    : tradeContext.tradePartner.accepted
    ? "bord-hori-green bord-vert-green"
    : "";

  const [trader, setTrader] = useState({
    address: "initialAdd",
    ens: "ens"
  });

  const { address, ens } = trader;

  useEffect(() => {
    setTrader(addressObj);

    //eslint-disable-next-line
  }, [isUser, addressObj]); // Might need userContext.user, userContext.tradePartner

  return (
    <div className={bord + " box shadow m-1"}>
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

Box.defaultProps = {
  isUser: false
};

Box.propTypes = {
  isUser: PropTypes.bool.isRequired
};

export default Box;
