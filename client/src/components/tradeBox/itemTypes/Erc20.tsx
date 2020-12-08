import { FC, Fragment, useContext } from "react";

import shortAddress from "../../../web3/help/address";

import SendBtn from "./SendBtn";
import RemoveButton from "./RemoveBtn";

import PartnerContext from "../../../context/partner/PartnerContext";

import {
  ArcaSendMethod,
  PartnerContext as IPartnerContext,
  TradeItemErc20
} from "context";

type Props = {
  item: TradeItemErc20;
  isUser?: boolean;
};

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

const Erc20: FC<Props> = ({ item, isUser }) => {
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const { address: partnerAdd } = partnerContext;

  const { address, balance } = item.data;
  const { state } = item.status;

  const txData: TxData = {
    method: "pushOfferErc20",
    params: [partnerAdd, address, balance]
  };

  const cancelData: TxData = {
    method: "removeOfferErc20",
    params: [partnerAdd, address, balance]
  };

  return (
    <Fragment>
      <RemoveButton id={item.id} txData={cancelData} isUser={isUser} />
      <h3 className="item-text-1">ERC20</h3>
      <span className="item-text-2">{shortAddress(address)}</span>
      <span className="item-text-1">{balance}</span>
      <SendBtn
        id={item.id}
        state={state}
        txData={txData}
        txCancel={cancelData}
        isUser={isUser}
      />
    </Fragment>
  );
};

export default Erc20;
