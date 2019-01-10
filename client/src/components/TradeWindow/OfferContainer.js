import React, { Component } from "react";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

class OfferContainer extends Component {

  state = {
    methods: []
  }

  render(){
    return(
      <div className="container" style={ style }>
        <EthOffer />
        { this.props.methods.map((object, i) => <MethodOffer />) }
      </div>
    );
  }
}

const style = {
  gridColumn: "1 auto",
  gridRow: "2 auto"
}

export default OfferContainer;