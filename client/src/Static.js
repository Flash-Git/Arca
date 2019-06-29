function ListErc20() {
  try{
    if(window.ethereum.networkVersion === "1"){
      return ["0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"];
    }
    if(window.ethereum.networkVersion === "4"){ //Rinkeby
      return ["0xb88bf768914648cBaa771816a95122a4Da720f80", "0xF256D0FFD6B42653269881356CF68D178dfc907d", "0xc778417E063141139Fce010982780140Aa0cD5Ab", "0x0A057a87CE9C56D7e336B417c79cf30E8d27860B",
        "0x275A5B346599b56917e7B1C9de019DCf9EaD861a", "0x3615757011112560521536258c1E7325Ae3b48AE",
        "0x398A7A69f3c59181A1ffe34bed11DCb5DF863A8a", "0x6475A7FA6Ed2D5180F0e0a07c2d951D12C0EDB91", "0x8B65d4B7ee3FFFA986C577F0F4b70a21BaE3dD54",
        "0xe27826eE778B6F78a49a686dA7D64f6E7b084a4f", "0xf1e6Ad3a7eF0c86c915F0feDF80eD851809bEA90"]; //https://github.com/ethereum-lists/tokens/tree/master/tokens/rin    
    }
    if(window.ethereum.networkVersion === "5"){ //Goerli
      return ["0xAf791523243c70589E739AeFfBb938e28f954c7E", "0x00c867c0752d5a89d5ef4f0c4d3bdef587a2769c"];
    }
  }catch(e){
    console.log("No connection to Web3");
  }
  return [];
}

function ListErc721() {
  try{
    if(window.ethereum.networkVersion === "1"){
      return ["0xFaC7BEA255a6990f749363002136aF6556b31e04"];
    }
    if(window.ethereum.networkVersion === "4"){ //Rinkeby
      return ["0x552DcaEBAF0F311fB43977Fa31f85F776217f446"];
    }
    if(window.ethereum.networkVersion === "5"){ //Goerli
      return ["0xc601b7ADe1C6357597450E0Ce056B0739D971c3B"];
    }
  }catch(e){
    console.log("No connection to Web3");
  }
  return [];
}

function AppAddress() {
  try{
    if(window.ethereum.networkVersion === "1"){
      return "0xb8F590D50D7d58A5BCd1e669209375026aFb1123";
    }
    if(window.ethereum.networkVersion === "4"){ //Rinkeby
      return "0x255bca69542f6515af3b172223e903dfb302038b";
    }
    if(window.ethereum.networkVersion === "5"){ //Goerli
      return "0x005f729ec568b2e2c69fb3bca7637b49e59ed5c1";
    }
  }catch(e){
    console.log("No connection to Web3");
  }
  return "0x255bca69542f6515af3b172223e903dfb302038b";
}

const boolStatus = Object.freeze({ "TRUE": 1, "FALSE": 2, "TOTRUE": 3, "TOFALSE": 4 });
const sendStatus = Object.freeze({ "UNSENT": 1, "SENDING": 2, "SENT": 3 });
const userBoxStatus = Object.freeze({ "NO_BOX": 0, "FIRST_BOX": 2, "SECOND_BOX": 3 });
const colours = Object.freeze({ "Primary":"#FFFFFF", "Secondary":"#000000", "Button":"#667788", "ButtonPressed": "#9296A0" }); //Light Mode

export {
  AppAddress,
  ListErc20,
  ListErc721,
  boolStatus,
  sendStatus,
  userBoxStatus,
  colours
}