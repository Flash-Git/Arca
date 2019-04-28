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
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
}

const btnStyleUnsent = {
  background: colours.Accent,
  padding: "6px 26px",
  border: "none",
  borderRadius: "1rem",
  cursor: "pointer",
  color: "#FFFFFF",
  fontWeight: "bold"
}

const btnStyleSent = {
  background: "#8A9096",
  padding: "4px 16px",
  border: "none",
  borderRadius: "0",
  color: "#FFFFFF",
  fontWeight: "bold",
  marginTop: "0.1rem"
}

//PropTypes
Web3Status.propTypes = {
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired
}

export default Web3Status;