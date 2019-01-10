import React, { Component } from "react";

class Summary extends Component {
  render(){
    return(
      <div className="method" style={ methodStyle }>
        ENS - Address - Blockie
      </div>
    );
  }
}

const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#222",
  color: "#fff"
}

export default Summary;