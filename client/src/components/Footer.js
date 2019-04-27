import React, { Component } from "react";

import { colours } from "../Static";

class Footer extends Component {

  render() {
    return(
      <footer id="section-footer" className="section" style={ footerStyle }>
      </footer>
    );
  }
}

const footerStyle = {
  backgroundColor: colours.Accent,
  color: "#000",
  height: "6rem",
  marginTop: "auto"
}

export default Footer;