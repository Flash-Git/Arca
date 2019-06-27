import namehash from "eth-ens-namehash";
import ENS from "ethereum-ens";
let ens;

export function Normalise(_name) {
  try{
    return namehash.normalize(_name);
  }catch(e){
    console.log(e);
  }
}

export function Hash(_name) {
  try{//TODO Does this catch lacking .eth
    return namehash.hash(_name);
  }catch(e){
    console.log(e);
  }
}

export function SetENS() {
  ens = new ENS(window.web3.providers.HttpProvider());
}

export function IsOwner(_name, _owner) {
  try{
    return new Promise((resolve, reject) => {
      return ens.owner(_name)
        .then(owner => owner === _owner ? resolve() : reject())
        .catch(reject()
      );
    });
  }catch(e){
    console.log("Failed isOwner:")
    console.log(e);
    return new Error(e);
  }


}