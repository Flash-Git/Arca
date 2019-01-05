import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Web3 from "web3";


ReactDOM.render(<App />, document.getElementById("root"));

let web3;
if(window.ethereum) { //Modern DApp Browsers
  web3 = new Web3(window.ethereum);
  try { 
    window.ethereum.enable().then(
      function() {
        console.log("Web3 Enabled");
      }
    );
  } catch(e) {
    console.log(e);
  }
} else if(window.web3) { //Legacy DApp Browsers
  web3 = new Web3(web3.currentProvider);
  console.log("Legacy web3 enabled");
} else { //Non-DApp Browsers
  alert('Please install MetaMask');
}

serviceWorker.unregister();