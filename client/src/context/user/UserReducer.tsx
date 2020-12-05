import {
  SET_ADDRESS,
  SET_BALANCE,
  SET_ACCEPTED,
  SET_ITEMS,
  SET_ERC20S,
  SET_ERC721S,
  ADD_ITEM,
  SET_ITEM_STATE
} from "../types";

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
    case SET_ACCEPTED:
      return { ...state, accepted: payload };
    case SET_ITEMS:
      return { ...state, items: payload };
    case SET_ERC20S:
      return { ...state, erc20s: payload };
    case SET_ERC721S:
      return { ...state, erc721s: payload };
    case ADD_ITEM:
      return { ...state, items: [...state.items, payload] };
    case SET_ITEM_STATE:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === payload.id ? (item.status.state = payload.newState) : item
        )
      };

    default:
      return state;
  }
};

export default UserReducer;
