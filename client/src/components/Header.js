import React, { Component } from "react";
//import makeBlockie from "ethereum-blockies-base64";
import PropTypes from "prop-types";

import { colours } from "../Static";

class Header extends Component {

  networkText = () => {
    if(!this.props.connected){
      return <div style={ textStyle }>
          <h5 style={ networkStyle }> NETWORK </h5>
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

  headerText = () => {
    return <h1 style={ h1Style }> A R C A</h1>;
  }

  leftText = () => {
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
  textAlign: "center",
  justifyContent: "space-between",
  backgroundColor: colours.Secondary,
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
  marginBottom: "1rem",
  width: "100%"
}

const textStyle = {
  display: "flex",
  flexDirection: "row",
  color: colours.Quaternary,
  textAlign: "center",
  justifyContent: "center",
  marginBottom: "0",
  letterSpacing: "15px",
  margin: "0",
  padding: "0",
  //minWidth: "9rem"
}

const leftStyle = {
  letterSpacing: "7px",
  width: "0",
  minWidth: "0"
}

const h1Style = {
  padding: "0.45rem",
  margin: "0.6rem",
  marginBottom: "1rem",
  minWidth: "15rem"
  //boxShadow: "0px 10px 25px 2px rgba(0,0,0,0.02)",
}

const networkStyle = {
  alignSelf: "center",
  justifySelf: "center",
  padding: "0.6rem",
  paddingRight: "1.8rem",
  paddingLeft: "0",
  margin: "0rem",  
  letterSpacing: "7px",
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