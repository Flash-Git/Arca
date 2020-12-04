import { FC, useContext, useReducer } from "react";

import PartnerContext from "./PartnerContext";
import PartnerReducer from "./PartnerReducer";

import AlertContext from "../alert/AlertContext";

import {
  AlertContext as IAlertContext,
  PartnerState as IPartnerState,
  LoadBalance,
  SetAddress
} from "context";

import { SET_ADDRESS, SET_BALANCE } from "../types";

const PartnerState: FC = props => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState: IPartnerState = {
    address: "",
    balance: "",
    tradeItems: []
  };

  const [state, dispatch] = useReducer(PartnerReducer, initialState);

  /*
   * Actions
   */

  const loadBalance: LoadBalance = async signer => {
    try {
      const balance = await signer.getBalance(state.address);

      dispatch({
        type: SET_BALANCE,
        payload: balance
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  const setAddress: SetAddress = address => {
    dispatch({
      type: SET_ADDRESS,
      payload: address
    });
  };

  // Trade Items

  return (
    <PartnerContext.Provider
      value={{
        address: state.address,
        balance: state.balance,
        tradeItems: state.tradeItems,
        loadBalance,
        setAddress
      }}
    >
      {props.children}
    </PartnerContext.Provider>
  );
};

export default PartnerState;