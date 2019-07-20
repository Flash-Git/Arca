import React, { useReducer } from "react";

import EnsContext from "./EnsContext";
import EnsReducer from "./EnsReducer";

import {} from "../types";

const EnsState = props => {
  const initialState = {};

  const [state, dispatch] = useReducer(EnsReducer, initialState);

  /*
   * Actions
   */

  //Get erc721 id out of name => namehash => id

  return <EnsContext.Provider value={{}}>{props.children}</EnsContext.Provider>;
};
export default EnsState;
