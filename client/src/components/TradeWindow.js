import React, { Component } from "react";
import PropTypes from "prop-types";

import Box from "./TradeWindow/Box";

class TradeWindow extends Component {
  addMethod = (method) => {
    this.props.addMethod(method);
  }

  addMethodArguments = (id, args) => {
    this.props.addMethodArguments(id, args);
  }

  toggleSatisfied = (satisfied) => {
    this.props.toggleSatisfied(satisfied);
  }

  sendMethod = (i) => {
    this.props.sendMethod(i);
  }

  render(){
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        <Box addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } toggleSatisfied={ this.toggleSatisfied } sendMethod={ this.sendMethod } />
        <Box addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } toggleSatisfied={ this.toggleSatisfied } sendMethod={ this.sendMethod } />
      </div>
    );
  }
}

const tradeWindowStyle = {
  textAlign: "center",
  justifyContent: "center",
  padding: "1rem"
}

//PropTypes
TradeWindow.propTypes = {
  addMethod: PropTypes.func.isRequired,
  toggleSatisfied: PropTypes.func.isRequired,
  sendMethod: PropTypes.func.isRequired
}

export default TradeWindow;