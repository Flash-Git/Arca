import {
  SET_ADDRESS,
  SET_BALANCE,
  SET_ERC20_ITEMS,
  SET_ERC721_ITEMS,
  SET_ACCEPTED
} from "../types";

import { Action, PartnerState } from "context";

const PartnerReducer = (
  state: PartnerState,
  { payload, type }: Action
): PartnerState => {
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
    default:
      return state;
  }
};

export default PartnerReducer;
