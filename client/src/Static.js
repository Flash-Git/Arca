const AppAddress = "0x53dEd708361Ad49a8f742624E249bab79a1E875B"; //Rinkeby
const boolStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const sendStatus = Object.freeze({ "UNSENT":1, "SENDING":2, "SENT":3 });
const userBoxStatus = Object.freeze({ "NO_BOX":0, "FIRST_BOX":2, "SECOND_BOX":3 });
const listErc20 = ["0xF256D0FFD6B42653269881356CF68D178dfc907d", "0xc778417E063141139Fce010982780140Aa0cD5Ab"]; //Rinkeby
const listErc721 = ["0x552DcaEBAF0F311fB43977Fa31f85F776217f446"]; //Rinkeby
const colours = Object.freeze({ "Primary":"#FFFFFF", "Secondary":"#FFFFFF", "Quaternary":"#000000",
  "User":"#667788", "Accent":"#667788" }); //Light Mode

export {
  AppAddress,
  boolStatus,
  sendStatus,
  userBoxStatus,
  listErc20,
  listErc721,
  colours
}