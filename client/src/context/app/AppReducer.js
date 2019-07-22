import { SET_LOCATION } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return action.payload;
    default:
      return state;
  }
};
