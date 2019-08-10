import { SET_LOCATION, TOGGLE_SIDEBAR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    default:
      return state;
  }
};
