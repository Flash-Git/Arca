import React, { Component } from "react";
import Box from "./TradeWindow/Box";

class TradeWindow extends Component {
  addMethod = (method) => {
    this.props.addMethod(method);
  }

  addMethodArguments = (id, args) => {
    this.props.addMethodArguments(id, args);
  }

  toggleSatisfied = () => {
    this.props.toggleSatisfied();
  }

  render(){
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        <Box addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } toggleSatisfied={ this.toggleSatisfied } />
        <Box addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } toggleSatisfied={ this.toggleSatisfied } />
      </div>
    );
  }
}

const tradeWindowStyle = {
  textAlign: "center",
  justifyContent: "center",
  padding: "1rem"
}

export default TradeWindow;