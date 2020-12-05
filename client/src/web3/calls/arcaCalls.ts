import { Contract, Signer } from "ethers";

import { ArcaCall, ArcaSend } from "context";

import abi from "../abis/abi";

export const newArcaContract = (
  arcaAddress: string,
  signer: Signer
): Contract => {
  return new Contract(arcaAddress, abi, signer);
};

export const arcaCall: ArcaCall = async (contract, method, params) => {
  switch (method) {
    case "getErc20Count": //address _add1, address _add2, uint256 _boxNum
      return contract.getErc20Count(params[0], params[1], "0");
    case "getErc721Count": //address _add1, address _add2, uint256 _boxNum
      return contract.getErc721Count(params[0], params[1], "0");
    case "getNonce": //address _add1, address _add2, uint256 _boxNum
      return contract.getNonce(params[0], params[1], "0");
    case "getPartnerNonce": //address _add1, address _add2, uint256 _boxNum
      return contract.getPartnerNonce(params[0], params[1], "0");
    case "getOfferErc20": //address _add1, address _add2, uint256 _boxNum, uint8 _index
      return contract.getOfferErc20(params[0], params[1], "0", params[2]);
    case "getOfferErc721": //address _add1, address _add2, uint256 _boxNum, uint8 _index
      return contract.getOfferErc721(params[0], params[1], "0", params[2]);
    default:
      console.log("Invalid method name: " + method);
      return null;
  }
};

export const arcaSend: ArcaSend = async (contract, method, params) => {
  switch (method) {
    case "pushOfferErc20": //address _tradePartner, uint256 _boxNum, address _erc20Address, uint256 _amount
      return contract.pushOfferErc20(params[0], "0", params[1], params[2]);
    case "pushOfferErc721": //address _tradePartner, uint256 _boxNum, address _erc721Address, uint256 _id
      return contract.pushOfferErc721(params[0], "0", params[1], params[2]);
    case "removeOfferErc20": //address _tradePartner, uint256 _boxNum, uint8 _index
      return contract.removeOfferErc20(params[0], "0", params[1]);
    case "removeOfferErc721": //address _tradePartner, uint256 _boxNum, uint8 _index
      return contract.removeOfferErc721(params[0], "0", params[1]);
    case "acceptTrade": //address _tradePartner, uint256 _boxNum, uint256 _partnerNonce
      return contract.acceptTrade(params[0], "0", params[1]);
    case "unacceptTrade": //address _tradePartner, uint256 _boxNum
      return contract.unacceptTrade(params[0], "0");
    default:
      console.log("Invalid method name: " + method);
      return null;
  }
};
