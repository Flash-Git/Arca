//import  from "./ENS";


export function KnownContracts(_address) {
  try{
    if(window.ethereum.networkVersion === "1"){ //Live
      //ens
      switch(_address){
        case "0xFaC7BEA255a6990f749363002136aF6556b31e04":
          return "ENS";
        default:
          return _address;
      }
    }

    if(window.ethereum.networkVersion === "4"){ //Rinkeby
      //ens
      switch(_address){
        default:
          return _address;
      }
    }
    if(window.ethereum.networkVersion === "5"){ //Goerli
      //ens
      switch(_address){
        default:
          return _address;
      }
    }
  }catch(e){
    console.log("Error in KnownContracts:");
    console.log(e);
    return e;
  }
}