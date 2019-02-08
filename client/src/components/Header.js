import React, { Component } from "react";
import makeBlockie from "ethereum-blockies-base64";

import { AppAddress } from "../Static";

class Header extends Component {
  render(){
    return(
      <header id="section-header" className="section" style={ headerStyle }>
        <h2>DApp Box { AppAddress !== "" ? <img src={makeBlockie(AppAddress)} width="28px" alt="blockie" /> : "" } </h2>
      </header>
    );
  }
}

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  justifyContent: "center",
  padding: "0.2rem"
}

export default Header;