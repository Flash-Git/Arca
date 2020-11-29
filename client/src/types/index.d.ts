// TODO Does not work
declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}
// Does not come with @types TODO PR
declare module "ethereum-ens" {
  import { provider } from "web3-core";

  export class ENS {
    constructor(public readonly provider: provider) {}
  }

  export default ENS;
}
