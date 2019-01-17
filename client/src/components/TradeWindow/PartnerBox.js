import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import OfferContainer from "./OfferContainer";
import Satisfied from "./Satisfied";

class PartnerBox extends Component {

  state = {
    methods: []
  }

  addMethod = (method) => {
    this.setState({ methods: [...this.state.methods, method] });
  }

  addMethodArguments = (id, args, sent) => {

  }

  toggleSatisfied = (satisfied) => {
    
  }

  sendMethod = (i) => {
    
  }

  render(){
    return(
      <div className="box" style={ boxStyle }>
        <Summary tradePartner={ this.props.tradePartner } />
        <OfferContainer methods={ this.state.methods } addMethodArguments={ this.addMethodArguments } sendMethod={ this.sendMethod } />
        <Satisfied satisfied={ this.props.satisfied } toggleSatisfied={ this.toggleSatisfied } />
      </div>
    );
  }
}

const boxStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateColumns: "3fr 1fr",
  textAlign: "center",
  justifyContent: "center",
  margin: "4px",
  background: "#666",
  border: "solid",
  minHeight: "10rem",
  fontWeight: "bold"
}

//PropTypes
PartnerBox.propTypes = {
  addMethod: PropTypes.func.isRequired,
  addMethodArguments: PropTypes.func.isRequired,
  toggleSatisfied: PropTypes.func.isRequired,
  sendMethod: PropTypes.func.isRequired
}

export default PartnerBox;