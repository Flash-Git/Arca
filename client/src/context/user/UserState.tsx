import { FC, useContext, useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import AlertContext from "../alert/AlertContext";

import {
  AlertContext as IAlertContext,
  UserState as IUserState,
  LoadAddress,
  LoadBalance,
  LoadErcs,
  Erc20,
  Erc721
} from "context";

import { SET_ADDRESS, SET_BALANCE, SET_ERC20S, SET_ERC721S } from "../types";
import { ercCall } from "../../web3/calls/ercCalls";

const UserState: FC = props => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState: IUserState = {
    address: "",
    balance: "",
    erc20s: [],
    erc721s: [],
    tradeItems: []
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  /*
   * Actions
   */

  const loadAddress: LoadAddress = async signer => {
    try {
      const address = await signer.getAddress();

      dispatch({
        type: SET_ADDRESS,
        payload: address
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  const loadBalance: LoadBalance = async signer => {
    try {
      const balance = await signer.getBalance();

      dispatch({
        type: SET_BALANCE,
        payload: balance
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  const loadErc20s: LoadErcs = async (signer, erc20Addresses, arcaAddress) => {
    // Check list of erc20Addresses and get store the user's balance'

    try {
      const balances: string[] = await Promise.all(
        erc20Addresses.map(erc20Address =>
          ercCall(
            signer,
            "balanceOf",
            state.address,
            arcaAddress,
            erc20Address,
            "erc20"
          )
        )
      );

      const erc20s: Erc20[] = balances.map((balance, id) => ({
        address: erc20Addresses[id],
        balance,
        value: "unknown"
      }));

      dispatch({
        type: SET_ERC20S,
        payload: erc20s
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  const loadErc721s: LoadErcs = async (
    signer,
    erc721Addresses,
    arcaAddress
  ) => {
    // Check list of erc20Addresses and get store the user's balance'

    try {
      const balances: string[] = await Promise.all(
        erc721Addresses.map(erc721Addresses =>
          ercCall(
            signer,
            "balanceOf",
            state.address,
            arcaAddress,
            erc721Addresses,
            "erc721"
          )
        )
      );

      const erc721s: Erc721[] = balances.map((balance, id) => ({
        address: erc721Addresses[id],
        id: balance,
        value: "unknown"
      }));

      dispatch({
        type: SET_ERC721S,
        payload: erc721s
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  // Trade Items

  return (
    <UserContext.Provider
      value={{
        address: state.address,
        balance: state.balance,
        erc20s: state.erc20s,
        erc721s: state.erc721s,
        tradeItems: state.tradeItems,
        loadAddress,
        loadBalance,
        loadErc20s,
        loadErc721s
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
