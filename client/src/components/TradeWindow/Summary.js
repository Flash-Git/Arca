import React, { Component } from "react";
import PropTypes from "prop-types";

class Summary extends Component {
  render(){
    return(
      <div className="method" style={ methodStyle }>
        ENS - { this.props.tradePartner } - Blockie
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

//PropTypes
Summary.propTypes = {
  tradePartner: PropTypes.string.isRequired
}

export default Summary;