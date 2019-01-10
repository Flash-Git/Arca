import React, { Component } from "react";
import Box from "./TradeWindow/Box";

class TradeWindow extends Component {
  
  state = {
    methods: []
  }
  
  addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
    this.props.addMethod(method);
  }

  render(){
    return(
      <div id="section-tradeWindow" className="section" style={ tradeWindowStyle }>
        <Box addMethod={ this.addMethod } />
        <Box addMethod={ this.addMethod } />
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