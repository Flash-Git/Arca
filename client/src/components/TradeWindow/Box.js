import React, { Component } from "react";
import Summary from "./Summary";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

class Box extends Component {
  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary />
        <EthOffer />
        <MethodOffer />
        <MethodOffer />
        <MethodOffer />
      </div>
    );
  }
}

const boxStyle = {
  textAlign: "center",
  justifyContent: "center",
  margin: "4px",
  background: "#666",
  border: "solid",
  minHeight: "10rem",
  fontWeight: "bold"
}

export default Box;