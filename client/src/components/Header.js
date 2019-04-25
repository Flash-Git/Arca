import React, { Component } from "react";
import makeBlockie from "ethereum-blockies-base64";

import { AppAddress, colours } from "../Static";

class Header extends Component {

  headerText = () => {
    if(AppAddress !== ""){
      return <div style={ textStyle }>
        <h1 style={{ padding: "0.55rem", margin: "0.8rem", boxShadow: "0px 10px 25px 2px rgba(0,0,0,0.04)" }}> A R C A </h1>
      </div>;
    } else {
      return <h1 style={{ padding: "0.55rem", margin: "0.8rem", boxShadow: "0px 10px 25px 2px rgba(0,0,0,0.08)" }}> A R C A </h1>;
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

const headerStyle = {
  backgroundColor: colours.Secondary
}

const textStyle = {
  display: "flex",
  flexDirection: "row",
  color: colours.Quaternary,
  textAlign: "center",
  justifyContent: "center",
  marginBottom: "0.7rem",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)"
}

const blockyStyle = {
  marginTop:"0.72em",
  border:"solid 1px",
  boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.5)"
}

export default Header;