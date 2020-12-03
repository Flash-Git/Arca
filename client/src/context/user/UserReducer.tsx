import { SET_ADDRESS, SET_BALANCE, SET_ERC20S, SET_ERC721S } from "../types";

import { Action, UserState } from "context";

const UserReducer = (
  state: UserState,
  { payload, type }: Action
): UserState => {
  switch (type) {
    case SET_ADDRESS:
      return { ...state, address: payload };
    case SET_BALANCE:
      return { ...state, balance: payload };
    case SET_ERC20S:
      return { ...state, erc20s: payload };
    case SET_ERC721S:
      return { ...state, erc721s: payload };
    default:
      return state;
  }
};

export default UserReducer;
