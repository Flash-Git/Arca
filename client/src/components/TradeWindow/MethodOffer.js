import React, { Component } from "react";
import PropTypes from "prop-types";

import abi from "../../abi";
import { AppAddress, sendStatus } from "../../Static";


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

  sendMethod = () => {
    const method = this.props.method;

    //TODO add checks
    this.generateEncodedCall(method.methodName, method.methodType, method.args)
    .then(encodedCall => this.broadcast(this.props.addresses[0], this.props.addresses[1], method.contractAdd, encodedCall),
        this.setState({ sendStatus: sendStatus.SENDING })
      )
    .catch(e => this.setState({ sendStatus: sendStatus.UNSENT }));
  }

  async generateEncodedCall(_name, _type, _args) {
    let argValues = [];
    for(let i = 0; i < _args.length; i++){
      argValues.push(_args[i][2]);
    }
    try{
      const call = await window.web3.eth.abi.encodeFunctionCall(
        this.formJson(_name, _type, _args), argValues
      );
      //this.setState({ sendStatus: sendStatus.SENDING });
      return call;
    }catch(error){
      console.error(error);
      return false;
      //this.setState({ sendStatus: sendStatus.UNSENT });
    }
  }

  formJson(_name, _type, _args) {
    let argInputs = [];
    for(let i = 0; i < _args.length; i++){
      argInputs.push(this.addinput(_args[i][0], _args[i][1]));
    }
    let jsonObj = { name: _name, type: _type, inputs: argInputs};
    return jsonObj;
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

  async broadcast(_add1, _add2, _contractAdd, _encodedCall) {
    const contract = await new window.web3.eth.Contract(abi, AppAddress);

    try{
      await contract.methods.pushFuncOffer(_add2, _contractAdd, _encodedCall).send({
        from: _add1
    })
      .on("transactionHash", (hash) => {
        console.log("txHash: " + hash);
      })
      .on("receipt", (receipt) => {
        this.props.setMethodSendStatus(this.props.method.id, sendStatus.SENT);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if(confirmationNumber === 3){
          console.log("receipt: " + receipt);
        }
      })
      .on('error', console.error);
    } catch(e){
      console.log(e);
    }
  }

  render(){
    const method = this.props.method;

    return(
      <div className="method" style={ methodStyle }>
        <div className="display" style={ displayStyle }>
          { method.contractAdd + " " + method.methodType + " " + method.methodName }
          { "(" }
          { this.props.method.args.map((arg, i) => (
            arg[0] + ": " + arg[1] + " = " + arg[2] + (i === method.args.length-1 ? "" : ", ")
          )) }
          { ")\n" }
          { method.func }
        </div>
        { ((method.sendStatus === sendStatus.SENT)||(!this.props.isUser)) ? "" : //TODO
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
        <button onClick={ this.sendMethod } style={ (method.sendStatus === sendStatus.SENT ? btnStyleSent : btnStyleUnsent) }>
          { (method.sendStatus === sendStatus.SENT ? "Sent" : "Send Method") }
        </button>
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
  isUser: PropTypes.bool.isRequired,
  addMethodArguments: PropTypes.func.isRequired,
  setMethodSendStatus: PropTypes.func.isRequired
}

export default MethodOffer;