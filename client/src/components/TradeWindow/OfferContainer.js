import React, { Component } from "react";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

class OfferContainer extends Component {
  render(){
    return(
      <div className="container" style={ style }>
        <EthOffer />
        { this.props.methods.map((object, i) => <MethodOffer key= { this.props.methods[i].id } method={ this.props.methods[i] } addMethodArgument={ this.props.addMethodArgument } />) }
      </div>
    );
  }
}

const style = {
  gridColumn: "1 auto",
  gridRow: "2 auto"
}

export default OfferContainer;