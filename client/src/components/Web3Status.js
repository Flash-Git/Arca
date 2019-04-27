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
  color: "#fff",
  fontWeight: "bold"
}

const btnStyleSent = {
  background: "#A6B2B8",
  padding: "6px 26px",
  border: "none",
  borderRadius: "0",
  color: "#fff",
  fontWeight: "bold",
}

//PropTypes
Web3Status.propTypes = {
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired
}

export default Web3Status;