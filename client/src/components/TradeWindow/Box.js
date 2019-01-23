import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

import abi from "../../abi";

const sendStatus = Object.freeze({ "UNSENT":1, "SENDING":2, "SENT":3 });
const satisfiedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const AppAddress = "0x34d418E6019704815F626578eb4df5839f1a445d";

class Box extends Component {

  state = {
    methods: [],
    isUser: false,
    isSatisfied: satisfiedStatus.FALSE,
    addresses: ["", ""]
  }

  constructor(props) {
    super(props);
    
    //TODO check
    this.state.addresses = props.addresses;
   }
   
   addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
  }

  addMethodArguments = (id, args) => {
    const newMethods = this.state.methods;
    
    //Can't use indexOf filter. learned the hard way
    this.state.methods.forEach((method, index) => {
      if(method.id === id) {
        newMethods[index] = method;
        newMethods[index].args = args;
        newMethods[index].sendStatus = sendStatus.SENDING;
      }
    });

    this.setState({ methods: newMethods });
  }

  //Keep sendStatus of methods up to date for safety on execution checks later
  setMethodSendStatus = (id, sendStatus) => {
    const newMethods = this.state.methods;
    
    this.state.methods.forEach((method, index) => {
      if(method.id === id) {
        newMethods[index] = method;
        newMethods[index].sendStatus = sendStatus;
      }
    });

    this.setState({ methods: newMethods });
  }

  toggleSatisfied = () => {//TODO test for web3
    if(!this.state.isUser){
      return;
    }
    let isSatisfied;

    switch(this.state.isSatisfied){
      case satisfiedStatus.TRUE:
        isSatisfied = satisfiedStatus.TOFALSE;
        break;
      case satisfiedStatus.FALSE:
        isSatisfied = satisfiedStatus.TOTRUE;
        break;
      case satisfiedStatus.TOTRUE:
        isSatisfied = satisfiedStatus.TOFALSE;
        break;
      case satisfiedStatus.TOFALSE:
        isSatisfied = satisfiedStatus.TOTRUE;
        break;
      default:
        console.log("Error in toggleSatisfied");
        return;
    }

    this.setState({ isSatisfied });
    //this.sendSetSatisfied();
  }

  async getMethods(_add1, _add2) {
    const contract = await new window.web3.eth.Contract(abi, AppAddress);

    const count = await contract.methods.getCount(_add1, _add2).call({
      from: _add1
    });
    console.log("Count: " + count);

    for(let i = 0; i < count; i++){
      try {
        const result = await contract.methods.getFuncCall(_add1, _add2, i).call({
          from: _add1
        });
        let method;
        [method.address, method.func] = [result[0], result[1]];
        this.addMethod(method);
        console.log("Address: " + method.address + ", Func: " + method.func);
      } catch(e) {
        console.error(e);
      }
    }
  }

  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary tradePartner={ this.props.tradePartner } />
        <div className="container" style={ containerStyle }>
          <EthOffer />
          { 
            this.state.methods.map((method) => 
              <MethodOffer key= { method.id } method={ method } addMethodArguments={ this.addMethodArguments } setMethodSendStatus={ this.setMethodSendStatus } addresses={ this.state.addresses } />)
          }
        </div>
        <Satisfied satisfied={ this.state.isSatisfied } toggleSatisfied={ this.toggleSatisfied } />
        { (this.props.isUser ? <SubmitBox addMethod={ this.addMethod } /> : "") }
      </div>
    );
  }
}


const containerStyle = {
  gridColumn: "1 auto",
  gridRow: "2 auto"
}

const boxStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "3fr 1fr",
  textAlign: "center",
  justifyContent: "center",
  margin: "4px",
  background: "#666",
  border: "solid",
  minHeight: "10rem",
  fontWeight: "bold"
}

//PropTypes
Box.propTypes = {
  addMethod: PropTypes.func.isRequired,
  addMethodArguments: PropTypes.func.isRequired,
  toggleSatisfied: PropTypes.func.isRequired,
  sendMethod: PropTypes.func.isRequired
}

export default Box;