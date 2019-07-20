import React from "react";

import UserContext from "../../context/user/UserContext";

const Sidebar = () => {
  const userContext = useContext(UserContext);

  const { settings, user } = userContext;
  const { connected } = userContext.web3;

  const tokens = () => (
    <ul>
      <h3>Erc20s</h3>
      {user.ownedTokens.erc20Tokens.map(token => (
        <li>{token.name}</li>
      ))}
      <h3>Erc20s</h3>
      {user.ownedTokens.erc20Tokens.map(token => (
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
