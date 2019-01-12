import React, { Component } from "react";
import Web3 from "web3";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";

import "./App.css";

class App extends Component {

  componentDidUpdate(){ 
    this.checkConnected();
  }

  state = {
    connected: false,
    web3: undefined,
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

  sendMethod = (id) => {
    if(this.state.connected){
      let methIndex;
      this.state.methods.forEach(function(method, index) {
        methIndex = index;
      });
      if(this.state.methods[methIndex].sent===false){//TODO check
        const methods = this.state.methods;
        methods[methIndex].sent = true;
        this.setState({ methods });
        const web3 = this.state.web3;
        this.sendAddMethod(web3, methIndex);
      }
    }
  }

  checkConnected = () => {
    if(this.state.web3===undefined&&this.state.connected===true){
      this.setState({ connected: false} );
    }else if(this.state.web3!==undefined&&this.state.connected!==true){
      this.setState({ connected: true });
    }
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
        )
      } catch(e) {
        console.log(e);
      }
    } else if(window.web3) { //Legacy DApp Browsers
      web3 = new Web3(web3.currentProvider);
      console.log("Legacy web3 enabled");
    } else { //Non-DApp Browsers
      alert('Please install MetaMask');
    }
    this.setState({ web3 })
  }

  addinput(_type, _name) {
    const input = {
      type: "",
      name: ""
    }
    input.type = _type;
    input.name = _name;
    return input;
  }

  formJson(_name, _type, _args) {
    let argInputs = [];
    for(let i = 0; i < _args.length; i++){
      argInputs.push(this.addinput(_args[i][0], _args[i][1]));
    }
    let jsonObj = { name: _name, type: _type, inputs: argInputs};
    return jsonObj;
  }

  generateEncodedCall = (_name, _type, _args) => {
    let argValues = [];
    for(let i = 0; i < _args.length; i++){
      argValues.push(_args[i][2]);
    }
    try{
      const call = this.state.web3.eth.abi.encodeFunctionCall(
        this.formJson(_name, _type, _args), argValues
      )
      return call;
    }catch(error){
      console.error(error);
      const methods = this.state.methods;
      methods.forEach(function(method, index) {
        method.sent = false;
      });
      this.setState({ methods });
    }
  }

  encodeAddMethod = (i) => {
    return this.generateEncodedCall(this.state.methods[i].methodName, this.state.methods[i].methodType, this.state.methods[i].args);
  }

  getContract(_web3, _abi, _address) {
    return _web3.eth.Contract(_abi, _address);
  }

  getAccount(_web3) {
    return _web3.eth.getAccounts((error, accounts) => {
      return accounts[0];
    });
  }

  async sendAddMethod(_web3, _i) {
    const encodedCall = this.encodeAddMethod(_i);
    console.log("Encoded Call: " + encodedCall);
    
    const account = await this.getAccount(_web3);
    console.log("Account: " + account);
    
    const abi = "";//TODO
    const address = this.state.methods[_i].contract;
  }
    // const contract = setContract(web3, abi, address);

    // const args = { account, encodedCall };

    // contract.methods.pushMethod(args).send({
    //   from: account
    //   //TODO estimate gas
    // })
    //   .on('transactionHash', function(hash){
    //     console.log(hash);
    //   })
    //   .on('receipt', function(receipt){
    //   })
    //   .on('confirmation', function(confirmationNumber, receipt){
    //     if(confirmationNumber == 3){
    //       console.log(receipt);
    //     }
    //   })
    //   .on('error', console.error);
    //   }
    // }

  render(){
    return(
      <div className="App">
        <Header />
        <Web3Status enableWeb3={ this.enableWeb3 } connected ={ this.state.connected } checkConnected={ this.checkConnected } />
        <TradeWindow addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } toggleSatisfied={ this.toggleSatisfied } sendMethod={ this.sendMethod } />
      </div>
    );
  }
}

export default App;