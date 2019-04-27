import React, { Component } from "react";
//import makeBlockie from "ethereum-blockies-base64";

import { AppAddress, colours } from "../Static";

class Header extends Component {

  headerText = () => {
    if(AppAddress !== ""){
      return <div style={ textStyle }>
        <h1 style={ h1Style }> A R C A </h1>
      </div>;
    } else {
      return <h1 style={ h1Style }> A R C A </h1>;
    }
  }
  //<span><img src={ makeBlockie(AppAddress) } width="32px" height="32px" alt="blockie" style={{...blockyStyle, ...{marginLeft:"1em"} }} /></span>
  render() {
    return(
      <header id="section-header" className="section" style={ headerStyle }>
        { this.headerText() }
      </header>
    );
  }
}

const h1Style = {
  padding: "0.45rem",
  margin: "0.6rem",
  marginBottom: "1rem",
  boxShadow: "0px 10px 25px 2px rgba(0,0,0,0.02)",
}

const headerStyle = {
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
  letterSpacing: "15px"
}

/*const blockyStyle = {
  marginTop:"0.72em",
  border:"solid 1px",
  boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.5)"
}*/

export default Header;