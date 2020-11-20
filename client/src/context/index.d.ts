declare module "context" {
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
    type: "erc20" | "erc721" | "ens";
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
  export type ToggleAccepted = (id: Box) => void;
  export type GetTradeItems = (id: Box) => void;

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

  export type Tokens = {
    web3Loading: boolean;
    dbLoading: boolean;
    synced: boolean;
    erc20Tokens: string[];
    erc721Tokens: string[];
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

  export type Web3State = {};

  export interface Web3Context extends Web3State {}
}
