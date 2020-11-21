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

  export type Status = SENT | UNSENT;

  export type Network = {
    status: Status;
    txHash: string | null;
    web3Loading: boolean;
    dbLoading: boolean;
    synced: boolean;
    slot: number;
    tab: number;
  };

  export type Data = {
    type: ErcType;
    contractAdd: string;
    amount?: string;
    id?: string;
    name?: string;
    namehash?: string;
    verified?: boolean;
  };

  export type TradeItem = {
    id: v4;
    network: Network;
    data: Data;
  };

  export type UserBox = {
    tradeItems: TradeItem[];
    accepted: boolean | null;
  };

  export type TradeState = {
    userBox: Box;
    currentItem: TradeItem | null;
    user: UserBox;
    tradePartner: UserBox;
  };

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
   * User
   */

  // State

  export type Token = {
    name: string;
  };

  export type Tokens = {
    web3Loading: boolean;
    dbLoading: boolean;
    synced: boolean;
    erc20Tokens: Token[];
    erc721Tokens: Token[];
  };

  export type AddressObj = {
    address: string;
    ens: null | string;
  };

  export type User = {
    addressObj: AddressObj;
    balance: string | null;
    ownedTokens: Tokens;
    requestedTokens: Tokens;
  };

  export type Settings = {
    nickname: string | null;
  };

  export type UserState = {
    user: User;
    tradePartner: User;
    settings: Settings;
  };

  // Actions

  export type ClearUser = () => void;
  export type ClearTradePartner = () => void;
  export type SetAddresses = (
    userAddressObj: AddressObj,
    tradePartnerAddressObj: AddressObj
  ) => void;
  export type ClearAddresses = () => void;
  export type GetBalance = (id: Box) => void;
  export type ClearBalance = (id: Box) => void;
  export type GetOwnedTokens = (id: Box) => void;
  export type GetRequestedTokens = (id: Box) => void;
  export type AddRequestedToken = (id: Box) => void;
  export type GetSettings = () => void;
  export type UpdateSettings = (settings: Settings) => void;
  export type ClearSettings = () => void;

  export interface UserContext extends UserState {
    clearUser: ClearUser;
    clearTradePartner: ClearTradePartner;
    setAddresses: SetAddresses;
    clearAddresses: ClearAddresses;
    getBalance: GetBalance;
    clearBalance: ClearBalance;
    getOwnedTokens: GetOwnedTokens;
    getRequestedTokens: GetRequestedTokens;
    addRequestedToken: AddRequestedToken;
    getSettings: GetSettings;
    updateSettings: UpdateSettings;
    clearSettings: ClearSettings;
  }

  /*
   * Web3
   */

  // State

  export type ErcType = "erc20" | "erc721" | "ens";

  export type NetworkNum = 1 | 4 | 5;

  export type Erc = {
    address: string;
    type: string;
    contract: any; // Contract
  };

  export type ArcaContract = {
    address: string;
    arca: null | any;
    ercs: Erc[];
  };

  export type Web3State = {
    connected: boolean;
    web3: Web3 | null;
    ens: string | null;
    network: NetworkNum | null;
    address: string;
    arca: null;
    ercs: Erc[];
    main: ArcaContract;
    rinkeby: ArcaContract;
    goerli: ArcaContract;
  };

  // Actions

  export type Connnect = () => void;
  export type AddErc20 = (erc: Erc) => void;
  export type AddErc721 = (erc: Erc) => void;
  export type ArcaCalls = (
    method: ArcaCallMethod,
    params: string[]
  ) => Promise<string>;
  export type ErcCalls = (
    method: ErcCallMethod,
    address: string,
    type: ErcType
  ) => Promise<string>;
  export type ArcaSends = (method: ArcaSendMethod, params: string[]) => void;
  export type ErcSends = (method: ErcSendMethod, address: string) => void;

  // Not extending state
  export interface Web3Context {
    connected: boolean;
    arca: null;
    web3: null | Web3;
    ens: any | null;
    network: NetworkNum | null;
    connect: Connnect;
    addErc20: AddErc20;
    addErc721: AddErc721;
    arcaCalls: ArcaCalls;
    ercCalls: ErcCalls;
    ercCalls: ErcCalls;
    arcaSends: ArcaSends;
    ercSends: ErcSends;
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
}

// Does not come with @types TODO PR
declare module "ethereum-ens" {
  import { provider } from "web3-core";
}
