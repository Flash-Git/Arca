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
  gridColumn: "1 / 3",
  gridRow: "1",
  textAlign: "center",
  justifyContent: "center",
  background: "#222",
  color: "#fff"
}

export default Summary;