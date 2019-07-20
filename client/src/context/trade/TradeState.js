import React, { useReducer } from "react";

import { ADD_TRADE_ITEM, REMOVE_TRADE_ITEM } from "../types";

import TradeContext from "./TradeContext";
import TradeReducer from "./TradeReducer";

const TradeState = () => {
  const initialState = {
    tradeItems: []
  };

  const [state, dispatch] = useReducer(TradeReducer, initialState);

  /*
   * Actions
   */

  const addTradeItem = tradeItem => {
    dispatch({
      type: ADD_TRADE_ITEM,
      payload: tradeItem
    });
  };

  const removeTradeItem = id => {
    dispatch({
      type: REMOVE_TRADE_ITEM,
      payload: id
    });
  };

  return (
    <TradeContext.Provider
      value={{
        tradeItems: state.tradeItems,
        addTradeItem,
        removeTradeItem
      }}
    >
      {props.children}
    </TradeContext.Provider>
  );
};
export default TradeState;
