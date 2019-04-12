import React, { Component } from "react";
import Web3Status from "./Web3Status";
import TokenInfo from "./UserInfo/TokenInfo";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import { colours } from "../Static";

class UserInfo extends Component {
  render() {
    if(!window.ethereum.selectedAddress){
      return(
        <div id="section-userInfo" className="section" style={ userInfoStyle }>
          <div style={{ margin: "0.45rem", padding: "0.5rem", background: colours.Secondary, minHeight: "20rem" }}>
            <Web3Status enableWeb3={ this.props.enableWeb3 } connected ={ this.props.connected } />
          </div>
        </div>
      );
    }
    return(
      <div id="section-userInfo" className="section" style={ userInfoStyle }>
        <div style={ topStyle }>
          <img src={ makeBlockie(window.ethereum.selectedAddress) } width="32px" height="32px" alt="blockie" />
          <Web3Status enableWeb3={ this.props.enableWeb3 } connected ={ this.props.connected } />
        </div>
        <div style={ bottomStyle }>
          <TokenInfo address={ window.ethereum.selectedAddress } connected={ this.props.connected } addErc={ this.props.addErc } />
        </div>
      </div>
    );
  }
}

const userInfoStyle = {
  width: "10.5rem",
  minHeight: "15rem",
  maxHeight: "80%",
  right: "0",
  position: "fixed",
  textAlign: "center",
  justifyContent: "center",
  background: colours.Primary,
  marginTop: "3rem",
  marginRight: "0.2rem",
  //border: "solid",
  overflowY: "auto",
  scrollbarWidth: "thin"
}

const topStyle = {
  margin: "0.45rem",
  padding: "0.5rem",
  background: colours.Secondary,
  //border: "solid"
}

const bottomStyle = {
  margin: "0.45rem",
  background: colours.Secondary,
  minHeight: "20rem",
  //border: "solid"
}

//PropTypes
UserInfo.propTypes = {
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired,
  addErc: PropTypes.func.isRequired
}

export default UserInfo;