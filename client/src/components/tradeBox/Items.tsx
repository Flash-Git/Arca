import { FC, useContext, useEffect } from "react";

import Erc20 from "./itemTypes/Erc20";
import Erc721 from "./itemTypes/Erc721";
import EnsForm from "./itemTypes/EnsForm";

import UserContext from "../../context/user/UserContext";
import PartnerContext from "../../context/partner/PartnerContext";
import Web3Context from "../../context/web3/Web3Context";

import {
  UserContext as IUserContext,
  PartnerContext as IPartnerContext,
  Web3Context as IWeb3Context,
  TradeItem
} from "context";

type Props = {
  isUser?: boolean;
};

const Items: FC<Props> = ({ isUser }) => {
  const userContext: IUserContext = useContext(UserContext);
  const partnerContext: IPartnerContext = useContext(PartnerContext);
  const web3Context: IWeb3Context = useContext(Web3Context);

  const items = isUser ? userContext.tradeItems : partnerContext.tradeItems;
  const loadItems = isUser ? userContext.loadItems : partnerContext.loadItems;
  const { signers } = web3Context;

  useEffect(() => {
    loadItems(signers[signers.length - 1]);
  }, []);

  const internal = (item: TradeItem) => {
    switch (item.data.type) {
      case "erc20":
        return <Erc20 item={item} isUser={isUser} />;
      case "erc721":
        return <Erc721 item={item} isUser={isUser} />;
      case "ens":
        return <EnsForm item={item} isUser={isUser} />;
      default:
        return "";
    }
  };

  return (
    <div className="items">
      {items.length > 0 &&
        items.map((item, i) =>
          i < items.length - 1 ? (
            <div className="item shadow-bot" key={item.id}>
              {internal(item)}
            </div>
          ) : (
            <div className="item" key={item.id}>
              {internal(item)}
            </div>
          )
        )}
    </div>
  );
};

export default Items;
