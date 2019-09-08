import React, { useReducer, useContext, useEffect } from "react";
import ENS from "ethereum-ens";

import Web3Context from "./Web3Context";
import Web3Reducer from "./Web3Reducer";

import abiErc20 from "../../web3/abis/abiErc20";
import abiErc721 from "../../web3/abis/abiErc721";
import abiArca from "../../web3/abis/abi";

import {
  SET_ARCA,
  ADD_ERC,
  UPDATE_NETWORK,
  CONNECT_WEB3,
  CONNECT_ENS,
  DISCONNECT
} from "../types";

const Web3State = props => {
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

  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  /*
   * State
   */

  useEffect(() => {
    connectWeb3(window.web3);
  }, [window.web3]);

  useEffect(() => {
    if (state.web3 === null) return;
    const network = +state.web3.currentProvider.networkVersion;

    if (network !== state.network) {
      updateNetwork(network);
    }
  }, [state.web3]);

  useEffect(() => {
    if (state.web3 === null) return;
    state.ens === null && connectEns();
  }, [state.web3]);

  useEffect(() => {
    if (state.arca === null) {
      setArca();
    }
  }, [state.network]);

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

  const ArcaCalls = (_method, _params, _contract = state.arca) => {
    try {
      switch (_method) {
        case "getErc20Count": //address _add1, address _add2, uint256 _boxNum
          return _contract.methods
            .getErc20Count(_params[0], _params[1], "0")
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getErc721Count": //address _add1, address _add2, uint256 _boxNum
          return _contract.methods
            .getErc721Count(_params[0], _params[1], "0")
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getNonce": //address _add1, address _add2, uint256 _boxNum
          return _contract.methods.getNonce(_params[0], _params[1], "0").call({
            from: window.ethereum.selectedAddress
          });
        case "getPartnerNonce": //address _add1, address _add2, uint256 _boxNum
          return _contract.methods
            .getPartnerNonce(_params[0], _params[1], "0")
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getOfferErc20": //address _add1, address _add2, uint256 _boxNum, uint8 _index
          return _contract.methods
            .getOfferErc20(_params[0], _params[1], "0", _params[2])
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getOfferErc721": //address _add1, address _add2, uint256 _boxNum, uint8 _index
          return _contract.methods
            .getOfferErc721(_params[0], _params[1], "0", _params[2])
            .call({
              from: window.ethereum.selectedAddress
            });
        default:
          console.log("Invalid method name: " + _method);
      }
    } catch (e) {
      console.log("Failed ArcaCall:");
      console.log(e);
      return new Error(e);
    }
  };

  const ErcCalls = (_method, _contract) => {
    try {
      switch (_method) {
        case "decimals":
          return _contract.methods.decimals().call({
            from: window.ethereum.selectedAddress
          });
        case "balanceOf":
          return _contract.methods
            .balanceOf(window.ethereum.selectedAddress)
            .call({
              from: window.ethereum.selectedAddress
            });
        case "symbol":
          return _contract.methods.symbol().call({
            from: window.ethereum.selectedAddress
          });
        case "name":
          return _contract.methods.name().call({
            from: window.ethereum.selectedAddress
          });
        case "allowance":
          return _contract.methods
            .allowance(window.ethereum.selectedAddress, state.address)
            .call({
              from: window.ethereum.selectedAddress
            });
        case "isApprovedForAll":
          return _contract.methods
            .isApprovedForAll(window.ethereum.selectedAddress, state.address)
            .call({
              from: window.ethereum.selectedAddress
            });
        default:
          console.log("Invalid method name: " + _method);
      }
    } catch (e) {
      console.log("Failed ErcCall:");
      console.log(e);
      return new Error(e);
    }
  };

  const ArcaSends = (_method, _params, _contract = state.arca) => {
    try {
      switch (_method) {
        case "pushOfferErc20": //address _tradePartner, uint256 _boxNum, address _erc20Address, uint256 _amount
          return Tx(
            _contract.methods
              .pushOfferErc20(_params[0], "0", _params[1], _params[2])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "pushOfferErc721": //address _tradePartner, uint256 _boxNum, address _erc721Address, uint256 _id
          return Tx(
            _contract.methods
              .pushOfferErc721(_params[0], "0", _params[1], _params[2])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "removeOfferErc20": //address _tradePartner, uint256 _boxNum, uint8 _index
          return Tx(
            _contract.methods
              .removeOfferErc20(_params[0], "0", _params[1])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "removeOfferErc721": //address _tradePartner, uint256 _boxNum, uint8 _index
          return Tx(
            _contract.methods
              .removeOfferErc721(_params[0], "0", _params[1])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "acceptTrade": //address _tradePartner, uint256 _boxNum, uint256 _partnerNonce
          return Tx(
            _contract.methods.acceptTrade(_params[0], "0", _params[1]).send({
              from: window.ethereum.selectedAddress
            })
          );
        case "unacceptTrade": //address _tradePartner, uint256 _boxNum
          return Tx(
            _contract.methods.unacceptTrade(_params[0], "0").send({
              from: window.ethereum.selectedAddress
            })
          );
        default:
          console.log("Invalid method name: " + _method);
      }
    } catch (e) {
      console.log("Failed ArcaSend:");
      console.log(e);
      return new Error(e);
    }
  };

  const ErcSends = (_method, _params, _contract = state.arca) => {
    try {
      switch (_method) {
        case "approve":
          return Tx(
            _contract.methods
              .approve(state.address, "100000000000000000000000000000000000")
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "setApprovalForAll":
          return Tx(
            _contract.methods.setApprovalForAll(state.address, true).send({
              from: window.ethereum.selectedAddress
            })
          );
        default:
          console.log("Invalid method name: " + _method);
      }
    } catch (e) {
      console.log("Failed ErcSend:");
      console.log(e);
      return new Error(e);
    }
  };

  const NewContract = (_abi, _add) => {
    try {
      return new state.web3.eth.Contract(_abi, _add);
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
      payload: web3
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
    <Web3Context.Provider
      value={{
        arca: state.arca,
        web3: state.web3,
        ens: state.ens,
        network: state.network,
        connectWeb3,
        erc,
        addErc20,
        addErc721,
        sendTx
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
export default Web3State;
