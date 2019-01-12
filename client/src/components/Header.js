import React, { Component } from "react";

class Header extends Component {
  render(){
    return(
      <header id="section-header" className="section" style={ headerStyle }>
        <h2>Trade Box</h2>
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