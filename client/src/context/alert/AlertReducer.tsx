import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from "../types";

import { Action, Alerts } from "context";

const AlertReducer = (state: Alerts, action: Action): Alerts => {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    case CLEAR_ALERTS:
      return [];
    default:
      return state;
  }
};

export default AlertReducer;
