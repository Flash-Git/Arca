import { FC, Fragment, useContext, useEffect } from "react";

import { arcaCall } from "../../web3/calls/arcaCalls";

import AlertContext from "../../context/alert/AlertContext";
import PartnerContext from "../../context/partner/PartnerContext";
import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";

import Spinner from "../layout/Spinner";

import {
  AlertContext as IAlertContext,
  UserContext as IUserContext,
  PartnerContext as IPartnerContext,
  Web3Context as IWeb3Context
} from "context";

type Props = {
  isUser?: boolean;
};

const Accepted: FC<Props> = ({ isUser }) => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const userContext: IUserContext = useContext(UserContext);
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const web3Context: IWeb3Context = useContext(Web3Context);

  const { addAlert } = alertContext;

  const { toggleAccepted } = userContext;
  const { accepted, loadAccepted, address: add1 } = isUser
    ? userContext
    : partnerContext;
  const { address: add2 } = !isUser ? userContext : partnerContext;

  const { arcaContract } = web3Context;

  useEffect(() => {
    if (arcaContract === null || add1 === "" || add2 === "") return;

    loadAccepted(arcaContract, [add2, add1]);
  }, [arcaContract, add1, add2]);

  const onClick = async () => {
    if (
      accepted === null ||
      arcaContract === null ||
      add1 === "" ||
      add2 === ""
    )
      return;

    try {
      const partnerNonce = await arcaCall(arcaContract, "getPartnerNonce", [
        add1,
        add2
      ]);

      toggleAccepted(arcaContract, accepted ? "unacceptTrade" : "acceptTrade", [
        add2,
        partnerNonce
      ]);
    } catch (e) {
      console.log(e);
      addAlert(e.toString(), "danger");
    }
  };

  return (
    <div className="accepted text-center">
      {accepted === null ? (
        <div style={{ margin: "0.1rem" }}>
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <h3
            className={`${
              accepted ? "bord-hori-green" : "bord-hori-red"
            } width100 py`}
          >
            {accepted ? "Accepted" : "Not Accepted"}
          </h3>
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
