import React, { useContext } from "react";
import TradeContext from "../../context/trade/TradeContext";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

const Accepted = ({ isUser }) => {
  const tradeContext = useContext(TradeContext);

  const accepted = isUser
    ? tradeContext.user.accepted
    : tradeContext.tradePartner.accepted;

  const bord = accepted ? "bord-hori-green" : "bord-hori-red";
  const acceptMsg = accepted ? "Accepted" : "Not Accepted";

  return (
    <div className="accepted text-center">
      {accepted === null ? (
        <Spinner size={7} />
      ) : (
        <h3 className={bord + " p width100"}>{acceptMsg}</h3>
      )}
    </div>
  );
};

Accepted.propTypes = {
  isUser: PropTypes.bool.isRequired
};

export default Accepted;
