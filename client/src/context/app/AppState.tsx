import React, { FC, useReducer } from "react";

import { SET_LOCATION, TOGGLE_SIDEBAR } from "../types";

import AppContext from "./AppContext";
import AppReducer from "./AppReducer";

import { SetLocation, ToggleSidebar, AppState as IAppState } from "context";

const AppState: FC = props => {
  const initialState: IAppState = {
    location: "home",
    sidebar: true
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  /*
   * Actions
   */

  const setLocation: SetLocation = location => {
    switch (location) {
      case "home":
      case "about":
      case "notFound":
        break;
      default:
        location = "home";
    }

    dispatch({
      type: SET_LOCATION,
      payload: location
    });
  };

  const toggleSidebar: ToggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR
    });
  };

  return (
    <AppContext.Provider
      value={{
        location: state.location,
        sidebar: state.sidebar,
        setLocation,
        toggleSidebar
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
