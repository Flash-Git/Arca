import React, { Fragment, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";
import Spinner from "./Spinner";

const Sidebar = () => {
  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);

  const { settings, user } = userContext;
  const { nickname } = settings;

  const { connected, loading } = web3Context;

  const [hidden, setHidden] = useState(true);

  const onClick = e => {
    setHidden(!hidden);
  };

  const tokens = () => (
    <ul>
      <h3>Erc20s</h3>
      {user.ownedTokens.erc20Tokens.length > 0 ? (
        user.ownedTokens.erc20Tokens.map(token => <li>{token.name}</li>)
      ) : loading ? (
        <Spinner />
      ) : (
        "No erc20s found"
      )}
      <h3>Erc721s</h3>
      {user.ownedTokens.erc721Tokens.length > 0 ? (
        user.ownedTokens.erc721Tokens.map(token => <li>{token.name}</li>)
      ) : loading ? (
        <Spinner />
      ) : (
        "No erc721s found"
      )}
    </ul>
  );

  return (
    <div className="sidebar">
      <button onClick={onClick} className="btn-sm btn-dark side-btn mbot">
        <FontAwesomeIcon icon={["fas", "bars"]} />
        {/* {hidden ? "Hide" : "Show"} */}
      </button>
      {hidden && (
        <Fragment>
          <h2>{nickname && nickname}</h2>
          <div>{connected ? <p>Not Connected</p> : tokens()}</div>
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
