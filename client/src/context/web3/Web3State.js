import React, { useReducer, useContext } from "react";
import uuid from "uuid";

import Web3Context from "./Web3Context";
import Web3Reducer from "./Web3Reducer";
import AlertContext from "../alert/AlertContext";

import abi from "../../abis/abi";
import abiErc20 from "../../abis/abiErc20";
import abiErc721 from "../../abis/abiErc721";

import {
  CONNECT_WEB3,
  UPDATE_WEB3,
  ADD_CONTRACT_OBJECT,
  REMOVE_CONTRACT_OBJECT,
  CONTRACT_OBJECT_ERROR
} from "../types";

const Web3State = props => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const initialState = {
    web3: null,
    connected: false,
    network: null,
    activeReqs: [],
    completedReqs: [],
    activeTxs: [],
    completedTxs: []
  };

  // {
  //   id: "",//uuid.v4(),
  //   type: "",
  //   date,// Date.now()
  // }

  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  /*
   * Actions
   */

  const connect = () => {
    dispatch({
      type: CONNECT_WEB3
    });
  };

  const updateNetwork = () => {
    dispatch({
      type: UPDATE_WEB3
    });
  };

  const addContractObj = async (address, abiName) => {
    const abi = await getAbi(abiName);

    if (!abi) {
      setAlert(`Failed get abi ${abiName}`, "danger");
      return;
    }

    try {
      //Create contract obj

      dispatch({
        type: ADD_CONTRACT_OBJECT,
        payload: { address, abi }
      });
    } catch {
      dispatch({
        type: CONTRACT_OBJECT_ERROR
      });
    }
  };

  const getAbi = async abiName => {
    switch (abiName) {
      case "arca":
        return abi;
      case "erc20":
        return abiErc20;
      case "erc721":
        return abiErc721;
      default:
        return null;
    }
  };

  /*
  const getERC20Token = (tokenAddress, userAddress) => {
    dispatch({
      type: GET_ERC20,
      payload: { tokenAddress, userAddress }
    });
  };

  const getERC721Token = (tokenAddress, userAddress) => {
    dispatch({
      type: GET_ERC721,
      payload: { tokenAddress, userAddress }
    });
  };

  const getENSItem = (id, userAddress) => {
    dispatch({
      type: GET_ENS_ITEM,
      payload: { id, userAddress }
    });
  };
*/

  return (
    <Web3Context.Provider
      value={{
        web3: state.web3,
        connected: state.connected,
        network: state.network,
        activeReqs: state.activeReqs,
        completedReqs: state.completedReqs,
        activeTxs: state.activeTxs,
        completedTxs: state.completedTxs,
        connect,
        updateNetwork
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3State;
