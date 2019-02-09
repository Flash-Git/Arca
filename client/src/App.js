import React, { Component } from "react";
import Web3 from "web3";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";
import PreTrade from "./components/PreTrade";

import "./App.css";
import { userBoxStatus } from "./Static";


class App extends Component {

  state = {
    connected: false,
    addresses: ["", ""],
    userBox: userBoxStatus.NO_BOX
  }

  setAddresses = (addresses) => {
    this.setState({ addresses }, () => {
      this.isUser();
    });
  }

  isUser = () => {
    try{
      if(this.state.addresses[0].toUpperCase() === window.ethereum.selectedAddress.toUpperCase()){
        this.setState({ userBox: userBoxStatus.FIRST_BOX });
      } else if(this.state.addresses[1].toUpperCase() === window.ethereum.selectedAddress.toUpperCase()){
        this.setState({ userBox: userBoxStatus.SECOND_BOX });
      } else{
        this.setState({ userBox: userBoxStatus.NO_BOX });
      }
    } catch(e){
      console.log(e);
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(accounts => console.log(accounts))
        .catch(e => console.log(e + "Failed to connect"));
    }
  }

  checkConnected = () => {
    this.isUser();
    //console.log("Checking");
    try{
      if(window.web3.utils.isAddress(window.ethereum.selectedAddress)){
        this.setState({ connected: true });
        return true;
      }
      this.setState({ connected: false });
      return false;
    } catch(e){
      this.setState({ connected: false });
      console.log(e);
      return false;
    }
  }
  
  enableWeb3 = () => {
    if(this.checkConnected()){
      return;
    }

    if(typeof window.ethereum === "undefined"){
      alert("Please install MetaMask");
    }
    window.web3 = new Web3(window.ethereum);//const web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable()
    .then(accounts => this.checkConnected())
    .catch(e => this.checkConnected());

  }


  //   .then(accounts => {
  //     // You now have an array of accounts!
  //     // Currently only ever one:
  //     // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
  //     console.log(accounts[0]);
  //   })
  //   .catch(reason => {
  //     console.error(reason);
  //   });
  //   this.checkConnected();
  //   // web3.eth.getTransactionCount("0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc")
  //   //   .then(num => console.log(num));
  // }


    // if(typeof window.ethereum === 'undefined'){
    //   alert('Looks like you need a Dapp browser to get started.')
    //   alert('Consider installing MetaMask!')
    // } else {

    //   // In the case the user has MetaMask installed, you can easily
    //   // ask them to sign in and reveal their accounts:
    //   window.ethereum.enable()
    
    //   // Remember to handle the case they reject the request:
    //   .catch(function (reason) {
    //     if(reason === 'User rejected provider access') {
    //       // The user didn't want to sign in!
    //     } else {
    //       // This shouldn't happen, so you might want to log this...
    //       alert('There was an issue signing you in.')
    //     }
    //   })
    
    //   // In the case they approve the log-in request, you'll receive their accounts:
    //   .then(function (accounts) {
    //     //console.log("ethereum: " + ethereum);
    //     // You also should verify the user is on the correct network:

    //     // if(ethereum.networkVersion !== 4) {
    //     //   alert('This application requires the rinkeby network, please switch it in your MetaMask UI.')
    //     // }
    //     const account = accounts[0];
    //     console.log("Account " + account);
    //   });
    // }



    // let web3;
    // if(window.ethereum) { //Modern DApp Browsers
    //   web3 = new Web3(window.ethereum);
    //   try {
    //     window.ethereum.enable().then(
    //       function() {
    //         console.log("Web3 Enabled");
    //       }
    //     )
    //   } catch(e) {
    //     console.log(e);
    //   }
    // } else if(window.web3) { //Legacy DApp Browsers
    //   web3 = new Web3(web3.currentProvider);
    //   console.log("Legacy web3 enabled");
    // } else { //Non-DApp Browsers
    //   alert('Please install MetaMask');
    // }
    // this.setState({ web3 });
  //   }
  // }

  refresh = () => {

  }

  render(){
    return(
      <div className="App">
        <Header />
        <Web3Status enableWeb3={ this.enableWeb3 } connected ={ this.state.connected } checkConnected={ this.checkConnected } />
        <PreTrade refresh={ this.refresh } setAddresses={ this.setAddresses } isUser={ this.state.userBox } connected={ this.state.connected }/>
        <TradeWindow addresses={ this.state.addresses } userBox={ this.state.userBox } />
      </div>
    );
  }
}

export default App;