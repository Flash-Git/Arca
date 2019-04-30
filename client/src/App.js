import React, { Component } from "react";
import Web3 from "web3";

import Header from "./components/Header";
import UserInfo from "./components/UserInfo";
import TradeWindow from "./components/TradeWindow";
import PreTrade from "./components/PreTrade";
import Footer from "./components/Footer";

import { userBoxStatus } from "./Static";
import "./App.css";

class App extends Component {

  state = {
    connected: false,
    addresses: ["", ""],
    ensAdds: ["", ""],
    erc: { contractAdd: "", type: "" },
    userBox: userBoxStatus.NO_BOX
  }

  checkConnection = () => {
    try{
      //Disable if using Embark
      if(window.ethereum.networkVersion !== "4"){
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
    
    //Check whether the user is on the correct network
    if(connection === 3) return;
    
    //Check if user's window has a window.ethereum currently available
    if(typeof window.ethereum === "undefined"){
      alert("Please install MetaMask");
      return;
    }
    
    //Attempt to open a connection to the Ethereum blockchain
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable()
    .then(accounts => this.checkConnection())
    .catch(e => {
      if(e !== "User rejected provider access"){
        alert("There was an issue signing you in. Please check console(F12) for error");
        console.log("\nError:\n" + e);
        return;
      }
    });
  }

  setAddresses = (addresses, ensAdds) => {
    this.setState({ addresses }, () => {
      this.checkUserBox();
    });
    this.setState({ ensAdds });
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

  addErc = (erc) => {
    this.setState({ erc });
  }

  render() {
    return(
      <div className="App" style={ pageStyle }>
        <Header />
        <div id="section-main" className="section" style={ mainStyle } >
          <div style={ leftStyle } >
            <PreTrade refresh={ this.refresh } setAddresses={ this.setAddresses }
              isUser={ this.state.userBox } connected={ this.state.connected }/>
            <TradeWindow addresses={ this.state.addresses } ensAdds={ this.state.ensAdds }
            userBox={ this.state.userBox } connected={ this.state.connected } erc={ this.state.erc } />
          </div>
          <div style={ rightStyle } >
            <UserInfo enableWeb3={ this.enableWeb3 } connected ={ this.state.connected } addErc={ this.addErc } />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  minHeight: "100vh"
}

const mainStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  textAlign: "center",
  justifyContent: "center",
}

const leftStyle = {
  display: "flex",
  flexDirection: "column",
  minWidth: "10rem",
  width: "55rem",
  margin: "auto"
}

const rightStyle = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "100%"
}

export default App;