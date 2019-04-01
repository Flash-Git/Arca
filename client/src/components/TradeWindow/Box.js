import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";
import uuid from "uuid/v4";

import abi from "../../abi";
import abiErc20 from "../../abiErc20";
import abiErc721 from "../../abiErc721";
import { AppAddress, sendStatus } from "../../Static";

class Box extends Component {

  state = {
    localMethods: [],
    chainMethods: []
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.addresses===this.props.addresses){
      return;
    }
    this.setState({
    }, () => this.getMethods());
  }
  
   componentDidMount() {
     setInterval( () => this.getMethods(), 30000);
   }

  addLocalMethod = (method) => {
    this.setState({ localMethods: [...this.state.localMethods, method] });
  }

  addChainMethod = (method) => {
    this.setState({ chainMethods: [...this.state.chainMethods, method] });
  }

  addMethodArguments = (id, args) => {
    const newMethods = this.state.localMethods;
    
    //Can't use indexOf filter. learned the hard way
    this.state.localMethods.forEach((method, index) => {
      if(method.id === id) {
        newMethods[index].args.push(args);
        newMethods[index].sendStatus = sendStatus.SENDING;
      }
    });

    this.setState({ localMethods: newMethods });
  }

  //Keep sendStatus of methods up to date for safety on execution checks later
  setMethodSendStatus = (id, sendStatus) => {
    if(!this.props.connected){
      alert("Not connected");
      return;
    }
    const newMethods = this.state.localMethods;
    
    this.state.localMethods.forEach((method, index) => {
      if(method.id === id) {
        newMethods[index].sendStatus = sendStatus;
      }
    });
    
    this.setState({ localMethods: newMethods });
  }

  setSatisfied = (isSatisfied) => {//TODO

  }

  async getMethods() {
    if(!this.props.connected){
      return;
    }
    
    let add1 = this.props.addresses[0];
    let add2 = this.props.addresses[1];

    try{
      if(!window.web3.utils.isAddress(add1) && !window.web3.utils.isAddress(add2)){
        return;
      }
    }catch(e){
      return;
    }

    let erc20Offers = [];
    let erc721Offers = [];
    for(let type = 0; type < 2; type++) {
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
      
      const arr = [];
      for(let i = 0; i < count; i++){
        try {
          let offer = { id: type+i, type };//TODO get ID from server
          if(type === 0){//erc20
            [offer.contractAdd, offer.amount] = await boxContract.methods.getOfferErc20(add1, add2, i).call({
              from: add1
            });
          } else {
            [offer.contractAdd, offer.id] = await boxContract.methods.getOfferErc721(add1, add2, i).call({
              from: add1
            });
          }
          const ercContract = await new window.web3.eth.Contract(ercAbi, offer.contractAdd);
          try {//name and symbol aren't required for the erc token standards
            offer.name = await ercContract.methods.name.call({
              from: add1
            });
            offer.symbol = await ercContract.methods.symbol.call({
              from: add1
            });
          } catch(e){
            offer.name = "";
            offer.symbol = "";
          }
          arr.push(offer);
        } catch(e) {
          console.error(e);
        }
      }
    }

    this.setState({ chainMethods: [] });
    erc20Offers.forEach((method) => {
      this.addChainMethod(method);
    });
    erc721Offers.forEach((method) => {
      this.addChainMethod(method);
    });
    //TODO check and remove duplicates from method lists
  }

  render() {
    return(
      <div className="box" style={ boxStyle }>
        <Summary address={ this.props.addresses[0] } ensAdd={ this.props.ensAdd } />
        <div className="container" style={ containerStyle }>
          <EthOffer connected ={ this.props.connected } />
          { this.state.chainMethods.map(method =>
            <MethodOffer key= { method.id } method={ method } addMethodArguments={ this.addMethodArguments }
              setMethodSendStatus={ this.setMethodSendStatus } addresses={ this.props.addresses } isUser={ this.props.isUser } connected ={ this.props.connected } />
          ) }
          { this.state.localMethods.map(method =>
            <MethodOffer key= { method.id } method={ method } addMethodArguments={ this.addMethodArguments }
              setMethodSendStatus={ this.setMethodSendStatus } addresses={ this.props.addresses } isUser={ this.props.isUser } connected ={ this.props.connected } />
          ) }
        </div>
        <Satisfied addresses={ this.props.addresses } setSatisfied={ this.setSatisfied } isUser={ this.props.isUser } connected ={ this.props.connected } />
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
  isUser: PropTypes.bool.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdd: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired
}

export default Box;