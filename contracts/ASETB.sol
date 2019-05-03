pragma solidity ^0.5.0;

/*
* @Author Flash
* Source at https://github.com/Flash-Git/Arca/tree/master/contracts
*/

import "./ERC20.sol";

/*
* @Author Flash
* @title Another Standard ERC20 Token -Balanceable
*
* @dev Implementation of the basic standard token.
* https://eips.ethereum.org/EIPS/eip-20
*/
contract ASETB is ERC20 {
  /*
  * Constructor
  * @dev Gives all tokens to contract creator.
  */
  constructor() public {
    name = "Another Standard ERC Token -Balanceable";
    symbol = "ASETB";
    decimals = 18;
    _totalSupply = 1000000000*10**uint256(decimals);
    _balances[msg.sender] = _totalSupply;
  }
}