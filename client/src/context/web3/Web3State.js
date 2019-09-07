import React, { useReducer, useContext } from "react";
import ENS from "ethereum-ens";

import uuid from "uuid";

import {
  ArcaCalls,
  ErcCalls,
  Erc20Contract,
  Erc721Contract,
  Tx
} from "../../web3/Web3Calls";
import abi from "../../web3/abis/abi";
import abiErc20 from "../../web3/abis/abiErc20";
import abiErc721 from "../../web3/abis/abiErc721";

import Web3Context from "./Web3Context";
import Web3Reducer from "./Web3Reducer";
import AlertContext from "../alert/AlertContext";

import {
  CONNECT_WEB3,
  CONNECT_ENS,
  DISCONNECT_WEB3,
  DISCONNECT_ENS,
  UPDATE_NETWORK,
  ADD_CONTRACT_OBJECT,
  REMOVE_CONTRACT_OBJECT,
  CONTRACT_OBJECT_ERROR
} from "../types";
import { MAIN, RINKEBY, GOERLI } from "../networkStatus";

const Web3State = props => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const initialState = {
    web3: null,
    ens: null,
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
    const web3 = window.web3;
    if (!web3) {
      dispatch({
        type: DISCONNECT_WEB3
      });
      return false;
    }

    const network = +web3.currentProvider.networkVersion;

    dispatch({
      type: CONNECT_WEB3,
      payload: { web3, network }
    });

    connectEns();
  };

  const connectEns = async () => {
    const ens = await new ENS(state.web3.currentProvider);
    if (!ens) {
      dispatch({
        type: DISCONNECT_ENS
      });
      return false;
    }

    dispatch({
      type: CONNECT_ENS,
      payload: ens
    });
    console.log(state.ens);

    return true;
  };

  const updateNetwork = () => {
    dispatch({
      type: UPDATE_NETWORK
    });
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

  const sendTx = txData => {
    //txData.method;
    //txData.contractType;
    //txData.params;
    //txData.ercAddress;

    let tx;
    let hash = "";

    switch (txData.contractType) {
      case "ARCA":
        tx = Tx(ArcaCalls(txData.method, txData.params));
        break;
      case "ERC20":
        tx = Tx(ErcCalls(txData.method, Erc20Contract(txData.ercAddress)));
        break;
      case "ERC721":
        tx = Tx(ErcCalls(txData.method, Erc721Contract(txData.ercAddress)));
        break;
      default:
        console.log("Failed to send tx");
    }
    console.log(tx);
  };

  return (
    <Web3Context.Provider
      value={{
        web3: state.web3,
        ens: state.ens,
        connected: state.connected,
        network: state.network,
        activeReqs: state.activeReqs,
        completedReqs: state.completedReqs,
        activeTxs: state.activeTxs,
        completedTxs: state.completedTxs,
        connect,
        updateNetwork,
        sendTx
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3State;
