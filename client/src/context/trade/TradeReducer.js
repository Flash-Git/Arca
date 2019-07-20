import { ADD_TRADE_ITEM, REMOVE_TRADE_ITEM, SET_CURRENT_ITEM } from "../types";

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
    case SET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload
      };
    case CLEAR_CURRENT_ITEM:
      return {
        ...state,
        currentItem: null
      };
    default:
      return state;
  }
};