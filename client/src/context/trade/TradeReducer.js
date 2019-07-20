import { ADD_TRADE_ITEM, REMOVE_TRADE_ITEM } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_TRADE_ITEM:
      return {
        ...state,
        tradeItems: [...state.tradeItems, action.payload]
      };
    case REMOVE_TRADE_ITEM:
      return {
        ...state,
        tradeItems: state.tradeItems.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};
