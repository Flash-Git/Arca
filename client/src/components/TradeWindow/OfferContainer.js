import React, { Component } from "react";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

class OfferContainer extends Component {
  render(){
    return(
      <div className="container" style={ style }>
        <EthOffer />
        <MethodOffer />
        <MethodOffer />
        <MethodOffer />
      </div>
    );
  }
}

const style = {
  gridColumn: "1 auto",
  gridRow: "2 auto"
}

export default OfferContainer;