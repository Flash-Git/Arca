import React, { useReducer, useContext, useEffect } from "react";
import Web3 from "web3";
import ENS from "ethereum-ens";

import Web3Context from "./Web3Context";
import Web3Reducer from "./Web3Reducer";

import abiErc20 from "../../web3/abis/abiErc20";
import abiErc721 from "../../web3/abis/abiErc721";
import abiArca from "../../web3/abis/abi";

import {
  CONNECT,
  SET_ARCA,
  ADD_ERC,
  UPDATE_NETWORK,
  CONNECT_WEB3,
  CONNECT_ENS,
  DISCONNECT
} from "../types";

const Web3State = props => {
  const initialState = {
    connected: false,
    web3: null,
    ens: null,
    network: null,
    address: "",
    arca: null,
    ercs: [],
    main: {
      address: "0xb8F590D50D7d58A5BCd1e669209375026aFb1123",
      arca: null,
      ercs: [] //{address, type, contract}
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
    if (!window.web3) return;
    connectWeb3(new Web3(Web3.givenProvider));
  }, [window.web3]);

  useEffect(() => {
    if (!state.web3) return;

    state.ens === null && connectEns();
  }, [state.web3]);

  useEffect(() => {
    if (!state.web3) return;

    const network = +state.web3.currentProvider.networkVersion;
    network !== state.network && updateNetwork(network);
  }, [state.web3]);

  useEffect(() => {
    if (!state.connected) return;

    setArca();
  }, [state.network]);

  window.ethereum.on("accountsChanged", accounts => {
    //Update User TODO
    // Time to reload your interface with accounts[0]!
  });

  window.ethereum.on("networkChanged", network => {
    network = +network;
    network !== state.network && updateNetwork(network);
  });

  const getErc = address => state.ercs.filter(erc => erc.address === address);

  /*
   * Methods
   */

  const ArcaCalls = async (_method, _params) => {
    const contract = await getArcaContract();
    if (!contract) return;

    try {
      switch (_method) {
        case "getErc20Count": //address _add1, address _add2, uint256 _boxNum
          return contract.methods
            .getErc20Count(_params[0], _params[1], "0")
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getErc721Count": //address _add1, address _add2, uint256 _boxNum
          return contract.methods
            .getErc721Count(_params[0], _params[1], "0")
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getNonce": //address _add1, address _add2, uint256 _boxNum
          return contract.methods.getNonce(_params[0], _params[1], "0").call({
            from: window.ethereum.selectedAddress
          });
        case "getPartnerNonce": //address _add1, address _add2, uint256 _boxNum
          return contract.methods
            .getPartnerNonce(_params[0], _params[1], "0")
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getOfferErc20": //address _add1, address _add2, uint256 _boxNum, uint8 _index
          return contract.methods
            .getOfferErc20(_params[0], _params[1], "0", _params[2])
            .call({
              from: window.ethereum.selectedAddress
            });
        case "getOfferErc721": //address _add1, address _add2, uint256 _boxNum, uint8 _index
          return contract.methods
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

  const ErcCalls = async (_method, _address, _type) => {
    const contract = await getErcContract(_address, _type);
    try {
      switch (_method) {
        case "decimals":
          return contract.methods.decimals().call({
            from: window.ethereum.selectedAddress
          });
        case "balanceOf":
          return contract.methods
            .balanceOf(window.ethereum.selectedAddress)
            .call({
              from: window.ethereum.selectedAddress
            });
        case "symbol":
          return contract.methods.symbol().call({
            from: window.ethereum.selectedAddress
          });
        case "name":
          return contract.methods.name().call({
            from: window.ethereum.selectedAddress
          });
        case "allowance":
          return contract.methods
            .allowance(window.ethereum.selectedAddress, state.address)
            .call({
              from: window.ethereum.selectedAddress
            });
        case "isApprovedForAll":
          return contract.methods
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

  const ArcaSends = async (_method, _params) => {
    const contract = await getArcaContract();

    try {
      switch (_method) {
        case "pushOfferErc20": //address _tradePartner, uint256 _boxNum, address _erc20Address, uint256 _amount
          return Tx(
            contract.methods
              .pushOfferErc20(_params[0], "0", _params[1], _params[2])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "pushOfferErc721": //address _tradePartner, uint256 _boxNum, address _erc721Address, uint256 _id
          return Tx(
            contract.methods
              .pushOfferErc721(_params[0], "0", _params[1], _params[2])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "removeOfferErc20": //address _tradePartner, uint256 _boxNum, uint8 _index
          return Tx(
            contract.methods
              .removeOfferErc20(_params[0], "0", _params[1])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "removeOfferErc721": //address _tradePartner, uint256 _boxNum, uint8 _index
          return Tx(
            contract.methods
              .removeOfferErc721(_params[0], "0", _params[1])
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "acceptTrade": //address _tradePartner, uint256 _boxNum, uint256 _partnerNonce
          return Tx(
            contract.methods.acceptTrade(_params[0], "0", _params[1]).send({
              from: window.ethereum.selectedAddress
            })
          );
        case "unacceptTrade": //address _tradePartner, uint256 _boxNum
          return Tx(
            contract.methods.unacceptTrade(_params[0], "0").send({
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

  const ErcSends = async (_method, _address) => {
    let contract;
    try {
      switch (_method) {
        case "approve":
          contract = await getErcContract(_address, "erc20");
          return Tx(
            contract.methods
              .approve(state.address, "100000000000000000000000000000000000")
              .send({
                from: window.ethereum.selectedAddress
              })
          );
        case "setApprovalForAll":
          contract = await getErcContract(_address, "erc721");
          return Tx(
            contract.methods.setApprovalForAll(state.address, true).send({
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

  const getArcaContract = async () => {
    if (state.arca) return await state.arca;
    setArca();
    return await state.arca;
  };

  const getErcContract = async (_address, _type) => {
    const erc = getErc(_address);
    if (erc) return erc.contract;

    let contract = {};
    switch (erc) {
      case "erc20":
        contract = await Erc20Contract(_address);
        addErc20({ _address, _type, contract });
        return contract;
      case "erc721":
        contract = await Erc721Contract(_address);
        addErc721({ _address, _type, contract });
        return contract;
      default:
        console.log("Failed getContract");
        return contract;
    }
  };

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
    if (!state.connected) return null;
    return new state.web3.eth.Contract(_abi, _add);
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

  const connect = () => {
    //TODO add check for rejection in enable
    dispatch({
      type: CONNECT
    });
  };

  const connectWeb3 = web3 => {
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
    const arca = await ArcaContract();
    dispatch({
      type: SET_ARCA,
      payload: arca
    });
  };

  const addErc20 = erc => {
    dispatch({
      type: ADD_ERC,
      payload: erc
    });
  };

  const addErc721 = erc => {
    dispatch({
      type: ADD_ERC,
      payload: erc
    });
  };

  return (
    <Web3Context.Provider
      value={{
        connected: state.connected,
        arca: state.arca,
        web3: state.web3,
        ens: state.ens,
        network: state.network,
        connect,
        addErc20,
        addErc721,
        ArcaCalls,
        ErcCalls,
        ArcaSends,
        ErcSends
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
export default Web3State;
