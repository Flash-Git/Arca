import React, { Component } from "react";
import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

class OfferContainer extends Component {

  state = {
    methods: []
  }

  addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
    this.props.addMethod(method);
  }

  addMethodArguments = (id, args) => {
    console.log("offCont " + id + " " + args);
    this.props.addMethodArguments(id, args);
  }
  render(){
    return(
      <div className="container" style={ style }>
        <EthOffer />
        { this.props.methods.map((object, i) => <MethodOffer key= { this.props.methods[i].id } method={ this.props.methods[i] } addMethodArguments={ this.addMethodArguments } />) }
      </div>
    );
  }
}

const style = {
  gridColumn: "1 auto",
  gridRow: "2 auto"
}

export default OfferContainer;