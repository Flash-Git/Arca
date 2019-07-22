import React, { useReducer } from "react";
import uuid from "uuid";
import EnsContext from "./EnsContext";
import EnsReducer from "./EnsReducer";

import { SET_UTIL_CONTRACT } from "../types";

const EnsState = props => {
  const initialState = {
    utilContract: null
  };

  const [state, dispatch] = useReducer(EnsReducer, initialState);

  /*
   * Actions
   */

  const setUtilContract = (address) => {
    dispatch({
      type: SET_UTIL_CONTRACT,
      payload: { address }
    });
  }

  //Get erc721 id out of name => namehash => id

  return (
    <EnsContext.Provider value={{
      utilContract: state.utilContract,
      setUtilContract
    }}>
      {props.children}
    </EnsContext.Provider>
  )
};

export default EnsState;
