import React, { useReducer, useContext, useEffect } from "react";
import ENS from "ethereum-ens";

import TxContext from "./TxContext";
import TxReducer from "./TxReducer";

import abiErc20 from "./../../web3/abis/abiErc20";
import abiErc721 from "./../../web3/abis/abiErc721";
import abiArca from "./../../web3/abis/abi";

import {
  SET_ARCA,
  ADD_ERC,
  UPDATE_NETWORK,
  CONNECT_WEB3,
  CONNECT_ENS,
  DISCONNECT
} from "../types";

const TxState = props => {
  //STORE TRANSACTIONS THAT ARE CURRENTLY IN WEB3 STATE IN HERE

  const initialState = {
    web3: null,
    ens: null,
    network: null,
    address: "",
    arca: null,
    ercs: [],
    main: {
      address: "0xb8F590D50D7d58A5BCd1e669209375026aFb1123",
      arca: null,
      ercs: []
    },
    rinkeby: {
      address: "0x255bca69542f6515af3b172223e903dfb302038b",
      arca: null,
      ercs: []
    },
    goerli: {
      address: "0x005f729ec568b2e2c69fb3bca7637b49e59ed5c1",
      arca: null,
      ercs: []
    }
  };

  const [state, dispatch] = useReducer(TxReducer, initialState);

  /*
   * State
   */

  useEffect(() => {
    connectWeb3(window.web3);
  }, [window.web3]);

  useEffect(() => {
    if (web3 === null) return;
    const network = web3.currentProvider.networkVersion;

    if (network !== state.network) {
      updateNetwork(network);
    }
  }, [web3]);

  useEffect(() => {
    if (web3 === null) return;
    connectEns();
  }, [web3]);

  const erc = address =>
    state.ercs.filter(contract => contract.address === address);

  /*
   * Methods
   */

  const Tx = _promise => {
    return new Promise((resolve, reject) => {
      _promise.on("transactionHash", hash => {
        alert("Tx Sent");
        console.log("TxHash: " + hash);
      });
      /*_promise.on("receipt", receipt => {
        console.log("Receipt received");
        return resolve();
      });*/
      _promise.on("confirmation", (confirmation, receipt) => {
        //console.log("Confirmation: " + confirmation);
        if (confirmation === 1) {
          console.log("Receipt found");
        }
        if (confirmation > 1) {
          console.log("Receipt received");
          return resolve();
        }
      });
      _promise.on("error", e => {
        console.log("Error in tx execution:");
        console.log(e);
        return reject(e);
      });
      _promise.catch(e => {
        console.log("Error in tx send:");
        console.log(e);
        return reject(e);
      });
    });
  };

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
    return NewContract(abiArca, state.address);
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

  const connectWeb3 = web3 => {
    if (web3 === null) {
      disconnect();
      return;
    }
    dispatch({
      type: CONNECT_WEB3,
      payload: { web3 }
    });
  };

  const connectEns = async () => {
    const ens = await new ENS(state.web3.currentProvider);

    dispatch({
      type: CONNECT_ENS,
      payload: ens
    });
  };

  const updateNetwork = network => {
    //Switches address, arca, ercs, network
    dispatch({
      type: UPDATE_NETWORK,
      payload: network
    });
    if (state.arca === null) {
      setArca();
    }
  };

  const disconnect = () => {
    dispatch({
      type: DISCONNECT
    });
  };

  const setArca = async () => {
    try {
      const arca = await ArcaContract();
      dispatch({
        type: SET_ARCA,
        payload: arca
      });
    } catch (e) {
      //Alert
    }
  };

  const addErc20 = async _address => {
    try {
      const erc = await Erc20Contract(_address);
      dispatch({
        type: ADD_ERC,
        payload: erc
      });
    } catch (e) {
      //Alert
    }
  };

  const addErc721 = async _address => {
    try {
      const erc = await Erc721Contract(_address);
      dispatch({
        type: ADD_ERC,
        payload: erc
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
        addErc20,
        addErc721,
        sendTx
      }}
    >
      {props.children}
    </TxContext.Provider>
  );
};
export default TxState;
