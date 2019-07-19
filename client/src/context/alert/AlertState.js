import React, { useReducer } from "react";
import uuid from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "../types";

import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

const AlertState = () => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  /*
   * Actions
   */

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
