import { useContext } from "react";
import Web3Context from "../context/web3/Web3Context";

export const getAddress = name => {
  const web3Context = useContext(Web3Context);
  const { ens } = web3Context;
};
