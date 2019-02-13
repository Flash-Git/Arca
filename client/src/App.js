import React, { Component } from "react";
import Web3 from "web3";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";
import PreTrade from "./components/PreTrade";

import { userBoxStatus } from "./Static";
import "./App.css";

class App extends Component {
/*const BN = window.web3.utils.toBN;

  let one = new BN(this.state.addresses[0]);
  let two = new BN(this.state.addresses[1]);
  one.mul(two);
  
  console.log(one.toString(16));*/
  
  state = {
    connected: false,
    addresses: ["", ""],
    userBox: userBoxStatus.NO_BOX
  }

  checkConnection = () => {
    try{
      if(window.ethereum.networkVersion !== "4" && window.ethereum.selectedAddress !== "undefined"){
        alert("The Ethereum contract is currently running on the rinkeby network.");
        this.setState({ connected: false });
        return 3;
      }
      if(!window.web3.utils.isAddress(window.ethereum.selectedAddress)){
        this.setState({ connected: false });
        return 2;
      }
    }catch(e){
      this.setState({ connected: false });
      return 1;
    }
    this.setState({ connected: true });
    return 0;
  }

  enableWeb3 = () => {
    const connection = this.checkConnection();
    //Check whether the DApp has an open connection to the Ethereum blockchain
    if(connection === 0) return;
    
    //Check whether the user is on the rinkeby network
    if(connection === 3) return;
    
    //Check if user's window has a window.ethereum currently available
    if(typeof window.ethereum === "undefined"){
      alert("Please install MetaMask");
      return;
    }
    
    //Attempt to open a connection to the Ethereum blockchain
    //Old const web3 = new Web3(window.web3.currentProvider);//
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable()
    .then(accounts => this.checkConnection())
    .catch(e => {
      if(e !== "User rejected provider access"){
        alert("There was an issue signing you in. Please check console for error");
        console.log("Error:\n" + e);
        return;
      }
    });
  }

  setAddresses = (addresses) => {
    this.setState({ addresses }, () => {
      this.checkUserBox();
    });
  }

  checkUserBox = () => {
    try{
      if(this.state.addresses[0].toUpperCase() === window.ethereum.selectedAddress.toUpperCase()){
        this.setState({ userBox: userBoxStatus.FIRST_BOX });
      } else if(this.state.addresses[1].toUpperCase() === window.ethereum.selectedAddress.toUpperCase()){
        this.setState({ userBox: userBoxStatus.SECOND_BOX });
      } else{
        this.setState({ userBox: userBoxStatus.NO_BOX });
      }
    } catch(e){
      console.log("Provider address not found");
      console.log("Enabling Ethereum...");
      this.enableWeb3();
    }
  }

  refresh = () => {

  }

  render(){
    return(
      <div className="App">
        <Header />
        <Web3Status enableWeb3={ this.enableWeb3 } connected ={ this.state.connected } checkConnected={ this.checkConnected } />
        <PreTrade refresh={ this.refresh } setAddresses={ this.setAddresses } isUser={ this.state.userBox } connected={ this.state.connected }/>
        <TradeWindow addresses={ this.state.addresses } userBox={ this.state.userBox } connected ={ this.state.connected } />
      </div>
    );
  }
}

export default App;