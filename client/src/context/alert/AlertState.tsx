import React, { FC, useReducer } from "react";
import { v4 as uuid } from "uuid";

import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from "../types";

import { Alerts, AddAlert, RemoveAlert, ClearAlerts } from "context";

const AlertState: FC = props => {
  const initialState: Alerts = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  /*
   * Actions
   */

  const addAlert: AddAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: ADD_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  const removeAlert: RemoveAlert = (id: string) =>
    dispatch({ type: REMOVE_ALERT, payload: id });

  const clearAlerts: ClearAlerts = () => dispatch({ type: CLEAR_ALERTS });

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        addAlert,
        removeAlert,
        clearAlerts
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
