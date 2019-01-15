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
        <Box tradePartner={ this.props.tradePartner }  addMethod={ this.addMethod } addMethodArguments={ this.addMethodArguments } satisfied={ this.props.satisfied } toggleSatisfied={ this.toggleSatisfied } sendMethod={ this.sendMethod } />
        <button onClick={ this.props.execute } style={ (this.props.executed ? btnStyleSent : btnStyleUnsent) }>{ (this.props.executed ? "Executed" : "Execute") }</button>
      </div>
    );
  }
}

const tradeWindowStyle = {
  textAlign: "center",
  justifyContent: "center",
  padding: "1rem"
}

const btnStyleUnsent = {
  background: "#660000",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

const btnStyleSent = {
  background: "#441111",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  color: "#fff",
  fontWeight: "bold",
}

//PropTypes
TradeWindow.propTypes = {
  addMethod: PropTypes.func.isRequired,
  addMethodArguments: PropTypes.func.isRequired,
  toggleSatisfied: PropTypes.func.isRequired,
  sendMethod: PropTypes.func.isRequired
}

export default TradeWindow;