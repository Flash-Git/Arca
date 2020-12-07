import { useReducer, FC, useContext } from "react";
import { providers, Signer } from "ethers";

import Web3Context from "./Web3Context";
import Web3Reducer from "./Web3Reducer";

import { newArcaContract } from "../../web3/calls/arcaCalls";

import AlertContext from "../alert/AlertContext";
import {
  AlertContext as IAlertContext,
  Web3State as IWeb3State,
  LoadArcaAddress,
  LoadArcaContract,
  LoadErc20Addresses,
  LoadErc721Addresses,
  LoadProvider
} from "context";

import {
  ADD_PROVIDER,
  ADD_SIGNER,
  SET_ARCA_ADDRESS,
  SET_ARCA_CONTRACT,
  SET_ERC20_ADDRESSES,
  SET_ERC721_ADDRESSES
} from "../types";

const Web3State: FC = props => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState: IWeb3State = {
    providers: [],
    signers: [],
    arcaAddress: "0x255bca69542f6515af3b172223e903dfb302038b",
    arcaContract: null,
    erc20Addresses: [],
    erc721Addresses: []
  };

  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  /*
   * Methods
   */

  // Sets arca contract to null
  const killArcaContract = () => {
    dispatch({
      type: SET_ARCA_CONTRACT,
      payload: null
    });
  };

  // Provider type does not provide getSigner
  const loadSigner = (provider: any) => {
    try {
      const signer = provider.getSigner();

      dispatch({
        type: ADD_SIGNER,
        payload: signer
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  /*
   * Actions
   */

  // Load provider from page
  const loadProvider: LoadProvider = () => {
    try {
      const windowEth: any = window;
      const provider = new providers.Web3Provider(windowEth.ethereum);

      provider.on("error", e => addAlert(e, "danger"));

      loadSigner(provider); // This should be moved to when it's necessary

      dispatch({
        type: ADD_PROVIDER,
        payload: provider
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  // Load arca address from database
  const loadArcaAddress: LoadArcaAddress = async () => {
    // Rinkeby Address
    const arcaAddress = "0x255bca69542f6515af3b172223e903dfb302038b";

    dispatch({
      type: SET_ARCA_ADDRESS,
      payload: arcaAddress
    });
  };

  // Once we have a signer
  const loadArcaContract: LoadArcaContract = async (signer: Signer) => {
    if (state.arcaAddress.length === 0) killArcaContract();
    if (signer === null) killArcaContract();

    try {
      const arcaContract = await newArcaContract(state.arcaAddress, signer);

      dispatch({
        type: SET_ARCA_CONTRACT,
        payload: arcaContract
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  // Load erc20 address from database
  const loadErc20Addresses: LoadErc20Addresses = async () => {
    //

    try {
      dispatch({
        type: SET_ERC20_ADDRESSES,
        payload: []
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  // Load erc721 address from database
  const loadErc721Addresses: LoadErc721Addresses = async () => {
    //

    try {
      dispatch({
        type: SET_ERC721_ADDRESSES,
        payload: []
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  return (
    <Web3Context.Provider
      value={{
        // providers: state.providers,
        signers: state.signers,
        arcaAddress: state.arcaAddress,
        arcaContract: state.arcaContract,
        erc20Addresses: state.erc20Addresses,
        erc721Addresses: state.erc721Addresses,
        loadProvider,
        loadArcaAddress,
        loadArcaContract,
        loadErc20Addresses,
        loadErc721Addresses
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3State;
