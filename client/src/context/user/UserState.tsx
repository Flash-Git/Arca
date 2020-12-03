import React, { FC, useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import { UserState as IUserState } from "context";

import {} from "../types";

const UserState: FC = props => {
  const initialState: IUserState = {
    address: "",
    balance: "",
    erc20s: [],
    erc721s: [],
    tradeItems: []
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  /*
   * Actions
   */

  return (
    <UserContext.Provider
      value={{
        address: state.address,
        balance: state.balance,
        erc20s: state.erc20s,
        erc721s: state.erc721s,
        tradeItems: state.tradeItems
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
