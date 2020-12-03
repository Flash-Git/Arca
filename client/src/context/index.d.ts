declare module "context" {
  import Web3 from "web3";
  import { provider } from "web3-core";
  import { v4 } from "uuid";

  import { SENT, UNSENT } from "./sentStatus";

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
   * Trade
   */

  // State

  export type Box = 0 | 1;

  // export type Status = SENT | UNSENT;

  // export type Network = {
  //   status: Status;
  //   txHash: string | null;
  //   web3Loading: boolean;
  //   dbLoading: boolean;
  //   synced: boolean;
  //   slot: number;
  //   tab: number;
  // };

  // export type Data = {
  //   type: ErcType;
  //   contractAdd: string;
  //   amount?: string;
  //   id?: string;
  //   name?: string;
  //   namehash?: string;
  //   verified?: boolean;
  // };

  // export type TradeItem = {
  //   id: v4;
  //   network: Network;
  //   data: Data;
  // };

  // export type UserBox = {
  //   tradeItems: TradeItem[];
  //   accepted: boolean | null;
  // };

  // export type TradeState = {
  //   userBox: Box;
  //   currentItem: TradeItem | null;
  //   user: UserBox;
  //   tradePartner: UserBox;
  // };

  // Actions

  export type AddTradeItem = (tradeItem: TradeItem) => void;
  export type SetUserAccepted = (id: number) => void;
  export type SetPartnerAccepted = (id: number) => void;
  export type SetUserItems = (tradeItems: TradeItem[]) => void;
  export type SetPartnerItems = (tradeItems: TradeItem[]) => void;
  export type CancelTradeItem = (id: v4) => void;
  export type ModifyTradeItemStatus = (id: v4, status: Status) => void;
  export type SetUserBox = (id: Box) => void;
  export type SetCurrentItem = (currentItem: TradeItem) => void;
  export type ClearCurrentItem = () => void;
  export type GetAccepted = (id: v4) => void;
  export type ToggleAccepted = () => void;
  export type GetTradeItems = () => void;

  export interface TradeContext extends TradeState {
    addTradeItem: AddTradeItem;
    setUserAccepted: SetUserAccepted;
    setPartnerAccepted: SetPartnerAccepted;
    setUserItems: SetUserItems;
    setPartnerItems: SetPartnerItems;
    cancelTradeItem: CancelTradeItem;
    modifyTradeItemStatus: ModifyTradeItemStatus;
    setUserBox: SetUserBox;
    setCurrentItem: SetCurrentItem;
    clearCurrentItem: ClearCurrentItem;
    getAccepted: GetAccepted;
    toggleAccepted: ToggleAccepted;
    getTradeItems: GetTradeItems;
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

  type SendStatus = SENT | UNSENT;

  type TradeItemStatus = {
    slot: number;
    state: SendStatus;
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
  };

  export type PartnerState = {
    address: string;
    balance: string;
    tradeItems: TradeItem[];
  };

  // Actions

  export type LoadAddress = (signer: Signer) => void;
  export type LoadBalance = (signer: Signer) => void;
  export type LoadErcs = (
    signer: Signer,
    erc20Addresses: string[],
    arcaAddress: string
  ) => void;

  export interface UserContext extends UserState {
    loadAddress: LoadAddress;
    loadBalance: LoadBalance;
    loadErc20s: LoadErcs;
    loadErc721s: LoadErcs;
  }

  export interface PartnerContext extends PartnerState {
    loadAddress: LoadAddress;
    loadBalance: LoadBalance;
  }

  /*
   * Web3
   */

  // State

  import { Signer, Contract, Transaction } from "ethers";

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
  ) => Promise<string>;

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
  ) => Promise<Transaction>;

  export type ErcSend = (
    signer: Signer,
    method: ErcSendMethod,
    arcaAddress: string,
    ercAddress: string
  ) => Promise<Transaction>;
}
