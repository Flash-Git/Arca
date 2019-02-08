import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";
class Summary extends Component {

  render(){
    return(
      <div className="method" style={ methodStyle }>
        ENS - { this.props.address } - { this.props.address !== "" ? <img src={makeBlockie(this.props.address)} width="22px" alt="blockie" /> : "" }
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
  address: PropTypes.string.isRequired
}

export default Summary;