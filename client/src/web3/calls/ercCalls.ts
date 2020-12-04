import { Contract, ContractInterface, Signer } from "ethers";

import { ErcCall, ErcSend } from "context";

import abiErc20 from "../abis/abiErc20";
import abiErc721 from "../abis/abiErc721";

const newErcContract = (
  ercAddress: string,
  abi: ContractInterface,
  signer: Signer
): Contract => {
  return new Contract(ercAddress, abi, signer);
};

const erc20Contract = (signer: Signer, erc20Address: string) => {
  return newErcContract(erc20Address, abiErc20, signer);
};

const erc721Contract = (signer: Signer, erc721Address: string) => {
  return newErcContract(erc721Address, abiErc721, signer);
};

export const ercCall: ErcCall = async (
  signer,
  method,
  userAddress,
  arcaAddress,
  ercAddress,
  type
) => {
  let contract =
    type === "erc20"
      ? erc20Contract(signer, ercAddress)
      : erc721Contract(signer, ercAddress);

  switch (method) {
    case "decimals":
      return contract.decimals();
    case "balanceOf":
      return contract.balanceOf(userAddress);
    case "symbol":
      return contract.symbol();
    case "name":
      return contract.name(userAddress);
    case "allowance":
      return contract.allowance(userAddress, arcaAddress);
    case "isApprovedForAll":
      return contract.isApprovedForAll(userAddress, arcaAddress);

    default:
      console.log("Invalid method name: " + method);
      return null;
  }
};

export const ercSend: ErcSend = async (
  signer,
  method,
  arcaAddress,
  ercAddress
) => {
  switch (method) {
    case "approve":
      return erc20Contract(signer, ercAddress).approve(
        arcaAddress,
        "100000000000000000000000000000000000"
      );
    case "setApprovalForAll":
      return erc721Contract(signer, ercAddress).setApprovalForAll(
        arcaAddress,
        true
      );
    default:
      console.log("Invalid method name: " + method);
      return null;
  }
};
