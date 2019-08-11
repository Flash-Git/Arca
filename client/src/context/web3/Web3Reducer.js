import {
  CONNECT_WEB3,
  CONNECT_ENS,
  DISCONNECT_WEB3,
  DISCONNECT_ENS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CONNECT_WEB3:
      return {
        ...state,
        web3: action.payload.web3,
        network: action.payload.network,
        connected: true
      };
    case CONNECT_ENS:
      return {
        ...state,
        ens: action.payload
      };
    default:
      return state;
  }
};
