import React, { Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppContext from "../../context/app/AppContext";
import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";
import Spinner from "./Spinner";

const Sidebar = () => {
  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);

  const { sidebar, toggleSidebar } = appContext;
  const { settings, user } = userContext;
  const { nickname } = settings;

  const { connected, loading } = web3Context;

  const onClick = e => {
    toggleSidebar();
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
      <button onClick={onClick} className="btn btn-sm btn-dark side-btn mbot">
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </button>
      {sidebar && (
        <Fragment>
          <h2>{nickname && nickname}</h2>
          <div>{connected ? <p>Not Connected</p> : tokens()}</div>
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
