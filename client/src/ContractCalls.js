import abiErc20 from "./abis/abiErc20";
import abiErc721 from "./abis/abiErc721";
import abiArca from "./abis/abi";
import { AppAddress } from "./Static";

function newContract(_abi, _add) {
  try{
    return new window.web3.eth.Contract(_abi, _add);
  }catch(e){
    return false;
  }
}

export function ArcaContract() {
  return newContract(abiArca, AppAddress());
}

export function ArcaCalls(_method, _params, _contract = ArcaContract()) {
  switch(_method){
    case "getErc20Count":
      return _contract.methods.getErc20Count(_params[0], _params[1]).call({
        from: window.ethereum.selectedAddress
      });
    case "getErc721Count":
      return _contract.methods.getErc721Count(_params[0], _params[1]).call({
        from: window.ethereum.selectedAddress
      });
    case "getNonce":
      return _contract.methods.getNonce(_params[0], _params[1]).call({
        from: window.ethereum.selectedAddress
      });
    case "getOfferErc20":
      return _contract.methods.getOfferErc20(_params[0], _params[1], _params[2]).call({
        from: window.ethereum.selectedAddress
      });
    case "getOfferErc721":
      return _contract.methods.getOfferErc721(_params[0], _params[1], _params[2]).call({
        from: window.ethereum.selectedAddress
      });
    default:
      return false;
  }
}

export function Tx(_promise) {
  return new Promise((resolve, reject) => {
    _promise.on("transactionHash", hash => {
      alert("Tx Sent: https://etherscan.com/tx/" + hash);
      console.log("txHash: " + hash);
    });
    _promise.on("receipt", receipt => {
      resolve();
    });
    _promise.on("error", e => {
      console.log("Error in tx execution: " + e);
      reject(e);
    });
    _promise.catch(e => {
      console.log("Error in tx send: " + e);
      reject(e);
    });
  });
}

export function ArcaSends(_method, _params, _contract = ArcaContract()) {
  switch(_method){
    case "pushOfferErc20"://address _tradePartner, uint256 _boxNum, address _erc20Address, uint256 _amount
      return Tx(_contract.methods.pushOfferErc20(_params[0], "0", _params[1], _params[2]).send({
        from: window.ethereum.selectedAddress
      }));
    case "pushOfferErc721"://address _tradePartner, uint256 _boxNum, address _erc721Address, uint256 _id
      return Tx(_contract.methods.pushOfferErc721(_params[0], "0", _params[1], _params[2]).send({
        from: window.ethereum.selectedAddress
      }));
    case "removeOfferErc20"://address _tradePartner, uint256 _boxNum, uint8 _index
      return Tx(_contract.methods.removeOfferErc20(_params[0], "0", _params[1]).send({
        from: window.ethereum.selectedAddress
      }));
    case "removeOfferErc721"://address _tradePartner, uint256 _boxNum, uint8 _index
      return Tx(_contract.methods.removeOfferErc721(_params[0], "0", _params[1]).send({
        from: window.ethereum.selectedAddress
      }));
    default:
      return false;
  }
}

export function Erc20Contract(_add) {
  return newContract(abiErc20, _add);
}

export function Erc721Contract(_add) {
  return newContract(abiErc721, _add);
}

export function ErcCalls(_method, _contract) {
  switch(_method){
    case "decimals":
      return _contract.methods.decimals().call({
        from: window.ethereum.selectedAddress
      });
    case "balanceOf":
      return _contract.methods.balanceOf(window.ethereum.selectedAddress).call({
        from: window.ethereum.selectedAddress
      });
    case "symbol":
      return _contract.methods.symbol().call({
        from: window.ethereum.selectedAddress
      });
    case "allowance":
      return _contract.methods.allowance(window.ethereum.selectedAddress, AppAddress()).call({
        from: window.ethereum.selectedAddress
      });
    case "isApprovedForAll":
      return _contract.methods.isApprovedForAll(window.ethereum.selectedAddress, AppAddress()).call({
        from: window.ethereum.selectedAddress
      });
    default:
      return false;
  }
}