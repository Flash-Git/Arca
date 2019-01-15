import React, { Component } from "react";
import Web3 from "web3";

import Header from "./components/Header";
import Web3Status from "./components/Web3Status";
import TradeWindow from "./components/TradeWindow";
import PreTrade from "./components/PreTrade";

import "./App.css";
import abi from "./abi";

class App extends Component {

  state = {
    connected: false,
    web3: undefined,
    methods: [],
    satisfied: false,
    tradePartner: "",
    validInput: false,
    executed: false
  }

  componentDidUpdate(){ 
    this.checkConnected();
  }

  setTradePartner = (tradePartner) => {
    if(this.state.connected){
      try{
        tradePartner = this.state.web3.utils.toChecksumAddress(tradePartner);
      } catch {
        this.setState({ tradePartner, validInput: false });
        return;
      }
      if(this.state.web3.utils.isAddress(tradePartner)){
        this.setState({ tradePartner, validInput: true });
      } else {
        this.setState({ tradePartner, validInput: false });
      }
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

  toggleSatisfied = (satisfied) => {
    if(this.state.connected){
      satisfied = !satisfied;
      this.setState({ satisfied });
      this.sendSetSatisfied(this.state.web3);
    }
  }

  sendMethod = (id) => {
    if(this.state.connected){
      let methIndex;
      this.state.methods.forEach(function(method, index) {
        if(method.id===id){
          methIndex = index;
        }
      });
      if(this.state.methods[methIndex].sent===false){//TODO check
        const methods = this.state.methods;
        methods[methIndex].sent = true;
        this.setState({ methods });
        this.sendAddMethod(this.state.web3, methIndex);
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

  execute = () => {
    if(this.state.connected){
      this.sendExecute(this.state.web3);
      this.setState({ executed: true })
    }
  }
  
  enableWeb3 = () => {
    window.ethereum.enable();
    window.web3 = new Web3(window.ethereum);
    console.log("web3 " + window.web3);
    console.log("ethereum " + window.ethereum);
    const web3 = window.web3;
    web3.eth.getTransactionCount("0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc")
      .then(num => console.log(num));
    this.setState({ web3 });
  }

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

  generateEncodedCall = (_i, _name, _type, _args) => {
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
      methods[_i].sent = false;
      this.setState({ methods });
    }
  }

  encodeAddMethod = (_i) => {
    return this.generateEncodedCall(_i, this.state.methods[_i].methodName, this.state.methods[_i].methodType, this.state.methods[_i].args);
  }

  getAccount(_web3) {
    return _web3.eth.getAccounts((error, accounts) => {
      return accounts[0];
    });
  }

  getTxCount(_web3, _account){
    console.log("add: " + _account);
//    return _web3.eth.getTransactionCount(_account,_web3.eth.defaultBlock, function(error, count) {
    
    return _web3.eth.getTransactionCount(_account => (error, count) => {
      console.log(count);
      console.log(error);
      return "error";
    });
  }

  async sendSetSatisfied(_web3) {
    const account = await this.getAccount(_web3);
    const tradePartner = this.state.tradePartner;
    const satisfied = this.state.satisfied;

    const contract = new _web3.eth.Contract(abi, "0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc");

    contract.methods.setSatisfied(tradePartner, satisfied).send({
      from: account
      //TODO estimate gas
    })
      .on('transactionHash', function(hash){
        console.log(hash);
      })
      .on('receipt', function(receipt){
      })
      .on('confirmation', function(confirmationNumber, receipt){
        if(confirmationNumber == 3){
          console.log(receipt);
        }
      })
      .on('error', console.error);
  }

  // txX(_contract, _account, _tradePartner, _contractAddress, _encodedCall) {
  //   try{
  //     return _contract.methods.pushFuncOffer(_tradePartner, _contractAddress, _encodedCall).send({
  //         from: _account,
  //       }, function(error, data){
  //         if(!error){
  //           console.log(data);
  //         }else{
  //         }
  //       }
  //     );
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  // sendTx(_promise){
  //   return new Promise(
  //     function(resolve, reject){
  //       _promise.on("confirmation",
  //         function(confirmationNumber, receipt){
  //         }
  //       ).on("receipt",
  //         function(receipt){
  //           resolve(true);
  //         }
  //       ).on("error",
  //         function(error){
  //           resolve(false);
  //         }
  //       );
  //     }
  //   );
  //   return(false);
  // }



  //0xC0DE71a553f178245878E86ce8cB2C1F775B72B2
  async sendAddMethod(_web3, _i) {
    const account = await this.getAccount(_web3);
    console.log("Account: " + account);
    // const ct = await this.getTxCount(_web3, account);
    // console.log("ct: " + ct);

    window.ethereum.enable();
    window.web3 = new Web3(window.ethereum);
    
    window.web3.eth.getTransactionCount("0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc")
      .then(num => console.log(num));
    
    const cunt = await _web3.eth.getTransactionCount("0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc");
    await console.log(cunt);
    return;


    const tradePartner = this.state.tradePartner;
    const contractAddress = this.state.methods[_i].contract;
    const encodedCall = this.encodeAddMethod(_i);

    const contract = new _web3.eth.Contract(abi, "0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc");
    console.log(contract.options);
    console.log(_web3.utils.isAddress("0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc"));
    console.log(_web3.utils.isAddress(tradePartner));
    console.log(_web3.utils.isAddress(contractAddress));

    console.log(tradePartner + " " + contractAddress + " " + encodedCall);


    contract.methods.pushFuncOffer(tradePartner, contractAddress, encodedCall).send({
      from: account
    })
      .then(function(receipt){
        console.log(receipt);
      });

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
  }

  async sendExecute(_web3) {
    const account = await this.getAccount(_web3);
  
    const tradePartner = this.state.tradePartner;
    console.log("NUMBER:");
    console.log(this.getAccount(_web3));
    console.log(account);
    console.log(_web3.eth.getTransactionCount(account));
    return;

    const contract = await this.getContract(_web3, abi, "0x2558aDC54E307Bef0c2B8D5bAcc4Bc9c53154EAc");
    
    contract.methods.executeTrade(tradePartner).send({
      from: account
      //TODO estimate gas
    })
      .on('transactionHash', function(hash){
        console.log(hash);
      })
      .on('receipt', function(receipt){
      })
      .on('confirmation', function(confirmationNumber, receipt){
        if(confirmationNumber == 3){
          console.log(receipt);
        }
      })
      .on('error', console.error);
  }

  render(){
    return(
      <div className="App">
        <Header />
        <Web3Status enableWeb3={ this.enableWeb3 } connected ={ this.state.connected } checkConnected={ this.checkConnected } />
        <PreTrade setTradePartner={ this.setTradePartner } tradePartner={ this.state.tradePartner } validInput={ this.state.validInput } />
        <TradeWindow execute={ this.execute } executed={ this.state.executed } tradePartner={ this.state.tradePartner } addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } satisfied={ this.state.satisfied } toggleSatisfied={ this.toggleSatisfied } sendMethod={ this.sendMethod } />
      </div>
    );
  }
}

export default App;