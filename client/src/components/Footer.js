import React, { Component } from "react";

import { colours } from "../Static";

class Footer extends Component {

  render() {
    return(
      <footer id="section-footer" className="section" style={ footerStyle }>
        footer content
      </footer>
    );
  }
}

const footerStyle = {
  backgroundColor: colours.Accent,
  color: "#000",
  height: "3rem",
  marginTop: "auto"
}

export default Footer;