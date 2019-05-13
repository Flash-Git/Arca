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