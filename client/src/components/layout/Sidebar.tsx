import { FC, Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppContext from "../../context/app/AppContext";
import UserContext from "../../context/user/UserContext";
import Web3Context from "../../context/web3/Web3Context";
import Spinner from "./Spinner";

import {
  AppContext as IAppContext,
  UserContext as IUserContext,
  Web3Context as IWeb3Context
} from "context";

const Sidebar: FC = () => {
  //TODO add search
  const appContext: IAppContext = useContext(AppContext);
  const userContext: IUserContext = useContext(UserContext);

  const { sidebar, toggleSidebar } = appContext;

  const onClick = () => {
    toggleSidebar();
  };

  const tokens = () => (
    <ul>
      <h3>Erc20s</h3>
      {/* {user.ownedTokens.erc20Tokens.length > 0 ? (
        user.ownedTokens.erc20Tokens.map(token => <li>{token.name}</li>)
      ) : loading ? (
        <Spinner />
      ) : (
        "No erc20s found"
      )} */}
      <h3>Erc721s</h3>
      {/* {user.ownedTokens.erc721Tokens.length > 0 ? (
        user.ownedTokens.erc721Tokens.map(token => <li>{token.name}</li>)
      ) : loading ? (
        <Spinner />
      ) : (
        "No erc721s found"
      )} */}
    </ul>
  );

  return (
    <div className="sidebar">
      <button onClick={onClick} className="btn btn-sm btn-dark side-btn mbot">
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </button>
      {sidebar && (
        <Fragment>
          {/* <h2>{nickname && nickname}</h2>
          <div>{web3 !== null ? tokens() : <span>Not Connected</span>}</div> */}
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
