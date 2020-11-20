import React, { useReducer, useContext, FC } from "react";
import uuid from "uuid";

import TradeContext from "./TradeContext";
import TradeReducer from "./TradeReducer";

import UserContext from "../user/UserContext";

import {
  SET_USER_BOX,
  ADD_TRADE_ITEM,
  SET_USER_ACCEPTED,
  SET_PARTNER_ACCEPTED,
  SET_USER_TRADE_ITEMS,
  SET_PARTNER_TRADE_ITEMS,
  REMOVE_TRADE_ITEM,
  MODIFY_TRADE_ITEM_STATUS,
  SET_CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
  UPDATE_ACCEPTED,
  TOGGLE_ACCEPTED
} from "../types";

import { SENT, UNSENT } from "../sentStatus";

import {
  UserContext as IUserContext,
  TradeState as ITradeState,
  User,
  AddTradeItem,
  CancelTradeItem,
  GetTradeItems,
  SetPartnerAccepted,
  SetPartnerItems,
  SetUserAccepted,
  SetUserBox,
  SetUserItems,
  SetCurrentItem,
  ModifyTradeItemStatus,
  ClearCurrentItem,
  ToggleAccepted,
  GetAccepted,
  Box
} from "context";

const TradeState: FC = props => {
  const initialState: ITradeState = {
    userBox: 1,
    currentItem: null,
    user: {
      tradeItems: [
        {
          id: uuid.v4(),
          network: {
            status: UNSENT,
            txHash: null,
            web3Loading: false,
            dbLoading: false,
            synced: true,
            slot: 0,
            tab: 0
          },
          data: {
            type: "erc20",
            contractAdd: "0x1",
            amount: "50"
          }
        },
        {
          id: uuid.v4(),
          network: {
            status: UNSENT,
            txHash: null,
            web3Loading: false,
            dbLoading: false,
            synced: true,
            slot: 1,
            tab: 0
          },
          data: {
            type: "erc20",
            contractAdd: "0x2",
            amount: "10"
          }
        },
        {
          id: uuid.v4(),
          network: {
            status: SENT,
            txHash: "0x",
            web3Loading: false,
            dbLoading: false,
            synced: true,
            slot: 2,
            tab: 0
          },
          data: {
            type: "erc721",
            contractAdd: "0x",
            id: "52"
          }
        },
        {
          id: uuid.v4(),
          network: {
            status: SENT,
            txHash: "0x",
            web3Loading: false,
            dbLoading: false,
            synced: true,
            slot: 3,
            tab: 0
          },
          data: {
            type: "ens",
            contractAdd: "0x",
            id: "5",
            name: "jimmy.eth",
            namehash: "0xnamehash",
            verified: true
          }
        },
        {
          id: uuid.v4(),
          network: {
            status: SENT,
            txHash: "0x2",
            web3Loading: false,
            dbLoading: false,
            synced: true,
            slot: 4,
            tab: 0
          },
          data: {
            type: "ens",
            contractAdd: "0x",
            id: "5",
            name: "jimmy.eth",
            namehash: "0xnamehash",
            verified: true
          }
        }
      ],
      accepted: true
    },
    tradePartner: {
      tradeItems: [
        {
          id: uuid.v4(),
          network: {
            status: UNSENT,
            txHash: null,
            web3Loading: false,
            dbLoading: false,
            synced: true,
            slot: 0,
            tab: 0
          },
          data: {
            type: "erc20",
            contractAdd: "0x",
            amount: ""
          }
        }
      ],
      accepted: null
    }
  };

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

  const [state, dispatch] = useReducer(TradeReducer, initialState);

  const userContext: IUserContext = useContext(UserContext);

  const getAddress = (user: Box) =>
    user
      ? userContext.user.addressObj.address
      : userContext.tradePartner.addressObj.address;

  /*
   * Actions
   */

  const setUserBox: SetUserBox = id => {
    dispatch({
      type: SET_USER_BOX,
      payload: id
    });
  };

  const setUserItems: SetUserItems = tradeItems => {
    dispatch({
      type: SET_USER_TRADE_ITEMS,
      payload: tradeItems
    });
  };

  const setPartnerItems: SetPartnerItems = tradeItems => {
    dispatch({
      type: SET_PARTNER_TRADE_ITEMS,
      payload: tradeItems
    });
  };

  const getTradeItems: GetTradeItems = () => {
    //get user trade items from db
    //get partner trade items from db
    //get user items from contract
    //get partner items from contract
    //dispatch trade items to reducer
  };

  const addTradeItem: AddTradeItem = tradeItem => {
    dispatch({
      type: ADD_TRADE_ITEM,
      payload: tradeItem
    });
  };

  const setUserAccepted: SetUserAccepted = accepted => {
    dispatch({
      type: SET_USER_ACCEPTED,
      payload: accepted
    });
  };

  const setPartnerAccepted: SetPartnerAccepted = accepted => {
    dispatch({
      type: SET_PARTNER_ACCEPTED,
      payload: accepted
    });
  };

  const cancelTradeItem: CancelTradeItem = id => {
    // cancel trade item on contract
    // remove trade item on db

    dispatch({
      type: REMOVE_TRADE_ITEM,
      payload: id
    });
  };

  const modifyTradeItemStatus: ModifyTradeItemStatus = (id, status) => {
    dispatch({
      type: MODIFY_TRADE_ITEM_STATUS,
      payload: { id, status }
    });
  };

  const setCurrentItem: SetCurrentItem = tradeItem => {
    dispatch({
      type: SET_CURRENT_ITEM,
      payload: tradeItem
    });
  };

  const clearCurrentItem: ClearCurrentItem = () => {
    dispatch({
      type: CLEAR_CURRENT_ITEM
    });
  };

  const getAccepted: GetAccepted = id => {
    const address = getAddress(id);

    //get accepted from db
    //get accepted from web3 (added to WEB3STATE CALLS)
    const accepted = false;
    dispatch({
      type: UPDATE_ACCEPTED,
      payload: { id, accepted }
    });
  };

  const toggleAccepted: ToggleAccepted = () => {
    //set accepted on contract
    //set accepted on db

    dispatch({
      type: TOGGLE_ACCEPTED
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
        setUserAccepted,
        setPartnerAccepted,
        setUserItems,
        setPartnerItems,
        cancelTradeItem,
        modifyTradeItemStatus,
        setUserBox,
        setCurrentItem,
        clearCurrentItem,
        getAccepted,
        toggleAccepted,
        getTradeItems
      }}
    >
      {props.children}
    </TradeContext.Provider>
  );
};
export default TradeState;
