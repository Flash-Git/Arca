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

export function arcaContract() {
  return newContract(abiArca, AppAddress);
}

export function erc20Contract(_add) {
  return newContract(abiErc20, _add);
}

export function erc721Contract(_add) {
  return newContract(abiErc721, _add);
}

export function ercCalls(_contract, _method) {
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
      return _contract.methods.allowance(window.ethereum.selectedAddress, AppAddress).call({
        from: window.ethereum.selectedAddress
      });
    case "isApprovedForAll":
      return _contract.methods.isApprovedForAll(window.ethereum.selectedAddress, AppAddress).call({
        from: window.ethereum.selectedAddress
      });
    default:
      return false;
  }
}