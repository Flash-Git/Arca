//Rinkeby
const AppAddress = "0x78407Ecad9fD13BdD2CEB090b11A71E430a82843";
const executedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const sendStatus = Object.freeze({ "UNSENT":1, "SENDING":2, "SENT":3 });
const satisfiedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const userBoxStatus = Object.freeze({ "NO_BOX":0, "FIRST_BOX":2, "SECOND_BOX":3 });
const listErc20 = ["0xF256D0FFD6B42653269881356CF68D178dfc907d", "0xc778417E063141139Fce010982780140Aa0cD5Ab"]; //Rinkeby
const listErc721 = ["0x552DcaEBAF0F311fB43977Fa31f85F776217f446"];
const colours = Object.freeze({ "Primary":"#C1CSC0", "Secondary":"#C1CSC0", "Tertiary":"#49274A", "Quaternary":"#49274A" });

//1A2930 DEMIN
//C1CSC0 SCREEN
export {
  AppAddress,
  executedStatus,
  sendStatus,
  satisfiedStatus,
  userBoxStatus,
  listErc20,
  listErc721,
  colours
}