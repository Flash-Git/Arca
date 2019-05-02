pragma solidity ^0.5.0;

import "./ERC20.sol";

/*
* @title Free Tokens
*
* @dev Implementation of the basic standard token with ability to request free tokens.
* https://eips.ethereum.org/EIPS/eip-20
*/
contract FreeT is ERC20 {

  /*
  * Constructor
  * @dev Assigns basic erc20 variables
  */

  constructor() public {
    name = "Free Tokens";
    symbol = "FreeT";
    decimals = 18;
  }
  

  /*
  * Calling this function gives the sender 5 FreeT tokens
  */

  function requestTokens() public {
    requestTokens(msg.sender);
  }


  /*
  * Calling this function gives the specified address 5 FreeT tokens
  */

  function requestTokens(address _add) public {
    _mint(_add, 5*10**uint256(decimals));
  }
}