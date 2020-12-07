import React, { FC, Fragment, useContext, useState } from "react";

import { ErcType, SendState } from "../../context/Enums";

import UserContext from "../../context/user/UserContext";

import {
  UserContext as IUserContext,
  TradeItemDataErc20,
  TradeItemDataErc721
} from "context";

const { UNSENT } = SendState;
const { ERC20, ERC721 } = ErcType;

const ItemForm: FC = () => {
  const userContext: IUserContext = useContext(UserContext);
  const { addErc20Item, addErc721Item, erc20Items, erc721Items } = userContext;

  const [type, setType] = useState<ErcType>(ERC20);

  const [baseErc, setBaseErc] = useState({
    address: "",
    value: ""
  });

  const [erc20Data, setErc20Data] = useState<TradeItemDataErc20>({
    type: ERC20,
    ...baseErc,
    balance: ""
  });

  const [erc721Data, setErc721Data] = useState<TradeItemDataErc721>({
    type: ERC721,
    ...baseErc,
    id: ""
  });

  const { address } = baseErc;
  const { balance } = erc20Data;
  const { id } = erc721Data;

  // Input
  const onChangeType = (e: any) => {
    setType(e.target.value);
  };

  const onChangeBase = (e: any) => {
    setBaseErc({ ...baseErc, [e.target.name]: e.target.value });
  };

  const onChange = (e: any) => {
    switch (type) {
      case ERC20:
        setErc20Data({
          ...erc20Data,
          [e.target.name]: e.target.value
        });
        return;
      case ERC721:
        setErc721Data({
          ...erc721Data,
          [e.target.name]: e.target.value
        });
        return;
      default:
      // addAlert()
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    // TODO Seperate erc20s and erc721s in state so that the id can be set properly
    switch (type) {
      case ERC20:
        addErc20Item({
          id: `2-${erc20Items.length + 1}`,
          data: { ...erc20Data, ...baseErc },
          status: {
            slot: -1,
            state: UNSENT
          }
        });
        break;
      case ERC721:
        addErc721Item({
          id: `2-${erc721Items.length + 1}`,
          data: { ...erc721Data, ...baseErc },
          status: {
            slot: -1,
            state: UNSENT
          }
        });
        break;
      default:
        break;
      // addAlert()
    }
  };

  const erc = (
    <input
      className={`grow-2 address is-valid ${address ? "valid" : "invalid"}`}
      type="text"
      placeholder="Contract Address"
      name="address"
      value={address}
      onChange={onChangeBase}
    />
  );

  // case "ens":
  //  return (
  //    <Fragment>
  //      <input
  //       className={
  //         name ? "grow-1 is-valid valid" : "grow-1 is-valid invalid"
  //       }
  //       type="text"
  //       placeholder="Name"
  //       name="name"
  //       value={name}
  //       onChange={onChange}
  //     />
  //     {verified && (
  //       <strong
  //         className="grow-1 mx"
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center"
  //         }}
  //       >
  //         VERIFIED
  //       </strong>
  //     )}
  //    </Fragment>)
  const form = () => {
    switch (type) {
      case ERC20:
        return (
          <Fragment>
            {erc}
            <input
              className={
                balance ? "grow-1 is-valid valid" : "grow-1 is-valid invalid"
              }
              type="text"
              placeholder="Token Balance"
              name="balance"
              value={balance}
              onChange={onChange}
            />
          </Fragment>
        );
      case ERC721:
        return (
          <Fragment>
            {erc}
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
        return <Fragment></Fragment>;
    }
  };

  //Render
  return (
    <form className="shadow-top ptop" onSubmit={onSubmit}>
      <div className="flex-row">
        <select name="type" value={type} onChange={onChangeType}>
          <option value={ERC20}>ERC20</option>
          <option value={ERC721}>ERC721</option>
        </select>
        {form()}
        <input type="submit" value="Add Trade Item" className="btn btn-dark" />
      </div>
    </form>
  );
};

export default ItemForm;
