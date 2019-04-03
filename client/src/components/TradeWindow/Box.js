import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import OfferErc from "./OfferErc";

import abi from "../../abis/abi";
import abiErc20 from "../../abis/abiErc20";
import abiErc721 from "../../abis/abiErc721";
import { AppAddress, sendStatus } from "../../Static";

class Box extends Component {

  state = {
    localMethods: [],
    chainMethods: []
  }

  //componentWillReceiveProps(nextProps) {
   // if(nextProps.addresses === this.props.addresses){
   //   return;
    //}
    //this.setState({
    //}, () => this.getMethods());
  //}
  
   componentDidMount() {
     setInterval( () => this.getMethods(), 10000);
   }

  addLocalMethod = (method) => {
    this.setState({ localMethods: [...this.state.localMethods, method] });
  }

  addChainMethod = (method) => {
    this.setState({ chainMethods: [...this.state.chainMethods, method] });
  }

  //Keep sendStatus of methods up to date for safety on execution checks later
  setMethodSendStatus = (id, sendStatus) => {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }
    const newMethods = this.state.localMethods;
    
    this.state.localMethods.forEach((method, index) => {
      if(method.id === id){
        newMethods[index].sendStatus = sendStatus;
      }
    });
    
    this.setState({ localMethods: newMethods });
  }

  async setSatisfied(count) {//acceptTrade
    try{
      let boxContract = await new window.web3.eth.Contract(abi, AppAddress);
    
      await boxContract.methods.acceptTrade(this.props.addresses[1], this.props.partnerNonce).send({
        from: this.props.addresses[0]
      })
      .on("transactionHash", (hash) => {
        console.log("txHash: " + hash);
      })
      .on("receipt", (receipt) => {
        this.props.acceptTrade(this.props.addresses[0]);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if(confirmationNumber === 3){
          console.log("receipt: " + receipt);
        }
      })
      .on("error", console.error);
    }catch(e){
      console.log(e);
      return;
    }
  }

  async getMethods() {
    if(!this.props.connected){
      return;
    }
    
    const [add1, add2] = this.props.addresses;

    try{
      if(!window.web3.utils.isAddress(add1) && !window.web3.utils.isAddress(add2)){
        return;
      }
    }catch(e){
      return;
    }

    const offers = [];
    for(let type = 0; type < 2; type++){
      let boxContract;
      try{
        boxContract = await new window.web3.eth.Contract(abi, AppAddress);
      }catch(e){//UNCLEAN
        console.log(e);
        return;
      }
  
      let count = 0;
      let ercAbi = [];
      try{
        if(type === 0){//erc20
          ercAbi = abiErc20;
          count = await boxContract.methods.getErc20Count(add1, add2).call({
            from: add1
          });
        } else {
          ercAbi = abiErc721;
          count = await boxContract.methods.getErc721Count(add1, add2).call({
            from: add1
          });
        }
      } catch(e){
        return;
      }
      
      if(count === 0){
        continue;
      }

      for(let i = 0; i < count; i++){
        try {
          let offer = { id: type+"-"+i, type, contractAdd: "", amountId: "", sendStatus: sendStatus.SENT };
          let result;
          if(type === 0){//erc20
            result = await boxContract.methods.getOfferErc20(add1, add2, i).call({
              from: add1
            });
          } else if(type === 1){//erc721
            result = await boxContract.methods.getOfferErc721(add1, add2, i).call({
              from: add1
            });
          }
          [offer.contractAdd, offer.amountId] = [result[0], result[1].toString()];
          //console.log("id: " + offer.id + ", contractAdd: " + offer.contractAdd + ", amountId: " + offer.amountId);

          const ercContract = await new window.web3.eth.Contract(ercAbi, offer.contractAdd);
          try {//name and symbol aren't required for the erc token standards
            offer.name = await ercContract.methods.name().call({
              from: add1
            });
            offer.symbol = await ercContract.methods.symbol().call({
              from: add1
            });
          } catch(e){
            offer.name = "";
            offer.symbol = "";
            console.log(e);
          }
          offers.push(offer);
        } catch(e){
          console.error(e);
        }
      }
    }
    this.setState({ chainMethods: [] });
    offers.forEach((method) => {
      this.addChainMethod(method);
    });
    this.props.setCount(this.props.boxNum, offers.length);
    //TODO check and remove duplicates from method lists
  }

  render() {
    return(
      <div className="box" style={ boxStyle }>
        <Summary address={ this.props.addresses[0] } ensAdd={ this.props.ensAdd } />
        <div className="container" style={ containerStyle }>
          { this.state.chainMethods.map(method =>
            <OfferErc key= { method.id } method={ method }
              setMethodSendStatus={ this.setMethodSendStatus } addresses={ this.props.addresses }
              isUser={ this.props.isUser } connected={ this.props.connected } />
          ) }
          { this.state.localMethods.map(method =>
            <OfferErc key= { method.id } method={ method }
              setMethodSendStatus={ this.setMethodSendStatus } addresses={ this.props.addresses }
              isUser={ this.props.isUser } connected={ this.props.connected } />
          ) }
        </div>
        <Satisfied addresses={ this.props.addresses } setSatisfied={ this.setSatisfied }
          isUser={ this.props.isUser } connected={ this.props.connected } count={ this.props.count } />
        { (this.props.isUser ? <SubmitBox addMethod={ this.addLocalMethod } /> : "") }
      </div>
    );
  }
}

const boxStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "3fr 1fr",//TODO handle screensizes in a more aesthetically pleasing way
  textAlign: "center",
  justifyContent: "center",
  margin: "0.5rem 0.5rem",
  background: "#666",
  border: "solid",
  minHeight: "10rem",
  fontWeight: "bold",
  width: "60rem"
}

const containerStyle = {
  gridColumn: "1 auto",
  gridRow: "2 auto",
  margin: "0.1rem"
}

//PropTypes
Box.propTypes = {
  boxNum: PropTypes.number.isRequired,
  isUser: PropTypes.bool.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdd: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  setCount: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
}

export default Box;