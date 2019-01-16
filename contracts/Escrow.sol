pragma solidity ^0.5.2;
//Preliminary Code - WIP

/*
* Holds onto ether, erc20s and all other ownable assets
*/

contract Escrow {
/*
* TODO
* Logging
* Find out whether it's safe to keep eth on Trade.sol
* Pretty much everything
*/

  address public owner;
  mapping(address => uint256) public ethBalances
  mapping(address => mapping(address => Ownable)) public ownables;
  mapping(address => mapping(address => Balanceable)) public balanceables;

  struct Ownable {
    address contract;
    uint256 id;
    bytes4 getter;
    bytes4 setter;
  }
  
  struct Balanceable {
    address contract;
    bytes4 getter;
    bytes4[2] setter;//allow and transfer(?)
  }

  constructor(address _owner) public {
    owner = _owner;
  }

}