pragma solidity ^0.5.10;

/*
* @Author Flash
* Source at https://github.com/Flash-Git/Arca/tree/master/contracts
*/

/*
* @Author Flash
* @title Utils v1
*
* @dev Utility contract
*/

contract Utils {
  //@dev get the ENS erc721 ID
  function namehashToID(bytes32 _namehash) view returns(uint32) {
    return uint32(_namehash);
  }
}