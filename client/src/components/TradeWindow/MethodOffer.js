import React, { Component } from "react";
import PropTypes from "prop-types";

import abi from "../../abi";

const AppAddress = "0x34d418E6019704815F626578eb4df5839f1a445d";
const sendStatus = Object.freeze({ "UNSENT":1, "SENDING":2, "SENT":3 });

class MethodOffer extends Component {

  state = {
    argType: "",
    argName: "",
    argValue: "",
    sendStatus: sendStatus.UNSENT
  }

  onChange = (e) => this.setState({
    [e.target.name]: e.target.value
  });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addMethodArguments(this.props.method.id, [this.state.argType, this.state.argName, this.state.argValue], this.state.sendStatus);
  }

  generateEncodedCall = (_name, _type, _args) => {
    let argValues = [];
    for(let i = 0; i < _args.length; i++){
      argValues.push(_args[i][2]);
    }
    try{
      const call = window.web3.eth.abi.encodeFunctionCall(
        this.formJson(_name, _type, _args), argValues
      )
      this.setState({ sendStatus: sendStatus.SENDING });
      return call;
    }catch(error){
      console.error(error);
      this.setState({ sendStatus: sendStatus.UNSENT });
    }
  }

  async sendMethod() {
    const method = this.props.method;

    //TODO add checks
    const add1 = this.props.addresses[0];
    const add2 = this.props.addresses[1];

    const contractAdd = method.contractAdd;
    const encodedCall = this.generateEncodedCall(method.methodName, method.methodType, method.args);

    const contract = await new window.web3.eth.Contract(abi, AppAddress);
    console.log("add1: " + add1);
    console.log("add2: " + add2);
    console.log("contractAddress: " + contractAdd);
    console.log("encodedCall: " + encodedCall);

    await contract.methods.pushFuncOffer(add2, contractAdd, encodedCall).send({
      from: add1
   })
    .on("transactionHash", function(hash){
      console.log("txHash: " + hash);
    })
    .on("receipt", function(receipt){
      this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
    })
    .on("confirmation", function(confirmationNumber, receipt){
      if(confirmationNumber === 3){
        console.log("receipt: " + receipt);
      }
    })
    .on('error', console.error);
  }

  render(){
    const method = this.props.method;

    return(
      <div className="method" style={ methodStyle }>
        <div className="display" style={ displayStyle }>
          { method.contract + " " + method.methodType + " " + method.methodName }
          { "(" }
          { this.props.method.args.map((arg, i) => (
            arg[0] + ": " + arg[1] + " = " + arg[2] + (i===method.args.length-1 ? "" : ", ")
          )) }
          { ")" }
        </div>
        { method.sendStatus ? "" : 
          (
          <form onSubmit={ this.onSubmit } className="form" style={ formStyle }>
            <input 
              type="text" 
              name="argType" 
              placeholder="Arg Type" 
              value={ this.state.argType }
              onChange={ this.onChange }
            />
            <input 
              type="text" 
              name="argName" 
              placeholder="Arg name" 
              value={ this.state.argName }
              onChange={ this.onChange }
            />
            <input 
              type="text" 
              name="argValue" 
              placeholder="Arg value" 
              value={ this.state.argValue }
              onChange={ this.onChange }
            />
            <input 
              type="submit" 
              value="Add Args" 
              className="btn"
            />
          </form>
        ) }
        <button onClick={ this.sendMethod } style={ (method.sendStatus!==sendStatus.SENT ? btnStyleSent : btnStyleUnsent) }>{ (method.sendStatus!==sendStatus.SENT ? "Sent" : "Send Method") }</button>
      </div>
    );
  }
}

const methodStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "5fr 1fr",
  gridTemplateRows: "1 1",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const displayStyle = {
  gridColumn: "1 / 2",
  gridRow: "1",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const formStyle = {
  gridColumn: "1 / 2",
  gridRow: "2 / 3",
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  fontSize: "0.85em"
}

const btnStyleUnsent = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#660000",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

const btnStyleSent = {
  gridColumn: "2",
  gridRow: "1 / 3",
  background: "#441111",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  color: "#fff",
  fontWeight: "bold",
}

//PropTypes
MethodOffer.propTypes = {
  method: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  addMethodArguments: PropTypes.func.isRequired,
  setMethodSendStatus: PropTypes.func.isRequired
}

export default MethodOffer;