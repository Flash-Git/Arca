declare module "context" {
  import Web3 from "web3";
  import { Signer, Contract, Transaction } from "ethers";
  import { v4 } from "uuid";

  import { SENT, SENDING, UNSENT } from "./sentStatus";

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

  export type Alert = {
    msg: string;
    type: string;
    id: string;
  };

  export type Alerts = Alert[];

  export type AddAlert = (
    msg: string,
    type: "primary" | "light" | "dark" | "danger" | "success" | "white",
    timeout?: number
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

  type Erc20 = {
    address: string;
    balance: string;
    value: string;
  };

  type Erc721 = {
    address: string;
    id: string;
    value: string;
  };

  type TradeItemData = {
    type: ErcType;
    address: string;
    id?: string;
    amount?: string;
  };

  export type SendState = SENT | SENDING | UNSENT;

  type TradeItemStatus = {
    slot: number;
    state: SendState;
    hash: string;
  };

  type TradeItem = {
    id: string;
    data: TradeItemData;
    status: TradeItemStatus;
  };

  export type UserState = {
    address: string;
    balance: string;
    erc20s: Erc20[];
    erc721s: Erc721[];
    tradeItems: TradeItem[];
    accepted: boolean;
  };

  export type PartnerState = {
    address: string;
    balance: string;
    tradeItems: TradeItem[];
    accepted: boolean;
  };

  // Methods

  export type ArcaMethod = (
    contract: Contract,
    method: ArcaSendMethod,
    params: string[]
  ) => Promise<Transaction> | null;

  // Actions

  export type LoadAddress = (signer: Signer) => void;
  export type LoadBalance = (signer: Signer) => void;
  export type LoadErcs = (
    signer: Signer,
    erc20Addresses: string[],
    arcaAddress: string
  ) => void;
  export type SetAddress = (address: string) => void;
  export type AddTradeItem = (item: TradeItem) => void;
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

  export interface UserContext extends UserState {
    loadAddress: LoadAddress;
    loadBalance: LoadBalance;
    loadErc20s: LoadErcs;
    loadErc721s: LoadErcs;
    setAddress: SetAddress;
    addItem: AddTradeItem;
    sendItem: SendTradeItem;
    cancelItem: CancelTradeItem;
  }

  export interface PartnerContext extends PartnerState {
    loadBalance: LoadBalance;
    setAddress: SetAddress;
  }

  /*
   * Web3
   */

  // State

  export type ErcType = "erc20" | "erc721" | "ens";

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
  ) => Promise<string> | null;

  export type ErcCall = (
    signer: Signer,
    method: ErcCallMethod,
    userAddress: address,
    arcaAddress: address,
    ercAddress: address,
    type: ErcType
  ) => Promise<string>;

  export type ArcaSend = (
    contract: Contract,
    method: ArcaSendMethod,
    params: string[]
  ) => Promise<Transaction> | null;

  export type ErcSend = (
    signer: Signer,
    method: ErcSendMethod,
    arcaAddress: string,
    ercAddress: string
  ) => Promise<Transaction>;
}
