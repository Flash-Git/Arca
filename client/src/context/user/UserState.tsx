import React, { FC, useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import {
  AddRequestedToken,
  ClearAddresses,
  ClearBalance,
  ClearSettings,
  ClearTradePartner,
  ClearUser,
  GetBalance,
  GetOwnedTokens,
  GetRequestedTokens,
  GetSettings,
  SetAddresses,
  UpdateSettings,
  UserState as IUserState
} from "context";

import {
  CLEAR_USER,
  CLEAR_TRADE_PARTNER,
  SET_ADDRESSES,
  CLEAR_ADDRESSES,
  SET_BALANCE,
  CLEAR_BALANCE,
  SET_OWNED_TOKENS,
  SET_REQUESTED_TOKENS,
  ADD_REQUESTED_TOKEN,
  SET_SETTINGS,
  UPDATE_SETTINGS,
  CLEAR_SETTINGS
} from "../types";

const UserState: FC = props => {
  const initialState: IUserState = {
    user: {
      addressObj: {
        address: "",
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
    tradePartner: {
      addressObj: {
        address: "",
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

  const clearUser: ClearUser = () => {
    dispatch({
      type: CLEAR_USER
    });
  };

  const clearTradePartner: ClearTradePartner = () => {
    dispatch({
      type: CLEAR_TRADE_PARTNER
    });
  };

  const setAddresses: SetAddresses = (
    userAddressObj,
    tradePartnerAddressObj
  ) => {
    dispatch({
      type: SET_ADDRESSES,
      payload: { userAddressObj, tradePartnerAddressObj }
    });
  };

  const clearAddresses: ClearAddresses = () => {
    dispatch({
      type: CLEAR_ADDRESSES
    });
  };

  const getBalance: GetBalance = user => {
    //GET balance from db and web3
    const balance = "";
    dispatch({
      type: SET_BALANCE,
      payload: { user, balance }
    });
  };

  const clearBalance: ClearBalance = user => {
    dispatch({
      type: CLEAR_BALANCE,
      payload: user
    });
  };

  const getOwnedTokens: GetOwnedTokens = user => {
    //GET tokens from db and web3 (with map)
    const ownedTokens: any = [];

    dispatch({
      type: SET_OWNED_TOKENS,
      payload: { user, ownedTokens }
    });
  };

  const getRequestedTokens: GetRequestedTokens = user => {
    //GET tokens from db
    const ownedTokens: any = [];

    dispatch({
      type: SET_REQUESTED_TOKENS,
      payload: { user, ownedTokens }
    });
  };

  const addRequestedToken: AddRequestedToken = token => {
    dispatch({
      type: ADD_REQUESTED_TOKEN,
      payload: token
    });
  };

  const getSettings: GetSettings = () => {
    //GET tokens from db
    const settings = {};

    dispatch({
      type: SET_SETTINGS,
      payload: settings
    });
  };

  const updateSettings: UpdateSettings = settings => {
    dispatch({
      type: UPDATE_SETTINGS,
      payload: settings
    });
  };

  const clearSettings: ClearSettings = () => {
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
        setAddresses,
        clearAddresses,
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
