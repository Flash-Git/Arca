import React, { FC, Fragment, useContext } from "react";
import TradeContext from "../../context/trade/TradeContext";

import Spinner from "../layout/Spinner";

import { TradeContext as ITradeContext } from "context";

type Props = {
  isUser?: boolean;
};

const Accepted: FC<Props> = ({ isUser }) => {
  const tradeContext: ITradeContext = useContext(TradeContext);

  const accepted = isUser
    ? tradeContext.user.accepted
    : tradeContext.tradePartner.accepted;

  const bord = accepted ? "bord-hori-green" : "bord-hori-red";
  const acceptMsg = accepted ? "Accepted" : "Not Accepted";

  const onClick = () => {
    if (accepted === null) return;
    tradeContext.toggleAccepted();
  };

  return (
    <div className="accepted text-center">
      {accepted === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h3 className={bord + " width100 py"}>{acceptMsg}</h3>
          {isUser && (
            <button onClick={onClick} className="btn btn-sm btn-dark my">
              {accepted ? "Reject" : "Accept"}
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Accepted;
