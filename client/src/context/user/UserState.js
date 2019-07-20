import React, { useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import {
  SET_USER,
  SET_TRADE_PARTNER,
  CLEAR_USER,
  CLEAR_TRADE_PARTNER
} from "../types";

const UserState = props => {
  const initialState = {
    user: {
      address: "",
      ens: null,
      balance: null,
      ownedTokens: {
        erc20Tokens: [],
        erc721Tokens: []
      },
      requestedTokens: {
        erc20Tokens: [],
        erc721Tokens: []
      }
    },
    tradePartner: {
      address: "",
      ens: null,
      balance: null,
      ownedTokens: {
        erc20Tokens: [],
        erc721Tokens: []
      },
      requestedTokens: {
        erc20Tokens: [],
        erc721Tokens: []
      }
    }
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  /*
   * Actions
   */

  const setUser = user => {
    dispatch({
      type: SET_USER,
      payload: user
    });
  };

  const setTradePartner = tradePartner => {
    dispatch({
      type: SET_TRADE_PARTNER,
      payload: tradePartner
    });
  };

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

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        tradePartner: state.tradePartner,
        setUser,
        setTradePartner,
        clearUser,
        clearTradePartner
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
