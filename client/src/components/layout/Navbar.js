import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";

const Navbar = ({ title, icon }) => {
  const connected = true;
  const network = 1;

  const networkText = () => {
    switch (network) {
      case 1:
        return "Network: LIVE";
      case 4:
        return "Network: RINKEBY";
      case 5:
        return "Network: GOERLI";
      default:
        return "Network: UNSUPPORTED";
    }
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <FontAwesomeIcon icon={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">
            {!connected ? "Not Connected" : networkText(network)}
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "A R C A",
  icon: ["fas", "box-open"]
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.array.isRequired
};

export default Navbar;
