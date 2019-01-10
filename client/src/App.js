import React, { Component } from "react";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";

import "./App.css";

class App extends Component {
  render(){
    return(
      <div className="App">
        <Header />
        <Web3Status />
        <TradeWindow />
      </div>
    );
  }
}

export default App;