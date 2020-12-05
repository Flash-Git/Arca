import { FC, useContext, useReducer } from "react";

import { SendState, ErcType } from "../Enums";
import { ercCall } from "../../web3/calls/ercCalls";
import { arcaCall, arcaSend } from "../../web3/calls/arcaCalls";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import AlertContext from "../alert/AlertContext";

import {
  AlertContext as IAlertContext,
  UserState as IUserState,
  LoadBalance,
  LoadErcs,
  Erc20,
  Erc721,
  ArcaMethod,
  SetAddress,
  SendTradeItem,
  CancelTradeItem,
  AddTradeItem,
  LoadTradeItems,
  TradeItem,
  LoadTradeAccepted,
  ToggleAccepted,
  Erc20Offer,
  Erc721Offer
} from "context";

import {
  ADD_ITEM,
  SET_ADDRESS,
  SET_BALANCE,
  SET_ACCEPTED,
  SET_ITEMS,
  SET_ERC20S,
  SET_ERC721S,
  SET_ITEM_STATE
} from "../types";

const { SENDING, CANCELLING, SENT } = SendState;
const { ERC20, ERC721 } = ErcType;

const UserState: FC = props => {
  const alertContext: IAlertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const initialState: IUserState = {
    address: "",
    balance: "",
    erc20s: [],
    erc721s: [],
    items: [],
    accepted: false
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  /*
   * Methods
   */

  const arcaMethod: ArcaMethod = (contract, method, params) => {
    // TODO callback param to undo tradeItem send state
    try {
      return arcaSend(contract, method, params);
    } catch (e) {
      addAlert(`Failed to send Transaction: ${e}`, "danger");
      return null;
    }
  };

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
      const balance = await signer.getBalance();

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
      const nonces: string[] = await Promise.all([
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
        ...erc20Offers.map(([address, amount], i) => ({
          id: `0-${i}`,
          data: {
            type: ERC20,
            address,
            amount
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

  // User Specific Actions

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

  // Local

  const addItem: AddTradeItem = async item => {
    dispatch({
      type: ADD_ITEM,
      payload: item
    });
  };

  // Send

  const toggleAccepted: ToggleAccepted = async (contract, method, params) => {
    const tx = await arcaMethod(contract, method, params);

    if (tx === null) return;

    dispatch({
      type: SET_ACCEPTED,
      payload: !state.accepted
    });
  };

  const sendItem: SendTradeItem = async (id, contract, method, params) => {
    const tx = await arcaMethod(contract, method, params);
    if (tx === null) return;

    dispatch({
      type: SET_ITEM_STATE,
      payload: { id, newState: SENDING }
    });
  };

  const cancelItem: CancelTradeItem = async (id, contract, method, params) => {
    const tx = await arcaMethod(contract, method, params);
    if (tx === null) return;

    dispatch({
      type: SET_ITEM_STATE,
      payload: { id, newState: CANCELLING }
    });
  };

  return (
    <UserContext.Provider
      value={{
        address: state.address,
        balance: state.balance,
        accepted: state.accepted,
        items: state.items,
        erc20s: state.erc20s,
        erc721s: state.erc721s,
        setAddress,
        loadBalance,
        loadAccepted,
        loadItems,
        loadErc20s,
        loadErc721s,
        addItem,
        toggleAccepted,
        sendItem,
        cancelItem
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
