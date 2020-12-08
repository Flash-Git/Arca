declare module "context" {
  import Web3 from "web3";
  import { Signer, Contract, Transaction } from "ethers";
  import { TransactionResponse } from "@ethersproject/abstract-provider";
  import { v4 } from "uuid";

  import { ErcType, SendState } from "./Enums";

  export type Action = {
    payload?: any;
    type: string;
  };

  /*
   * App
   */

  export type Location = "home" | "about" | "notFound";

  export type SetLocation = (location: Location) => void;

  export type ToggleSidebar = () => void;

  export type AppState = {
    location: Location;
    sidebar: boolean;
  };

  export interface AppContext extends AppState {
    setLocation: SetLocation;
    toggleSidebar: ToggleSidebar;
  }

  /*
   * Alerts
   */

  export type AlertType =
    | "primary"
    | "light"
    | "dark"
    | "danger"
    | "success"
    | "white";

  export type Alert = {
    msg: string;
    type: AlertType;
    id: string;
  };

  export type Alerts = Alert[];

  export type AddAlert = (
    msg: string,
    type: AlertType,
    timeout?: number,
    id?: string
  ) => void;

  export type RemoveAlert = (id: string) => void;

  export type ClearAlerts = () => void;

  export interface AlertContext extends Alerts {
    alerts: Alerts;
    addAlert: AddAlert;
    removeAlert: RemoveAlert;
    clearAlerts: ClearAlerts;
  }

  /*
   * User / Partner
   */

  // State

  type BaseTradeItemData = {
    type: ErcType;
    address: string;
    value: string;
  };

  interface TradeItemDataErc20 extends BaseTradeItemData {
    type: ErcType.ERC20;
    balance: string;
  }

  interface TradeItemDataErc721 extends BaseTradeItemData {
    type: ErcType.ERC721;
    id: string;
  }

  type TradeItemData = TradeItemDataErc20 | TradeItemDataErc721;

  type TradeItemStatus = {
    slot: number;
    state: SendState;
    hash?: string; // Only exists when sent this session
  };

  type TradeItemBase = {
    id: string;
    status: TradeItemStatus;
  };

  interface TradeItemErc20 extends TradeItemBase {
    data: TradeItemDataErc20;
  }

  interface TradeItemErc721 extends TradeItemBase {
    data: TradeItemDataErc721;
  }

  type TradeItem = TradeItemErc20 | TradeItemErc721;

  export type PartnerState = {
    address: string;
    balance: string;
    accepted: boolean | null;
    erc20Items: TradeItemErc20[];
    erc721Items: TradeItemErc721[];
  };

  export interface UserState extends PartnerState {
    erc20s: Erc20[];
    erc721s: Erc721[];
  }

  // Methods

  export type ArcaMethod = (
    contract: Contract,
    method: ArcaSendMethod,
    params: string[]
  ) => Promise<TransactionResponse> | null;

  // Actions

  export type SetAddress = (address: string) => void;

  export type LoadBalance = (signer: Signer) => void;
  export type LoadTradeAccepted = (
    contract: Contract,
    params: string[]
  ) => void;
  export type LoadTradeItems = (contract: Contract, params: string[]) => void;
  1;
  export type LoadErcs = (
    signer: Signer,
    erc20Addresses: string[],
    arcaAddress: string
  ) => void;

  export type AddErc20TradeItem = (item: TradeItemErc20) => void;
  export type AddErc721TradeItem = (item: TradeItemErc721) => void;
  export type RemoveTradeItem = (id: string) => void;

  export type ToggleAccepted = (
    contract: Contract,
    method: ArcaSendMethod,
    params: string[]
  ) => void;
  export type SendTradeItem = (
    id: string,
    contract: Contract,
    method: ArcaSendMethod,
    params: string[]
  ) => void;
  export type CancelTradeItem = (
    id: string,
    contract: Contract,
    method: ArcaSendMethod,
    params: string[]
  ) => void;

  export interface PartnerContext extends PartnerState {
    setAddress: SetAddress;
    loadBalance: LoadBalance;
    loadAccepted: LoadTradeAccepted;
    loadItems: LoadTradeItems;
  }

  export interface UserContext extends UserState {
    setAddress: SetAddress;
    loadBalance: LoadBalance;
    loadAccepted: LoadTradeAccepted;
    loadItems: LoadTradeItems;
    loadErc20s: LoadErcs;
    loadErc721s: LoadErcs;
    addErc20Item: AddErc20TradeItem;
    addErc721Item: AddErc721TradeItem;
    toggleAccepted: ToggleAccepted;
    sendItem: SendTradeItem;
    cancelItem: CancelTradeItem;
  }

  /*
   * Web3
   */

  // State

  export type NetworkNum = 1 | 4 | 5;

  export type Web3State = {
    providers: Provider[];
    signers: Signer[];
    arcaAddress: string;
    arcaContract: null | Contract;
    erc20Addresses: string[];
    erc721Addresses: string[];
  };

  // Actions

  export type LoadProvider = () => void;
  export type LoadArcaAddress = () => void;
  export type LoadArcaContract = (signer: Signer) => void;
  export type LoadErc20Addresses = () => void;
  export type LoadErc721Addresses = () => void;

  export interface Web3Context extends Web3State {
    loadProvider: LoadProvider;
    loadArcaAddress: LoadArcaAddress;
    loadArcaContract: LoadArcaContract;
    loadErc20Addresses: LoadErc20Addresses;
    loadErc721Addresses: LoadErc721Addresses;
  }

  // Arca Methods

  export type ArcaCallMethod =
    | "getErc20Count"
    | "getErc721Count"
    | "getNonce"
    | "getPartnerNonce"
    | "getOfferErc20"
    | "getOfferErc721";
  export type ErcCallMethod =
    | "decimals"
    | "balanceOf"
    | "symbol"
    | "name"
    | "allowance"
    | "isApprovedForAll";
  export type ArcaSendMethod =
    | "pushOfferErc20"
    | "pushOfferErc721"
    | "removeOfferErc20"
    | "removeOfferErc721"
    | "acceptTrade"
    | "unacceptTrade";
  export type ErcSendMethod = "approve" | "setApprovalForAll";

  /*
   * Calls
   */

  export type ArcaCall = (
    contract: Contract,
    method: ArcaCallMethod,
    params: string[]
  ) => Promise<any> | null;

  export type ErcCall = (
    signer: Signer,
    method: ErcCallMethod,
    userAddress: address,
    arcaAddress: address,
    ercAddress: address,
    type: ErcType
  ) => Promise<any>;

  export type ArcaSend = (
    contract: Contract,
    method: ArcaSendMethod,
    params: string[]
  ) => Promise<TransactionResponse> | null;

  export type ErcSend = (
    signer: Signer,
    method: ErcSendMethod,
    arcaAddress: string,
    ercAddress: string
  ) => Promise<TransactionResponse>;

  /*
   * Arca Call Responses
   */
  export type Erc20Offer = [string, string]; // address, amount

  export type Erc721Offer = [string, string]; // address, id
}
