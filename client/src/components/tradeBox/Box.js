import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import ItemForm from "./ItemForm";
import Items from "./Items";
import Accepted from "./Accepted";
import UserContext from "../../context/user/UserContext";

const Box = ({ isUser }) => {
  const userContext = useContext(UserContext);

  const [trader, setTrader] = useState({
    address: "initialAdd",
    ens: "ens"
  });

  const { address, ens } = trader;

  useEffect(() => {
    if (isUser) {
      setTrader(userContext.user);
    } else {
      setTrader(userContext.tradePartner);
    }
    //eslint-disable-next-line
  }, [isUser, userContext.user, userContext.tradePartner]);

  return (
    <div className="box shadow">
      <div style={{ minHeight: "10rem" }}>
        <h2 className="text-center shadow-bot-7">
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
