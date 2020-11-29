import React, { FC, Fragment, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import TradeContext from "../../context/trade/TradeContext";

import { UNSENT } from "../../context/sentStatus";

import { Data, TradeContext as ITradeContext, TradeItem } from "context";

const ItemForm: FC = () => {
  const tradeContext: ITradeContext = useContext(TradeContext);

  const { addTradeItem } = tradeContext;

  const emptyData: Data = {
    type: "ens",
    contractAdd: "",
    id: "", //erc721
    amount: "", //erc20
    name: "", //ens
    namehash: "", //ens
    verified: false //ens
  };

  const [item, setItem] = useState<TradeItem>({
    id: uuid(),
    network: {
      status: UNSENT,
      txHash: null,
      web3Loading: false,
      dbLoading: false,
      synced: false,
      slot: 0,
      tab: 0
    },
    data: emptyData
  });

  const { type, contractAdd, id, amount, name, namehash, verified } = item.data;

  //Input
  const onChange = (e: any) => {
    setItem({
      ...item,
      data: { ...item.data, [e.target.name]: e.target.value }
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    addTradeItem(item);
    setItem({ ...item, id: uuid(), data: emptyData });
  };

  const erc = () => (
    <input
      className={
        contractAdd
          ? "grow-2 address is-valid valid"
          : "grow-2 address is-valid invalid"
      }
      type="text"
      placeholder="Contract Address"
      name="contractAdd"
      value={contractAdd}
      onChange={onChange}
    />
  );

  const form = () => {
    switch (type) {
      case "ens":
        return (
          <Fragment>
            <input
              className={
                name ? "grow-1 is-valid valid" : "grow-1 is-valid invalid"
              }
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
            {verified && (
              <strong
                className="grow-1 mx"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                VERIFIED
              </strong>
            )}
          </Fragment>
        );
      case "erc20":
        return (
          <Fragment>
            {erc()}
            <input
              className={
                amount ? "grow-1 is-valid valid" : "grow-1 is-valid invalid"
              }
              type="text"
              placeholder="Token Amount"
              name="amount"
              value={amount}
              onChange={onChange}
            />
          </Fragment>
        );
      case "erc721":
        return (
          <Fragment>
            {erc()}
            <input
              className={
                id ? "grow-1 is-valid valid" : "grow-1 is-valid invalid"
              }
              type="text"
              placeholder="Token ID"
              name="id"
              value={id}
              onChange={onChange}
            />
          </Fragment>
        );
      default:
        return "";
    }
  };

  //Render
  return (
    <form className="shadow-top ptop" onSubmit={onSubmit}>
      <div className="flex-row">
        <select name="type" value={type} onChange={onChange}>
          {/* type=select */}
          <option value={"ens"}>ENS</option>
          <option value={"erc20"}>ERC20</option>
          <option value={"erc721"}>ERC721</option>
        </select>
        {form()}
        <input type="submit" value="Add Trade Item" className="btn btn-dark" />
      </div>
    </form>
  );
};

export default ItemForm;
