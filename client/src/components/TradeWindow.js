import React, { Component } from "react";
import Box from "./TradeWindow/Box";

class TradeWindow extends Component {
  render(){
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        <Box />
        <Box />
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