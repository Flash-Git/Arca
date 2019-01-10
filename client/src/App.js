import React, { Component } from "react";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";

import "./App.css";

class App extends Component {

  state = {
    methods: []
  }
  
  addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
  }

  render(){
    return(
      <div className="App">
        <Header />
        <Web3Status />
        <TradeWindow addMethod={ this.addMethod } />
      </div>
    );
  }
}

export default App;