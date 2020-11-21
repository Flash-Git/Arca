import {
  CONNECT,
  CONNECT_WEB3,
  CONNECT_ENS,
  UPDATE_NETWORK,
  SET_ARCA,
  ADD_ERC,
  DISCONNECT
} from "../types";

import { Action, Web3State } from "context";

const Web3Reducer = (state: Web3State, action: Action): Web3State => {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        connected: true
      };
    case CONNECT_WEB3:
      return {
        ...state,
        web3: action.payload
      };
    case CONNECT_ENS:
      return {
        ...state,
        ens: action.payload
      };
    case UPDATE_NETWORK:
      switch (action.payload) {
        case 1:
          return {
            ...state,
            network: action.payload,
            ...state.main
          };
        case 4:
          return {
            ...state,
            network: action.payload,
            ...state.rinkeby
          };
        case 5:
          return {
            ...state,
            network: action.payload,
            ...state.goerli
          };
        default:
          return state;
      }
    case SET_ARCA:
      switch (state.network) {
        case 1:
          return {
            ...state,
            main: { ...state.main, arca: action.payload }
          };
        case 4:
          return {
            ...state,
            rinkeby: { ...state.main, arca: action.payload }
          };
        case 5:
          return {
            ...state,
            goerli: { ...state.main, arca: action.payload }
          };
        default:
          return state;
      }
    case ADD_ERC:
      switch (state.network) {
        case 1:
          return {
            ...state,
            main: {
              ...state.main,
              ercs: [...state.main.ercs, action.payload]
            }
          };
        case 4:
          return {
            ...state,
            rinkeby: {
              ...state.main,
              ercs: [...state.rinkeby.ercs, action.payload]
            }
          };
        case 5:
          return {
            ...state,
            goerli: {
              ...state.main,
              ercs: [...state.goerli.ercs, action.payload]
            }
          };
        default:
          return state;
      }
    case DISCONNECT:
      return {
        ...state,
        web3: null,
        ens: null,
        network: null,
        address: "",
        arca: null,
        ercs: []
      };
    default:
      return state;
  }
};

export default Web3Reducer;
