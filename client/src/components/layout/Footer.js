import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer id="section-footer" className="section" style={footerStyle}>
      <ul style={ulStyle}>
        <a style={linkStyle} href="https://etherscan.io/address/jaquinn.eth">
          <FontAwesomeIcon style={iconStyle} icon={["fab", "ethereum"]} />
          &nbsp;Donations
        </a>
        <a style={linkStyle} href="mailto:arca@jaquinn.com">
          <FontAwesomeIcon style={iconStyle} icon={["fa", "at"]} />
          &nbsp;Inquiries
        </a>
        <a
          style={linkStyle}
          href="https://blockstream.info/address/bc1qvn7u88k5qpq2m7g8mu8swh88v7q59msxa4w6vg"
        >
          <FontAwesomeIcon style={iconStyle} icon={["fab", "bitcoin"]} />
          &nbsp;Donations
        </a>
        <a style={linkStyle} href="https://twitter.com/EthArca">
          <FontAwesomeIcon style={iconStyle} icon={["fab", "twitter"]} />
          &nbsp;Twitter
        </a>
        <a style={linkStyle} href="https://github.com/Flash-Git/Arca">
          <FontAwesomeIcon style={iconStyle} icon={["fab", "github"]} />
          &nbsp;Source
        </a>
      </ul>
    </footer>
  );
};

const footerStyle = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  //backgroundColor: ,
  marginTop: "auto"
};

const ulStyle = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  maxWidth: "24rem",
  listStyle: "none",
  padding: "0",
  margin: "0.5rem"
};

const linkStyle = {
  textAlign: "left",
  width: "6rem",
  //color: colours.Primary,
  textDecoration: "none",
  margin: "0.5rem 0.75rem"
};

const iconStyle = {
  width: "1rem"
};

export default Footer;
