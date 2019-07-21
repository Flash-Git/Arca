import React, { useReducer } from "react";

import Web3Context from "./Web3Context";
import Web3Reducer from "./Web3Reducer";

import {
  CONNECT_WEB3,
  UPDATE_WEB3
} from "../types";

const Web3State = props => {
  const initialState = {
    connected: false,
    network: null,
    loading: false
  };

  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  /*
   * Actions
   */

  const connect = () => {
    dispatch({
      type: CONNECT_WEB3
    });
  };

  const updateNetwork = () => {
    dispatch({
      type: UPDATE_WEB3
    });
  };
/*
  const getERC20Token = (tokenAddress, userAddress) => {
    dispatch({
      type: GET_ERC20,
      payload: { tokenAddress, userAddress }
    });
  };

  const getERC721Token = (tokenAddress, userAddress) => {
    dispatch({
      type: GET_ERC721,
      payload: { tokenAddress, userAddress }
    });
  };

  const getENSItem = (id, userAddress) => {
    dispatch({
      type: GET_ENS_ITEM,
      payload: { id, userAddress }
    });
  };
*/
  return (
    <Web3Context.Provider
      value={{
        connected: state.connected,
        network: state.network,
        loading: state.loading,
        connect,
        updateNetwork
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3State;
