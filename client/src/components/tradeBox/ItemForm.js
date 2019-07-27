import React, { Fragment, useContext, useState } from "react";

import TradeContext from "../../context/trade/TradeContext";

const ItemForm = () => {
  const tradeContext = useContext(TradeContext);

  const { addTradeItem } = tradeContext;

  const [item, setItem] = useState({
    type: "ens",
    contractAdd: "",
    id: "",
    amount: "",
    name: "",
    verified: true
  });

  const { contractAdd, type, id, amount, name, verified } = item;

  //Input
  const onChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    addTradeItem(item);
  };

  const erc = () => (
    <input
      className="grow-2 address"
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
              className="grow-1"
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
              className="grow-1"
              type="amount"
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
              className="grow-1"
              type="id"
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
    <form onSubmit={onSubmit}>
      <div className="flex-row">
        <select type="text" name="type" value={type} onChange={onChange}>
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
