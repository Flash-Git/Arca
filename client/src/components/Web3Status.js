import React, { Component } from "react";
import PropTypes from "prop-types";
import { colours } from "../Static";

class Web3Status extends Component {

  onClick = () => {
    this.props.enableWeb3();
  }

  render() {
    return(
      <div id="section-web3Status" className="section" style={ web3StatusStyle }>
        <button onClick={ this.onClick } style={ (this.props.connected ? btnStyleSent : btnStyleUnsent) }>
          { (this.props.connected ? "Connected" : "Connect to Web3") }
        </button>
      </div>
    );
  }
}

const web3StatusStyle = {
  justifyContent: "center",
  textAlign: "center",
  width: "100%"
}

const btnStyleUnsent = {
  background: colours.Accent,
  border: "none",
  borderRadius: "1rem",
  color: "#FFFFFF",
  fontWeight: "bold",
  cursor: "pointer",
  padding: "6px 26px"
}

const btnStyleSent = {
  backgroundColor: "#8A9096",
  border: "none",
  borderRadius: "0",
  color: "#FFFFFF",
  fontWeight: "bold",
  padding: "4px 16px",
  marginTop: "0.1rem"
}

//PropTypes
Web3Status.propTypes = {
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired
}

export default Web3Status;