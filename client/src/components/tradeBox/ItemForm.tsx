import React, { FC, Fragment, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import { UNSENT } from "../../context/sendState";

import UserContext from "../../context/user/UserContext";

import { UserContext as IUserContext, TradeItem, TradeItemData } from "context";

const ItemForm: FC = () => {
  const userContext: IUserContext = useContext(UserContext);

  const { addItem } = userContext;

  const emptyData: TradeItemData = {
    type: "erc20",
    address: "",
    id: "", //erc721
    amount: "" //erc20
    // name: "", //ens
    // namehash: "", //ens
    // verified: false //ens
  };

  const [item, setItem] = useState<TradeItem>({
    id: uuid(),
    data: emptyData,
    status: {
      slot: 0,
      state: UNSENT,
      hash: ""
    }
  });

  const { type, address, id, amount } = item.data;

  //Input
  const onChange = (e: any) => {
    setItem({
      ...item,
      data: { ...item.data, [e.target.name]: e.target.value }
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    addItem(item);
    setItem({ ...item, id: uuid(), data: emptyData });
  };

  const erc = () => (
    <input
      className={
        address
          ? "grow-2 address is-valid valid"
          : "grow-2 address is-valid invalid"
      }
      type="text"
      placeholder="Contract Address"
      name="address"
      value={address}
      onChange={onChange}
    />
  );

  const form = () => {
    switch (type) {
      case "ens":
        return (
          <Fragment>
            {/* <input
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
            )} */}
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
