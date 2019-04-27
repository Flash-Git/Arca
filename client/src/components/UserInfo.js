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
          <div style={{ margin: "0.45rem", padding: "0.5rem" }}>
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
  color: colours.Quaternary,
  width: "13rem",
  textAlign: "center",
  justifyContent: "center",
  //marginRight: "0.4rem",
}

const topStyle = {
  //margin: "0.8rem",
  marginBottom: "0.8rem",
  marginTop: "0",
  padding: "0.4rem",
}

const bottomStyle = {
  borderRadius: "20px",
  maxHeight: "26rem",//?
  overflowY: "auto",
  scrollbarWidth: "thin",
}

//PropTypes
UserInfo.propTypes = {
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired,
  addErc: PropTypes.func.isRequired
}

export default UserInfo;