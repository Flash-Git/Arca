import { SET_ADDRESSES } from "../types";

import { Action, UserState } from "context";

const UserReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        user: {
          ...state.user,
          addressObj: action.payload.userAddressObj
        },
        tradePartner: {
          ...state.tradePartner,
          addressObj: action.payload.tradePartnerAddressObj
        }
      };
    default:
      return state;
  }
};

export default UserReducer;
