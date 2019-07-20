import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";

import UserContext from "../../context/user/UserContext";

const Navbar = ({ title, icon }) => {
  const userContext = useContext(UserContext);

  const { connected, network } = userContext.web3;

  const networkText = () => {
    switch (network) {
      case 1:
        return <strong>LIVE</strong>;
      case 4:
        return <strong>RINKEBY</strong>;
      case 5:
        return <strong>GOERLI</strong>;
      default:
        return <strong>UNSUPPORTED</strong>;
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
          <Link to="/">{!connected ? "Not Connected" : networkText}</Link>
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
