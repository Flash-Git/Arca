import React, { useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./Web3Reducer";

import { CONNECT_WEB3, UPDATE_WEB3 } from "../types";

const Web3State = props => {
  const initialState = {
    connected: false,
    network: null
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

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

  return (
    <UserContext.Provider
      value={{
        connected: state.connected,
        network: state.network,
        connect,
        updateNetwork
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default Web3State;
