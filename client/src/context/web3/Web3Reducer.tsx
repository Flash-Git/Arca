import {
  ADD_PROVIDER,
  ADD_SIGNER,
  SET_ARCA_ADDRESS,
  SET_ARCA_CONTRACT,
  SET_ERC20_ADDRESSES,
  SET_ERC721_ADDRESSES
} from "../types";

import { Action, Web3State } from "context";

const Web3Reducer = (
  state: Web3State,
  { payload, type }: Action
): Web3State => {
  switch (type) {
    case ADD_PROVIDER:
      return { ...state, providers: [...state.providers, payload] };
    case ADD_SIGNER:
      return { ...state, signers: [...state.signers, payload] };
    case SET_ARCA_ADDRESS:
      return { ...state, arcaAddress: payload };
    case SET_ARCA_CONTRACT:
      return { ...state, arcaContract: payload };
    case SET_ERC20_ADDRESSES:
      return { ...state, erc20Addresses: payload };
    case SET_ERC721_ADDRESSES:
      return { ...state, erc721Addresses: payload };
    default:
      return state;
  }
};

export default Web3Reducer;
