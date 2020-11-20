import { SET_ADDRESSES } from "../types";

export default (state, action) => {
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
