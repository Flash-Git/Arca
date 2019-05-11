let AppAddress = "0x53dEd708361Ad49a8f742624E249bab79a1E875B"; //Rinkeby
let listErc20 = []; //Rinkeby
let listErc721 = [];

const boolStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const sendStatus = Object.freeze({ "UNSENT":1, "SENDING":2, "SENT":3 });
const userBoxStatus = Object.freeze({ "NO_BOX":0, "FIRST_BOX":2, "SECOND_BOX":3 });
const colours = Object.freeze({ "Primary":"#FFFFFF", "Secondary":"#FFFFFF", "Quaternary":"#000000",
  "User":"#667788", "Accent":"#667788" }); //Light Mode


if(window.ethereum.networkVersion === "4"){ //Rinkeby
  AppAddress = "0x53dEd708361Ad49a8f742624E249bab79a1E875B";
  listErc20 = ["0xb88bf768914648cBaa771816a95122a4Da720f80", "0xF256D0FFD6B42653269881356CF68D178dfc907d", "0xc778417E063141139Fce010982780140Aa0cD5Ab", "0x0A057a87CE9C56D7e336B417c79cf30E8d27860B",
  "0x275A5B346599b56917e7B1C9de019DCf9EaD861a", "0x3615757011112560521536258c1E7325Ae3b48AE",
  "0x398A7A69f3c59181A1ffe34bed11DCb5DF863A8a", "0x6475A7FA6Ed2D5180F0e0a07c2d951D12C0EDB91", "0x8B65d4B7ee3FFFA986C577F0F4b70a21BaE3dD54",
  "0xe27826eE778B6F78a49a686dA7D64f6E7b084a4f", "0xf1e6Ad3a7eF0c86c915F0feDF80eD851809bEA90"]; //https://github.com/ethereum-lists/tokens/tree/master/tokens/rin
  listErc721 = ["0x552DcaEBAF0F311fB43977Fa31f85F776217f446"];
}

if(window.ethereum.networkVersion === "5"){ //Goerli
  AppAddress = "0xCaBA1C5486C811C74427826827444B68449cA28d";
  listErc20 = ["0xAf791523243c70589E739AeFfBb938e28f954c7E", "0x00c867c0752d5a89d5ef4f0c4d3bdef587a2769c"];
  listErc721 = ["0xc601b7ADe1C6357597450E0Ce056B0739D971c3B"];
}


export {
  AppAddress,
  boolStatus,
  sendStatus,
  userBoxStatus,
  listErc20,
  listErc721,
  colours
}