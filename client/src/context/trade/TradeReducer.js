import {
  ADD_TRADE_ITEM,
  SET_USER_TRADE_ITEMS,
  SET_PARTNER_TRADE_ITEMS,
  REMOVE_TRADE_ITEM,
  MODIFY_TRADE_ITEM_STATUS,
  SET_CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
  TOGGLE_ACCEPTED
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_TRADE_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          tradeItems: [...state.user.tradeItems, action.payload]
        }
      };
    case SET_USER_TRADE_ITEMS:
      return {
        ...state,
        user: {
          ...state.user,
          tradeItems: action.payload
        }
      };
    case SET_PARTNER_TRADE_ITEMS:
      return {
        ...state,
        tradePartner: {
          ...state.tradePartner,
          tradeItems: action.payload
        }
      };
    case REMOVE_TRADE_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          tradeItems: state.user.tradeItems.filter(
            item => item.id !== action.payload
          )
        }
      };
    case MODIFY_TRADE_ITEM_STATUS:
      return {
        ...state,
        user: {
          ...state.user,
          tradeItems: state.user.tradeItems.map(
            item =>
              item.id === action.payload.id && {
                ...item,
                network: { ...item.network, status: action.payload.status }
              }
          )
        }
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
    case TOGGLE_ACCEPTED:
      return {
        ...state,
        user: {
          ...state.user,
          accepted: !state.user.accepted
        }
      };
    default:
      return state;
  }
};
