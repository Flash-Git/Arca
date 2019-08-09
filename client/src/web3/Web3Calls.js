import { useContext } from "react";

import abiErc20 from "./abis/abiErc20";
import abiErc721 from "./abis/abiErc721";
import abiArca from "./abis/abi";
import Web3Context from "../context/web3/Web3Context";

const AppAddress = () => {
  const web3Context = useContext(Web3Context);
  return web3Context.appAddress;
};

NewContract = (_abi, _add) => {
  try {
    return new window.web3.eth.Contract(_abi, _add);
  } catch (e) {
    console.log("Failed NewContract:");
    console.log(e);
    return new Error(e);
  }
};

export const ArcaContract = () => {
  return NewContract(abiArca, AppAddress());
};

export const Erc20Contract = _add => {
  return NewContract(abiErc20, _add);
};

export const Erc721Contract = _add => {
  return NewContract(abiErc721, _add);
};

export const Tx = _promise => {
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

export const ArcaCalls = (_method, _params, _contract = ArcaContract()) => {
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

export const ErcCalls = (_method, _contract) => {
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
          .allowance(window.ethereum.selectedAddress, AppAddress())
          .call({
            from: window.ethereum.selectedAddress
          });
      case "isApprovedForAll":
        return _contract.methods
          .isApprovedForAll(window.ethereum.selectedAddress, AppAddress())
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

export const ArcaSends = (_method, _params, _contract = ArcaContract()) => {
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
          _contract.methods.removeOfferErc20(_params[0], "0", _params[1]).send({
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

export const ErcSends = (_method, _params, _contract = ArcaContract()) => {
  try {
    switch (_method) {
      case "approve":
        return Tx(
          _contract.methods
            .approve(AppAddress(), "100000000000000000000000000000000000")
            .send({
              from: window.ethereum.selectedAddress
            })
        );
      case "setApprovalForAll":
        return Tx(
          _contract.methods.setApprovalForAll(AppAddress(), true).send({
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
