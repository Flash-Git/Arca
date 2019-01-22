import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

const sendStatus = Object.freeze({ "UNSENT":1, "SENDING":2, "SENT":3 });
const satisfiedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });

class Box extends Component {

  state = {
    methods: [],
    isUser: false,
    isSatisfied: false,
    addresses: ["", ""]
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

  toggleSatisfied = () => {//TODO test for web3
    let isSatisfied;

    switch(this.state.isSatisfied){
      case satisfiedStatus.TRUE:
        satisfied = satisfiedStatus.TOFALSE;
        break;
      case satisfiedStatus.FALSE:
        satisfied = satisfiedStatus.TOTRUE;
        break;
      case satisfiedStatus.TOTRUE:
        satisfied = satisfiedStatus.TOFALSE;
        break;
      case satisfiedStatus.TOFALSE:
        satisfied = satisfiedStatus.TOTRUE;
        break;
    }

    this.setState({ isSatisfied });
    //this.sendSetSatisfied();
  }

  sendMethod = (id) => {
    
  }

  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary tradePartner={ this.props.tradePartner } />
        <div className="container" style={ containerStyle }>
          <EthOffer />
          { 
            this.props.methods.map((method) => 
              <MethodOffer key= { method.id } method={ method } addMethodArguments={ this.addMethodArguments } sendMethod={ this.sendMethod } />)
          }
        </div>
        <Satisfied satisfied={ this.state.isSatisfied } toggleSatisfied={ this.toggleSatisfied } />
        <SubmitBox addMethod={ this.addMethod } />
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