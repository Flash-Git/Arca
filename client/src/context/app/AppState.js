import React, { useReducer } from "react";

import { SET_LOCATION } from "../types";

import AppContext from "./AppContext";
import AppReducer from "./AppReducer";

const AppState = props => {
  const location = "";
  const initialState = location;

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

  return (
    <AppContext.Provider
      value={{
        location: state,
        setLocation
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
