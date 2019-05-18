import React, { Component } from "react";
import Web3Status from "./Web3Status";
import TokenInfo from "./UserInfo/TokenInfo";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import { colours } from "../Static";

class UserInfo extends Component {//TODO add button to side sidebar
  render() {
    if(this.props.width <= 650){
      return null;
    }

    if(!this.props.connected){
      return(
        <div id="section-userInfo" className="section" style={ userInfoStyle }>
          <div style={{ margin: "0.45rem", padding: "0.5rem" }}>
            <Web3Status connected ={ this.props.connected } enableWeb3={ this.props.enableWeb3 } />
          </div>
        </div>
      );
    }

    return(
      <div id="section-userInfo" className="section" style={ userInfoStyle }>
        <div style={ topStyle }>
          <img src={ makeBlockie(window.ethereum.selectedAddress) } width="32px" height="32px" alt="blockie" />
          <Web3Status connected ={ this.props.connected } enableWeb3={ this.props.enableWeb3 } />
        </div>
        <div style={ bottomStyle }>
          <TokenInfo connected={ this.props.connected } counter={ this.props.counter } address={ window.ethereum.selectedAddress }
            addErc={ this.props.addErc } />
        </div>
      </div>
    );
  }
}

const userInfoStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxHeight: "100%",
  color: colours.Quaternary,
  textAlign: "center",
  marginLeft: "auto"//
}

const topStyle = {
  minWidth: "9rem",
  padding: "0.4rem",
  margin: "0.5rem",
  marginBottom: "0.8rem",
  marginTop: "0"
}

const bottomStyle = {
  maxHeight: "26rem",//?
  borderRadius: "20px",
  overflowY: "auto",
  scrollbarWidth: "thin"
}

//PropTypes
UserInfo.propTypes = {
  connected: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  enableWeb3: PropTypes.func.isRequired,
  addErc: PropTypes.func.isRequired,
}

export default UserInfo;