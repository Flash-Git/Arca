import React, { Component } from "react";
import makeBlockie from "ethereum-blockies-base64";

import { AppAddress, colours } from "../Static";

class Header extends Component {

  headerText = () => {
    if(AppAddress !== ""){
      return <div style={ textStyle }>
        <span>
          <img src={ makeBlockie(AppAddress) } width="32px" height="32px" alt="blockie" style={{ marginRight:"1em", marginTop:"0.72em" }} />
        </span>
        <h1> DAPPBOX </h1>
        <span>
          <img src={ makeBlockie(AppAddress) } width="32px" height="32px" alt="blockie" style={{ marginLeft:"1em", marginTop:"0.72em" }} />
        </span>
      </div>;
    } else {
      return <h1> DAPPBOX </h1>;
    }
  }

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

export default Header;