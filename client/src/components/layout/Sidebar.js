import React, { useContext } from "react";

import UserContext from "../../context/user/UserContext";
import UserState from "../../context/user/UserState";

const Sidebar = () => {
  const userContext = useContext(UserContext);
  console.log(userContext);
  const { settings, user, web3 } = userContext;
  const { connected } = web3;

  const tokens = () => (
    <ul>
      <h3>Erc20s</h3>
      {user.ownedTokens.erc20Tokens.map(token => (
        <li>{token.name}</li>
      ))}
      <h3>Erc721s</h3>
      {user.ownedTokens.erc721Tokens.map(token => (
        <li>{token.name}</li>
      ))}
    </ul>
  );

  return (
    <div className="sidebar">
      <h2>{settings.nickname && settings.nickname}</h2>
      <div>{connected ? <p>Not Connected</p> : tokens()}</div>
    </div>
  );
};

export default Sidebar;
