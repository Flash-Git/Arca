import { SET_LOCATION, TOGGLE_SIDEBAR } from "../types";

import { Action, AppState } from "context";

const AppReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    default:
      return state;
  }
};

export default AppReducer;
