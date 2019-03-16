import React, { Component } from "react";
import makeBlockie from "ethereum-blockies-base64";

import { AppAddress } from "../Static";

class Header extends Component {
  render() {
    return(
      <header id="section-header" className="section" style={ headerStyle }>
         { AppAddress !== "" ? <img src={makeBlockie(AppAddress)} width="32px" height="32px" alt="blockie" style={{ marginRight:"1em", marginTop:"1.15em" }} /> : "" }<h2> DOX </h2> { AppAddress !== "" ? <img src={makeBlockie(AppAddress)} width="32px" height="32px" alt="blockie" style={{ marginLeft:"1em", marginTop:"1.15em" }} /> : "" }
      </header>
    );
  }
}

const headerStyle = {
  display: "flex",
  background: "#333",
  color: "#fff",
  textAlign: "center",
  justifyContent: "center",
  padding: "0.2rem"
}

export default Header;