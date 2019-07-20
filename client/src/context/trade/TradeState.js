import React, { useReducer } from "react";

import TradeContext from "./TradeContext";
import TradeReducer from "./TradeReducer";

import {
  ADD_TRADE_ITEM,
  REMOVE_TRADE_ITEM,
  SET_CURRENT_ITEM,
  CLEAR_CURRENT_ITEM
} from "../types";

const TradeState = () => {
  const initialState = {
    tradeItems: [],
    currentItem: null
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

  const setCurrentItem = tradeItem => {
    dispatch({
      type: SET_CURRENT_ITEM,
      payload: tradeItem
    });
  };

  const clearCurrentItem = () => {
    dispatch({
      type: CLEAR_CURRENT_ITEM
    });
  };

  return (
    <TradeContext.Provider
      value={{
        tradeItems: state.tradeItems,
        currentItem: state.currentItem,
        addTradeItem,
        removeTradeItem,
        setCurrentItem,
        clearCurrentItem
      }}
    >
      {props.children}
    </TradeContext.Provider>
  );
};
export default TradeState;
