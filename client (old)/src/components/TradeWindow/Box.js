import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";
import uuid from "uuid/v4";

import abi from "../../abi";
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

    const _add1 = this.props.addresses[0];
    const _add2 = this.props.addresses[1];
    
    try{
      if(!window.web3.utils.isAddress(_add1) && !window.web3.utils.isAddress(_add2)){
        return;
      }
    }catch(e){
      return;
    }
    let contract;
    try{
      contract = await new window.web3.eth.Contract(abi, AppAddress);
    }catch(e){//UNCLEAN
      console.log(e);
    }    
    let count = 0;
    try{
      count = await contract.methods.getCount(_add1, _add2).call({
        from: _add1
      });
    } catch(e){
      return;
    }

    const arr = [];

    for(let i = 0; i < count; i++){
      try {
        const result = await contract.methods.getFuncCall(_add1, _add2, i).call({
          from: _add1
        });
        let method={};
        method.id = uuid();//TODO get ID from server
        method.methodName = "";
        method.args = [];
        method.sendStatus = sendStatus.SENT;
        method.methodType = "function";
        [method.contractAdd, method.func] = [result[0], result[1]];
        
        arr.push(method);
      } catch(e) {
        console.error(e);
      }
    }
    
    this.setState({ chainMethods: [] });
    arr.forEach((method) => {
      this.addChainMethod(method);
    });
    //TODO check and remove duplicates from both method lists
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