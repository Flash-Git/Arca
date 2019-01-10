import React, { Component } from "react";

class Ethoffer extends Component {
  render(){
    return(
      <div className="method" style={ methodStyle }>
        Eth Offer
      </div>
    );
  }
}

const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem",
  marginBottom: "0.5rem"
}

export default Ethoffer;