import React, { Component } from "react";
import makeBlockie from "ethereum-blockies-base64";

import { AppAddress } from "../Static";

class Header extends Component {

  headerText = () => {
    if(AppAddress !== ""){
      return <>
        <span>
          <img src={makeBlockie(AppAddress)} width="32px" height="32px" alt="blockie" style={{ marginRight:"1em", marginTop:"1.15em" }} />
        </span>
        <h2> DAPPBOX </h2>
        <span>
          <img src={makeBlockie(AppAddress)} width="32px" height="32px" alt="blockie" style={{ marginLeft:"1em", marginTop:"1.15em" }} />
        </span>
      </>;
    } else {
      return <h2> DAPPBOX </h2>;
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
  display: "flex",
  flexDirection: "row",
  background: "#333",
  color: "#fff",
  textAlign: "center",
  justifyContent: "center",
  padding: "0.2rem"
}

export default Header;