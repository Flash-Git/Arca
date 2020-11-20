declare module "context" {
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
   *Alerts
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
