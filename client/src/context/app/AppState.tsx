import React, { useReducer } from "react";

import { SET_LOCATION, TOGGLE_SIDEBAR } from "../types";

import AppContext from "./AppContext";
import AppReducer from "./AppReducer";

const AppState = props => {
  const initialState = {
    location: "",
    sidebar: true
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  /*
   * Actions
   */

  const setLocation = location => {
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

  const toggleSidebar = () => {
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
