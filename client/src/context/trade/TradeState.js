import React, { useReducer } from "react";

import TradeContext from "./TradeContext";
import TradeReducer from "./TradeReducer";

import {
  SET_USER_BOX,
  ADD_TRADE_ITEM,
  REMOVE_TRADE_ITEM,
  SET_CURRENT_ITEM,
  CLEAR_CURRENT_ITEM
} from "../types";

import { LOCAL, SENT, UNSENT } from "../sentStatus";

const TradeState = props => {
  const initialState = {
    userBox: 1,
    currentItem: null,
    user: {
      tradeItems: [
        // {
        //   id: "", //uuid,
        //   txHash: null,
        //   web3Loading: false,
        //   dbLoading: false,
        //   synced: false, //lock edits until synced
        //   slot: null,
        //   tab: 0,
        //   type: "",
        //   sent: "",
        //   data: {
        //     contractAdd: "",
        //     id: "", //erc721/ens
        //     amount: "", //erc20
        //     name: "", //ens
        //     verified: false //ens
        //   }
        // }
      ]
    },
    tradePartner: {
      tradeItems: [
        // {
        //   id: "", //uuid,
        //   txHash: null,
        //   web3Loading: false,
        //   dbLoading: false,
        //   synced: false, //lock edits until synced
        //   slot: null,
        //   tab: 0,
        //   type: "",
        //   sent: "",
        //   data: {
        //     contractAdd: "",
        //     id: "", //erc721/ens
        //     amount: "", //erc20
        //     name: "", //ens
        //     verified: false //ens
        //   }
        // }
      ]
    }
  };

  const [state, dispatch] = useReducer(TradeReducer, initialState);

  /*
   * Actions
   */

  const setUserBox = id => {
    dispatch({
      type: SET_USER_BOX,
      payload: id
    });
  };

  const getTradeItems = () => {
    //get user trade items from db
    //get partner trade items from db
    //get user items from contract
    //get partner items from contract
    //dispatch trade items to reducer
  };

  const addTradeItem = tradeItem => {
    dispatch({
      type: ADD_TRADE_ITEM,
      payload: tradeItem
    });
  };

  const cancelTradeItem = id => {
    //cancel trade item on contract
    //remove trade item on db

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
        userBox: state.userBox,
        user: state.user,
        tradePartner: state.tradePartner,
        currentItem: state.currentItem,
        addTradeItem,
        setUserBox,
        setCurrentItem,
        clearCurrentItem
      }}
    >
      {props.children}
    </TradeContext.Provider>
  );
};
export default TradeState;
