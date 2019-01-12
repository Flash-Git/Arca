import React, { Component } from "react";
import PropTypes from "prop-types";

import EthOffer from "./EthOffer";
import MethodOffer from "./MethodOffer";

class OfferContainer extends Component {
  
  addMethodArguments = (id, args, sent) => {
    this.props.addMethodArguments(id, args, sent);
  }

  sendMethod = (i) => {
    this.props.sendMethod(i);
  }

  render(){
    return(
      <div className="container" style={ style }>
        <EthOffer />
        { 
          this.props.methods.map((method) => 
            <MethodOffer key= { method.id } method={ method } addMethodArguments={ this.addMethodArguments } sendMethod={ this.sendMethod } />)
        }
      </div>
    );
  }
}

const style = {
  gridColumn: "1 auto",
  gridRow: "2 auto"
}

//PropTypes
OfferContainer.propTypes = {
  sendMethod: PropTypes.func.isRequired
}

export default OfferContainer;