import namehash from "eth-ens-namehash";
import ENS from "ethereum-ens";
let ens;

export function Normalise(_name) {
  try{
    return namehash.normalize(_name);
  }catch(e){
    console.log(e);
    return e;
  }
}

export function Hash(_name) {
  try{
    return namehash.hash(_name);
  }catch(e){
    console.log(e);
    return e;
  }
}

export function SetENS() {
  ens = new ENS(window.web3.givenProvider);
}

export function IsOwner(_name, _owner) {
  try{
    return ens.owner(_name)
      .then(owner => {
        return owner === _owner ? true : false;
      })
      .catch(e => {
        console.log("Failed isOwner:")
        console.log(e);
        return false;
      }
    );
  }catch(e){
    console.log("Failed isOwner:")
    console.log(e);
    return false;
  }
}