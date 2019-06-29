import React, { Component } from "react";
import Web3 from "web3";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TradeWindow from "./components/TradeWindow";
import PreTrade from "./components/PreTrade";
import Footer from "./components/Footer";
import { SetENS } from "./components/ENS";

import { userBoxStatus } from "./Static";
import "./App.css";
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      counter: 0,
      addresses: ["", ""],
      ensAdds: ["", ""],
      erc: { contractAdd: "", type: "" },
      userBox: userBoxStatus.NO_BOX,
      width: window.innerWidth
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.checkConnection = this.checkConnection.bind(this);
    this.enableWeb3 = this.enableWeb3.bind(this);
    this.setAddresses = this.setAddresses.bind(this);
    this.addErc = this.addErc.bind(this);
  }

  componentWillMount() {
    setInterval(() => this.updateStuff(), 15000);
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  };

  updateStuff() {
    // eslint-disable-next-line
    const counter = ++this.state.counter;
    this.setState({ counter });
  }

  checkConnection() {
    try{
      //Check if user's window has a window.ethereum currently available
      if(typeof window.ethereum === "undefined"){
        alert("Please use a Web3 enabled browser (install MetaMask)");
        this.setState({ connected: false });
        return 2;
      }
      
      if(window.ethereum.networkVersion === undefined){
        alert("Please refresh the page");
        this.setState({ connected: false });
        return 2;
      }

      //Check whether the user is on the correct network
      if(window.ethereum.networkVersion !== "1" && window.ethereum.networkVersion !== "4" && window.ethereum.networkVersion !== "5"){
        console.log("Current network: " + window.ethereum.networkVersion);
        alert("The Ethereum contract is currently only running on the main, rinkeby and goerli test networks.");
        this.setState({ connected: false });
        return 2;
      }

      if(!window.web3.utils.isAddress(window.ethereum.selectedAddress)){
        this.setState({ connected: false });
        return 1;
      }
    }catch(e){
      this.setState({ connected: false });
      return 1;
    }
    return 0;
  }

  enableWeb3() {
    const connection = this.checkConnection();
    if(connection === 0){
      return this.setState({ connected: true });
    }
    if(connection === 2){
      return new Error("No connection");
    }
    
    //Attempt to open a connection to the Ethereum blockchain
    window.web3 = new Web3(window.ethereum);
    return new Promise((resolve, reject) => {
      window.ethereum.enable()
        .then(acc => {
          if(this.checkConnection() === 0){
            Promise.all([SetENS(), this.setState({ connected: true })])
              .then(() => resolve());
          }else{
            console.log("Failed to attempt to enable web3");
            alert("Please sign yourself into MetaMask");
            reject("Failed to attempt to enable web3");
          }
        })
        .catch(e => {
          this.setState({ connected: false });
          alert("There was an issue signing you in.");
          reject(e);
        });
    });
  }

  setAddresses(addresses, ensAdds) {
    this.setState({ addresses }, () => {
      if(this.state.addresses[0].toUpperCase() === window.ethereum.selectedAddress.toUpperCase()){
        this.setState({ userBox: userBoxStatus.FIRST_BOX });
      } else if(this.state.addresses[1].toUpperCase() === window.ethereum.selectedAddress.toUpperCase()){
        this.setState({ userBox: userBoxStatus.SECOND_BOX });
      } else{
        this.setState({ userBox: userBoxStatus.NO_BOX });
      }
    });
    this.setState({ ensAdds });
  }

  addErc(erc) {
    this.setState({ erc });
  }

  render() {
    return(
      <div className="App" style={ pageStyle }>
        <Header connected={ this.state.connected } width={ this.state.width } />
        <div id="section-main" className="section" style={ mainStyle } >
          <div style={ leftStyle } >
            <PreTrade connected ={ this.state.connected } enableWeb3={ this.enableWeb3 } setAddresses={ this.setAddresses } 
              isUser={ this.state.userBox } />
            <TradeWindow connected ={ this.state.connected } counter={ this.state.counter } addresses={ this.state.addresses }
              ensAdds={ this.state.ensAdds } userBox={ this.state.userBox } erc={ this.state.erc }  />
          </div>
          <div style={ rightStyle } >
            <Sidebar connected ={ this.state.connected } counter={ this.state.counter } width={ this.state.width } enableWeb3={ this.enableWeb3 }
              addErc={ this.addErc } />
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
  flexWrap: "nowrap",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center"
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