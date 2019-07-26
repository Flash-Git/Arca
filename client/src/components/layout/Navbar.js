import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import AppContext from "../../context/app/AppContext";
import Web3Context from "../../context/web3/Web3Context";

const Navbar = ({ title, icon }) => {
  const web3Context = useContext(Web3Context);
  const appContext = useContext(AppContext);

  const { location } = appContext;
  const { connected, network } = web3Context;

  const networkText = () => {
    if (!connected) {
      return "Not Connected";
    }

    switch (network) {
      case 1:
        return "LIVE";
      case 4:
        return "RINKEBY";
      case 5:
        return "GOERLI";
      default:
        return "UNSUPPORTED";
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
            <strong>
              {location === "home" ? networkText() : "Trade Window"}
            </strong>
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
