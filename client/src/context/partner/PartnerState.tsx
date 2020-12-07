import { FC, useContext, useReducer } from "react";

import { SendState, ErcType } from "../Enums";
import { arcaCall } from "../../web3/calls/arcaCalls";

import PartnerContext from "./PartnerContext";
import PartnerReducer from "./PartnerReducer";

import AlertContext from "../alert/AlertContext";

import {
  AlertContext as IAlertContext,
  PartnerState as IPartnerState,
  LoadBalance,
  SetAddress,
  LoadTradeItems,
  TradeItem,
  LoadTradeAccepted,
  Erc20Offer,
  Erc721Offer
} from "context";

import { SET_ADDRESS, SET_BALANCE, SET_ACCEPTED, SET_ITEMS } from "../types";

const { SENT } = SendState;
const { ERC20, ERC721 } = ErcType;

const PartnerState: FC = props => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState: IPartnerState = {
    address: "",
    balance: "",
    erc20Items: [],
    erc721Items: [],
    accepted: false
  };

  const [state, dispatch] = useReducer(PartnerReducer, initialState);

  /*
   * Actions
   */

  const setAddress: SetAddress = address => {
    dispatch({
      type: SET_ADDRESS,
      payload: address
    });
  };

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

  const loadAccepted: LoadTradeAccepted = async (contract, params) => {
    const getAccepted = async () => {
      const nonces = await Promise.all([
        arcaCall(contract, "getNonce", params),
        arcaCall(contract, "getPartnerNonce", params)
      ]);
      return +nonces[0] + 1 === +nonces[1];
    };

    try {
      const accepted = await getAccepted();

      if (accepted === null) throw "Call Failed";

      dispatch({
        type: SET_ACCEPTED,
        payload: accepted
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  const loadItems: LoadTradeItems = async (contract, params) => {
    try {
      // TODO optimise

      // params userAdd, partnerAdd
      const [erc20Count, erc721Count] = await Promise.all([
        arcaCall(contract, "getErc20Count", params),
        arcaCall(contract, "getErc721Count", params)
      ]);

      const erc20Promises: Promise<Erc20Offer>[] = [];
      for (let i = 0; i < erc20Count; i++) {
        const erc20Promise = arcaCall(contract, "getOfferErc20", [
          params[0],
          params[1],
          i.toString()
        ]);
        erc20Promise && erc20Promises.push(erc20Promise);
      }

      const erc721Promises: Promise<Erc721Offer>[] = [];
      for (let i = 0; i < erc721Count; i++) {
        const erc721Promise = arcaCall(contract, "getOfferErc721", [
          params[0],
          params[1],
          i.toString()
        ]);
        erc721Promise && erc721Promises.push(erc721Promise);
      }

      const erc20Offers = await Promise.all(erc20Promises);
      const erc721Offers = await Promise.all(erc721Promises);

      const items: TradeItem[] = [
        ...erc20Offers.map(([address, balance], i) => ({
          id: `0-${i}`,
          data: {
            type: ERC20,
            address,
            value: "unknown",
            balance
          },
          status: {
            slot: i,
            state: SENT
          }
        })),
        ...erc721Offers.map(([address, id], i) => ({
          id: `1-${i}`,
          data: {
            type: ERC721,
            value: "unknown",
            address,
            id
          },
          status: {
            slot: i,
            state: SENT
          }
        }))
      ];

      dispatch({
        type: SET_ITEMS,
        payload: items
      });
    } catch (e) {
      addAlert(e, "danger");
    }
  };

  return (
    <PartnerContext.Provider
      value={{
        address: state.address,
        balance: state.balance,
        accepted: state.accepted,
        // items: [...state.erc20Items, ...state.erc721Items],
        erc20Items: state.erc20Items,
        erc721Items: state.erc721Items,
        setAddress,
        loadBalance,
        loadAccepted,
        loadItems
      }}
    >
      {props.children}
    </PartnerContext.Provider>
  );
};

export default PartnerState;
