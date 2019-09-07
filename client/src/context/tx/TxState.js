import React, { useReducer, useContext, useEffect } from "react";

import TxContext from "./TxContext";
import TxReducer from "./TxReducer";

import abiErc20 from "./../../web3/abis/abiErc20";
import abiErc721 from "./../../web3/abis/abiErc721";
import abiArca from "./../../web3/abis/abi";

import Web3Context from "./../web3/Web3Context";

import { SET_ARCA, UPDATE_NETWORK, DISCONNECT } from "../types";

const TxState = props => {
  const web3Context = useContext(Web3Context);
  const { web3 } = web3Context;
  //STORE TRANSACTIONS THAT ARE CURRENTLY IN WEB3 STATE IN HERE

  const initialState = {
    // web3: null,
    // ens: null,
    network: null,
    arca: null,
    ercs: [],
    1: {
      address: "",
      arca: null,
      ercs: []
    },
    4: {
      address: "",
      arca: null,
      ercs: []
    }
  };

  const [state, dispatch] = useReducer(TxReducer, initialState);

  /*
   * State
   */

  useEffect(() => {
    try {
      const network = web3.currentProvider.networkVersion;

      if (network !== state.network) {
        setNetwork(network);
      }
    } catch (e) {
      disconnect();
    }
  }, [web3]);

  const erc = address =>
    state.ercs.filter(contract => contract.address === address);

  /*
   * Methods
   */

  const NewContract = (_abi, _add) => {
    try {
      return new web3.eth.Contract(_abi, _add);
    } catch (e) {
      console.log("Failed NewContract:");
      console.log(e);
      return new Error(e);
    }
  };

  const ArcaContract = () => {
    return NewContract(abiArca, AppAddress());
  };

  const Erc20Contract = _add => {
    return NewContract(abiErc20, _add);
  };

  const Erc721Contract = _add => {
    return NewContract(abiErc721, _add);
  };

  /*
   * Actions
   */

  const updateNetwork = network => {
    //Switches arca, ercs and network
    dispatch({
      type: UPDATE_NETWORK,
      payload: network
    });
  };

  const disconnect = () => {
    dispatch({
      type: DISCONNECT
    });
  };

  const setArca = async () => {
    try {
      const arca = await NewContract(abiArca, AppAddress());
      dispatch({
        type: SET_ARCA,
        payload: arca
      });
    } catch (e) {
      //Alert
    }
  };

  const addErc = async () => {
    try {
      const arca = await NewContract(abiArca, AppAddress());
      dispatch({
        type: SET_ARCA,
        payload: arca
      });
    } catch (e) {
      //Alert
    }
  };

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
    <TxContext.Provider
      value={{
        arca: state.arca,
        erc,
        setArca
      }}
    >
      {props.children}
    </TxContext.Provider>
  );
};
export default TxState;
