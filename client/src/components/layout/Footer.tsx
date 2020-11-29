import React, { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer: FC = () => (
  <footer className="footer">
    <ul>
      <a href="https://etherscan.io/address/jaquinn.eth">
        <FontAwesomeIcon icon={["fab", "ethereum"]} />
        &nbsp;Donations
      </a>
      <a href="mailto:arca@jaquinn.com">
        <FontAwesomeIcon icon={["fas", "at"]} />
        &nbsp;Inquiries
      </a>
      <a href="https://blockstream.info/address/bc1qvn7u88k5qpq2m7g8mu8swh88v7q59msxa4w6vg">
        <FontAwesomeIcon icon={["fab", "bitcoin"]} />
        &nbsp;Donations
      </a>
      <a href="https://twitter.com/EthArca">
        <FontAwesomeIcon icon={["fab", "twitter"]} />
        &nbsp;Twitter
      </a>
      <a href="https://github.com/Flash-Git/Arca">
        <FontAwesomeIcon icon={["fab", "github"]} />
        &nbsp;Source
      </a>
    </ul>
  </footer>
);

export default Footer;
