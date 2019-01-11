import React, { Component } from "react";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";

import "./App.css";

class App extends Component {

  state = {
    methods: [],
    satisfied: false
  }
  
  addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
  }

  addMethodArguments = (id, args) => {
    const newMethods = this.state.methods;
    newMethods.filter(method => method.id === id).args = args;
    this.setState({ methods: newMethods });
  }

  toggleSatisfied = () => {
    this.setState({ satisfied: !this.state.satisfied });
  }

  render(){
    return(
      <div className="App">
        <Header />
        <Web3Status />
        <TradeWindow addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } toggleSatisfied={ this.toggleSatisfied } />
      </div>
    );
  }
}

export default App;