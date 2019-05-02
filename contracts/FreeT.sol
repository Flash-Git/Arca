pragma solidity ^0.5.0;

import "./ERC20.sol";

/*
* @title Free Tokens
*
* @dev Implementation of the basic standard token with ability to request free tokens.
* https://eips.ethereum.org/EIPS/eip-20
*/
contract FreeT is ERC20 {
  event Request(address indexed requester, uint256 indexed _value);

  mapping(address => uint) internal _requested;

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
  * Function to check the amount of tokens requested by the sender
  */
  
  function requested() public view returns(uint256) {
    return requested(msg.sender);
  }


  /*
  * Function to check the amount of tokens requested by the specified address
  */

  function requested(address _add) public view returns(uint256) {
    return _requested[_add];
  }


  /*
  * Overloading the ERC20 balanceOf function
  */

  function balanceOf() public view returns(uint256) {
    return balanceOf(msg.sender);
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
    uint256 amount = 5*10**uint256(decimals);

    _mint(_add, amount);
    _requested[_add] += amount;
    emit Request(_add, amount);
  }
}