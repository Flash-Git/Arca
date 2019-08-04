import React, { useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import {
  CLEAR_USER,
  CLEAR_TRADE_PARTNER,
  SET_ADDRESS,
  CLEAR_ADDRESS,
  SET_BALANCE,
  CLEAR_BALANCE,
  SET_OWNED_TOKENS,
  SET_REQUESTED_TOKENS,
  ADD_REQUESTED_TOKEN,
  SET_SETTINGS,
  UPDATE_SETTINGS,
  CLEAR_SETTINGS
} from "../types";

const UserState = props => {
  const initialState = {
    user: {
      addressObj: {
        address: "0x",
        ens: "jaquinn.eth"
      },
      balance: null,
      ownedTokens: {
        web3Loading: false,
        dbLoading: false,
        synced: false, //synced is set when loading is set to false
        erc20Tokens: [],
        erc721Tokens: []
      },
      requestedTokens: {
        web3Loading: false,
        dbLoading: false,
        synced: false, //synced is set when loading is set to false
        erc20Tokens: [],
        erc721Tokens: []
      }
    },
    tradePartner: {
      addressObj: {
        address: "0x",
        ens: null
      },
      balance: null,
      ownedTokens: {
        web3Loading: false,
        dbLoading: false,
        synced: false, //synced is set when loading is set to false
        erc20Tokens: [],
        erc721Tokens: []
      },
      requestedTokens: {
        web3Loading: false,
        dbLoading: false,
        synced: false, //synced is set when loading is set to false
        erc20Tokens: [],
        erc721Tokens: []
      }
    },
    settings: {
      nickname: null
    }
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  /*
   * Actions
   */

  const clearUser = () => {
    dispatch({
      type: CLEAR_USER
    });
  };

  const clearTradePartner = () => {
    dispatch({
      type: CLEAR_TRADE_PARTNER
    });
  };

  const getAddress = (user, addressObj) => {
    //GET addressObj from web3state (browser)
    dispatch({
      type: SET_ADDRESS,
      payload: { user, addressObj }
    });
  };

  const clearAddress = user => {
    dispatch({
      type: CLEAR_ADDRESS,
      payload: user
    });
  };

  const getBalance = (user, balance) => {
    //GET balance from db and web3
    dispatch({
      type: SET_BALANCE,
      payload: { user, balance }
    });
  };

  const clearBalance = user => {
    dispatch({
      type: CLEAR_BALANCE,
      payload: user
    });
  };

  const getOwnedTokens = user => {
    //GET tokens from db and web3 (with map)
    const ownedTokens = [];

    dispatch({
      type: SET_OWNED_TOKENS,
      payload: { user, ownedTokens }
    });
  };

  const getRequestedTokens = user => {
    //GET tokens from db
    const ownedTokens = [];

    dispatch({
      type: SET_REQUESTED_TOKENS,
      payload: { user, ownedTokens }
    });
  };

  const addRequestedToken = token => {
    dispatch({
      type: ADD_REQUESTED_TOKEN,
      payload: token
    });
  };

  const getSettings = () => {
    //GET tokens from db
    const settings = {};

    dispatch({
      type: SET_SETTINGS,
      payload: settings
    });
  };

  const updateSettings = settings => {
    dispatch({
      type: UPDATE_SETTINGS,
      payload: settings
    });
  };

  const clearSettings = () => {
    dispatch({
      type: CLEAR_SETTINGS
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        tradePartner: state.tradePartner,
        settings: state.settings,
        clearUser,
        clearTradePartner,
        getAddress,
        clearAddress,
        getBalance,
        clearBalance,
        getOwnedTokens,
        getRequestedTokens,
        addRequestedToken,
        getSettings,
        updateSettings,
        clearSettings
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
