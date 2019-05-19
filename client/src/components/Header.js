import React, { Component } from "react";
//import makeBlockie from "ethereum-blockies-base64";
import PropTypes from "prop-types";

import { colours } from "../Static";

class Header extends Component {

  networkText() {
    if(!this.props.connected){
      return <div style={ textStyle }>
          <h5 style={ networkStyle }> NETWORK </h5>
        </div>;
    }
    
    if(window.ethereum.networkVersion === "1"){
      return <div style={ textStyle }>
        <h5 style={ networkStyle }> LIVE </h5>
      </div>;
    }

    if(window.ethereum.networkVersion === "4"){
      return <div style={ textStyle }>
        <h5 style={ networkStyle }> RINKEBY </h5>
      </div>;
    }

    if(window.ethereum.networkVersion === "5"){
      return <div style={ textStyle }>
        <h5 style={ networkStyle }> GOERLI </h5>
      </div>;
    }
    return <div style={ textStyle }>
      <h5 style={ networkStyle }> NETWORK </h5>
    </div>;  
  }

  headerText() {
    return <h1 style={ h1Style }> A R C A</h1>;
  }

  leftText() {
    return <div style={ textStyle }>
      <h5 style={ leftStyle }>  </h5>
    </div>;
  }

  //<span><img src={ makeBlockie(AppAddress) } width="32px" height="32px" alt="blockie" style={{...blockyStyle, ...{marginLeft:"1em"} }} /></span>
  render() {
    if(this.props.width <= 650){
      return(
        <header id="section-header" className="section" style={ {...headerStyle, ...{justifyContent: "center"}} }>
          { this.headerText() }
        </header>
      );
    }
    return(
      <header id="section-header" className="section" style={ headerStyle }>
        { this.leftText() }
        { this.headerText() }
        { this.networkText() }
      </header>
    );
  }
}

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  textAlign: "center",
  width: "100%",
  backgroundColor: colours.Primary,
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
  marginBottom: "1rem"
}

const textStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  color: colours.Secondary,
  letterSpacing: "15px",
  padding: "0",
  margin: "0"
}

const leftStyle = {
  width: "0",
  minWidth: "0",
  letterSpacing: "7px"
}

const h1Style = {
  minWidth: "15rem",
  padding: "0.45rem",
  margin: "0.6rem",
  marginBottom: "1rem"
}

const networkStyle = {
  alignSelf: "center",
  justifySelf: "center",
  letterSpacing: "7px",
  padding: "0.6rem",
  paddingRight: "1.8rem",
  paddingLeft: "0",
  margin: "0rem"
}

/*const blockyStyle = {
  marginTop:"0.72em",
  border:"solid 1px",
  boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.5)"
}*/

//PropTypes
Header.propTypes = {
  connected: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired
}

export default Header;