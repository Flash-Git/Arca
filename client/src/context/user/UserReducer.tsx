import {
  SET_ADDRESS,
  SET_BALANCE,
  SET_ACCEPTED,
  SET_ERC20_ITEMS,
  SET_ERC721_ITEMS,
  SET_ERC20S,
  SET_ERC721S,
  ADD_ERC20_ITEM,
  ADD_ERC721_ITEM,
  REMOVE_ITEM,
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
    case SET_ERC20_ITEMS:
      return {
        ...state,
        erc20Items: payload
      };
    case SET_ERC721_ITEMS:
      return {
        ...state,
        erc721Items: payload
      };
    case SET_ERC20S:
      return { ...state, erc20s: payload };
    case SET_ERC721S:
      return { ...state, erc721s: payload };
    case ADD_ERC20_ITEM:
      return { ...state, erc20Items: [...state.erc20Items, payload] };
    case ADD_ERC721_ITEM:
      return { ...state, erc721Items: [...state.erc721Items, payload] };
    case REMOVE_ITEM:
      return {
        ...state,
        erc20Items: state.erc20Items.filter(item => item.id !== payload),
        erc721Items: state.erc721Items.filter(item => item.id !== payload)
      };
    case SET_ITEM_STATE:
      return {
        ...state,
        erc20Items: state.erc20Items.map(item =>
          item.id === payload.id
            ? { ...item, status: { ...item.status, state: payload.newState } }
            : item
        ),
        erc721Items: state.erc721Items.map(item =>
          item.id === payload.id
            ? { ...item, status: { ...item.status, state: payload.newState } }
            : item
        )
      };

    default:
      return state;
  }
};

export default UserReducer;
