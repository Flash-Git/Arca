import React, { FC, Fragment, useContext } from "react";

import SendBtn from "./SendBtn";
import RemoveButton from "./RemoveBtn";

import PartnerContext from "../../../context/partner/PartnerContext";

import { ArcaSendMethod, PartnerContext as IPartnerContext } from "context";

type Props = {
  item: any;
  isUser?: boolean;
};

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

const Erc20: FC<Props> = ({ item, isUser }) => {
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const { address } = partnerContext;

  const { contractAdd, balance } = item.data;
  const { status } = item.network;

  const txData: TxData = {
    method: "pushOfferErc20",
    params: [address, contractAdd, balance]
  };

  const cancelData: TxData = {
    method: "removeOfferErc20",
    params: [address, contractAdd, balance]
  };

  return (
    <Fragment>
      <RemoveButton id={item.id} txData={cancelData} isUser={isUser} />
      <h3 className="item-text-1">ERC20</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{balance}</span>

      <SendBtn
        id={item.id}
        status={status}
        txData={txData}
        txCancel={cancelData}
        isUser={isUser}
      />
    </Fragment>
  );
};

export default Erc20;
