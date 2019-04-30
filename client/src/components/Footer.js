import React, { Component } from "react";
import { faGithub, faTwitter, faEthereum, faBitcoin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { colours } from "../Static";

class Footer extends Component {

  render() {
    return(
      <footer id="section-footer" className="section" style={ footerStyle }>
        <ul style={ ulStyle }>
          <a style={ linkStyle } href="https://etherscan.io/address/jaquinn.eth">
            <FontAwesomeIcon style={ iconStyle } icon={ faEthereum } />&nbsp;Donations
          </a>
          <a style={ linkStyle } href="mailto:contact@etharca.com">
            <FontAwesomeIcon style={ iconStyle } icon={ faAt } />&nbsp;Inquiries
          </a>
          <a style={ linkStyle } href="https://blockstream.info/address/bc1qvn7u88k5qpq2m7g8mu8swh88v7q59msxa4w6vg">
            <FontAwesomeIcon style={ iconStyle } icon={ faBitcoin } />&nbsp;Donations
          </a>
          <a style={ linkStyle } href="https://twitter.com/flashyqpt">
            <FontAwesomeIcon style={ iconStyle } icon={ faTwitter } />&nbsp;Twitter
          </a>
          <a style={ linkStyle } href="https://github.com/Flash-Git/Arca">
            <FontAwesomeIcon style={ iconStyle } icon={ faGithub } />&nbsp;Source
          </a>
        </ul>
      </footer>
    );
  }
}

const footerStyle = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: colours.Accent,
  color: "#FFFFFF",
  marginTop: "auto"
}

const ulStyle = {
  listStyle: "none",
  margin: "0.5rem",
  padding: "0",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  maxWidth: "24rem",
  justifyContent: "center",
  textAlign: "center",
}

const linkStyle = {
  textDecoration: "none",
  color: "#FFFFFF",
  margin: "0.5rem 0.75rem",
  width: "6rem",
  textAlign: "left",

}

const iconStyle = {
  width:"1rem"
}

export default Footer;