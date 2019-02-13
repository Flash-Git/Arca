import React, { Component } from "react";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";
class Summary extends Component {

  render(){
    return(
      <div className="method" style={ methodStyle }>
        { this.props.ensAdd !== "" ? this.props.ensAdd + " - " : "" } { this.props.address } &nbsp; { this.props.address !== "" ? <img src={makeBlockie(this.props.address)} width="22px" height="22px" alt="blockie" style={{ marginTop:"0.2em" }} /> : "" }
      </div>
    );
  }
}

const methodStyle = {
  display: "flex",
  gridColumn: "1 / 3",
  gridRow: "1",
  textAlign: "center",
  justifyContent: "center",
  background: "#222",
  color: "#fff",
  marginTop:"0.8rem"
}

//PropTypes
Summary.propTypes = {
  address: PropTypes.string.isRequired,
  ensAdd: PropTypes.string.isRequired
}

export default Summary;