import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";
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


  addMethodArguments = (id, args, sent) => {
    let newMethods = this.state.methods;
    let argMeth;
    let argMethIndex;
    //Can't use indexOf filter. learned the hard way
    this.state.methods.forEach(function(method, index) {
      argMethIndex = index;
      argMeth = method;
      argMeth.args = args;
      argMeth.sent = sent;
    });

    newMethods[argMethIndex] = argMeth;
    this.setState({ methods: newMethods });
  }

  toggleSatisfied = (satisfied) => {//TODO test for web3
    satisfied = !satisfied;
    this.setState({ satisfied });
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