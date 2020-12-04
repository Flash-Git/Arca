import { SET_ADDRESS, SET_BALANCE } from "../types";

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
    default:
      return state;
  }
};

export default PartnerReducer;
