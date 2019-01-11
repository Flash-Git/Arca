import React, { Component } from "react";
import Web3 from "web3";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";

import "./App.css";

class App extends Component {

  state = {
    web3: Object,
    methods: [],
    satisfied: false
  }

  enableWeb3 = () => {
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
        <Web3Status enableWeb3={ this.enableWeb3 } />
        <TradeWindow addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } toggleSatisfied={ this.toggleSatisfied } />
      </div>
    );
  }
}

export default App;

// //var json = '{"name": "", "type": "function", "inputs": [{"type": "", "name": ""}]}';

// function formJson(_name, _type, _inputs){
//   //todo validate inputs
//   let innerInputs = [];
//   for(let i = 0; i < _inputs.length; i++){
//     innerInputs.push(addinput(_inputs[i][0], _inputs[i][1]));
//   }
  
//   let jsonObj = { name: _name, type: _type, inputs: innerInputs};
//   return jsonObj;
// }

// function addinput(_type, _name) {
//   const input = {
//     type: "",
//     name: ""
//   }
//   input.type = _type;
//   input.name = _name;
//   return input;
// }

// const name = "setSquish";
// const funct = "function";
// const inputs = [
//   ["uint256", "_value"]
// ];

// function generateEncodedCall(_name, _type, _inputs, _args){
//   return web3.eth.abi.encodeFunctionCall(
//     formJson(name, funct, inputs), _args
//   );
// }

// const encodedCall = generateEncodedCall(name, funct, inputs, ["5"]);
// console.log(encodedCall);