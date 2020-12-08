import React, { FC, Fragment, useContext, useEffect } from "react";

import Spinner from "../layout/Spinner";

import Erc20 from "./itemTypes/Erc20";
import Erc721 from "./itemTypes/Erc721";
// import EnsForm from "./itemTypes/EnsForm";

import UserContext from "../../context/user/UserContext";
import PartnerContext from "../../context/partner/PartnerContext";
import Web3Context from "../../context/web3/Web3Context";

import {
  UserContext as IUserContext,
  PartnerContext as IPartnerContext,
  Web3Context as IWeb3Context
} from "context";

type Props = {
  isUser?: boolean;
};

const Items: FC<Props> = ({ isUser }) => {
  const userContext: IUserContext = useContext(UserContext);
  const partnerContext: IPartnerContext = useContext(PartnerContext);

  const { address: add1, loadItems, erc20Items, erc721Items } = isUser
    ? userContext
    : partnerContext;
  const { address: add2 } = !isUser ? userContext : partnerContext;

  const web3Context: IWeb3Context = useContext(Web3Context);
  const { arcaContract } = web3Context;

  useEffect(() => {
    if (arcaContract === null || add1 === "" || add2 === "") return;

    loadItems(arcaContract, [add1, add2]);
  }, [arcaContract, add1, add2]);

  return (
    <div className="items">
      {erc20Items.length + erc721Items.length === 0 ? (
        <div style={{ margin: "0.5rem" }}>
          <Spinner size={9} />
        </div>
      ) : (
        <Fragment>
          {erc20Items.map(item => (
            <div className="item shadow-bot" key={item.id}>
              <Erc20 item={item} isUser={isUser} />
            </div>
          ))}
          {erc721Items.map(item => (
            <div className="item shadow-bot" key={item.id}>
              <Erc721 item={item} isUser={isUser} />
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Items;
