import React, { FC, Fragment, useContext } from "react";

import { arcaCall } from "../../web3/calls/arcaCalls";

import PartnerContext from "../../context/partner/PartnerContext";
import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";

import Spinner from "../layout/Spinner";

import {
  UserContext as IUserContext,
  PartnerContext as IPartnerContext,
  Web3Context as IWeb3Context
} from "context";

type Props = {
  isUser?: boolean;
};

const Accepted: FC<Props> = ({ isUser }) => {
  const userContext: IUserContext = useContext(UserContext);
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const web3Context: IWeb3Context = useContext(Web3Context);

  const accepted = isUser ? userContext.accepted : partnerContext.accepted;

  const { address: userAdd, toggleAccepted } = userContext;
  const { address: partnerAdd } = partnerContext;

  const { arcaContract } = web3Context;

  const bord = accepted ? "bord-hori-green" : "bord-hori-red";
  const acceptMsg = accepted ? "Accepted" : "Not Accepted";

  const onClick = async () => {
    if (accepted === null || arcaContract === null) return;

    const partnerNonce = await arcaCall(arcaContract, "getPartnerNonce", [
      userAdd,
      partnerAdd
    ]);

    const params = [partnerAdd, partnerNonce];

    toggleAccepted(
      arcaContract,
      accepted ? "unacceptTrade" : "acceptTrade",
      params
    );
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
