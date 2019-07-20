import React from "react";
//import makeBlockie from "ethereum-blockies-base64";
import PropTypes from "prop-types";

import { colours } from "../../Static";

const Navbar = () => {
  const connected = true;
  const network = 1;

  const networkText = network => {
    switch (network) {
      case 1:
        return "LIVE";
      case 4:
        return "RINKEBY";
      case 5:
        return "GOERLI";
      default:
        return "NETWORK";
    }
  };

  return (
    <header id="section-header" className="section" style={headerStyle}>
      <div style={textStyle}>
        <h5 style={leftStyle}> </h5>
      </div>
      <h1 style={h1Style}> A R C A</h1>
      <div style={textStyle}>
        <h5 style={networkStyle}>
          {!connected ? "Network" : networkText(network)}
        </h5>
      </div>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  textAlign: "center",
  width: "100%",
  backgroundColor: colours.Primary,
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
  marginBottom: "1rem"
};

const textStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  color: colours.Secondary,
  letterSpacing: "15px",
  padding: "0",
  margin: "0"
};

const leftStyle = {
  width: "0",
  minWidth: "0",
  letterSpacing: "7px"
};

const h1Style = {
  minWidth: "15rem",
  padding: "0.45rem",
  margin: "0.6rem",
  marginBottom: "1rem"
};

const networkStyle = {
  alignSelf: "center",
  justifySelf: "center",
  letterSpacing: "7px",
  padding: "0.6rem",
  paddingRight: "1.8rem",
  paddingLeft: "0",
  margin: "0rem"
};

/*const blockyStyle = {
  marginTop:"0.72em",
  border:"solid 1px",
  boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.5)"
}*/

//PropTypes
Navbar.propTypes = {};

export default Navbar;
