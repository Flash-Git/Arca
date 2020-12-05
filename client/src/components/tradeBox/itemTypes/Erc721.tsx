import { FC, Fragment, useContext } from "react";

import SendBtn from "./SendBtn";
import RemoveButton from "./RemoveBtn";

import { ArcaSendMethod, PartnerContext as IPartnerContext } from "context";
import PartnerContext from "../../../context/partner/PartnerContext";

type Props = {
  item: any;
  isUser?: boolean;
};

type TxData = {
  method: ArcaSendMethod;
  params: string[];
};

const Erc721: FC<Props> = ({ item, isUser }) => {
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const { address } = partnerContext;

  const { contractAdd, id } = item.data;
  const { status } = item.network;

  const txData: TxData = {
    method: "pushOfferErc721",
    params: [address, contractAdd, id]
  };

  const cancelData: TxData = {
    method: "removeOfferErc721",
    params: [address, contractAdd, id]
  };

  return (
    <Fragment>
      <RemoveButton id={item.id} txData={cancelData} isUser={isUser} />
      <h3 className="item-text-1">ERC721</h3>
      <span className="item-text-2">{contractAdd}</span>
      <span className="item-text-1">{id}</span>
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

export default Erc721;
