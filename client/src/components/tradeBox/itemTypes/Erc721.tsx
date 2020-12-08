import { FC, Fragment, useContext } from "react";

import shortAddress from "../../../web3/help/address";

import SendBtn from "./SendBtn";
import RemoveButton from "./RemoveBtn";

import PartnerContext from "../../../context/partner/PartnerContext";

import {
  ArcaSendMethod,
  PartnerContext as IPartnerContext,
  TradeItemErc721
} from "context";

type Props = {
  item: TradeItemErc721;
  isUser?: boolean;
};

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

const Erc721: FC<Props> = ({ item, isUser }) => {
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const { address: partnerAdd } = partnerContext;

  const { address, id } = item.data;
  const { state } = item.status;

  const txData: TxData = {
    method: "pushOfferErc721",
    params: [partnerAdd, address, id]
  };

  const cancelData: TxData = {
    method: "removeOfferErc721",
    params: [partnerAdd, address, id]
  };

  return (
    <Fragment>
      <RemoveButton id={item.id} txData={cancelData} isUser={isUser} />
      <h3 className="item-text-1">ERC721</h3>
      <span className="item-text-2">{shortAddress(address)}</span>
      <span className="item-text-1">{id}</span>
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

export default Erc721;
