import React, { useContext } from "react";
import TradeContext from "../../context/trade/TradeContext";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

const Accepted = ({ isUser }) => {
  const tradeContext = useContext(TradeContext);

  const accepted = isUser
    ? tradeContext.user.accepted
    : tradeContext.tradePartner.accepted;

  return (
    <div className="accepted">
      {accepted ? (
        <h3 className="m-2">Accepted</h3>
      ) : accepted === false ? (
        <h3 className="m-2">Not Accepted</h3>
      ) : (
        <Spinner height={true} />
      )}
    </div>
  );
};

Accepted.propTypes = {
  isUser: PropTypes.bool.isRequired
};

export default Accepted;
