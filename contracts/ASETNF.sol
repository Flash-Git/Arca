pragma solidity ^0.5.0;

/*
* @Author Flash
* Source at https://github.com/Flash-Git/Arca/tree/master/contracts
*/

import "./ERC721.sol";

/*
* @Author Flash
* @title Another Standard ERC721 Token -NonFungible
* 
* @dev Implementation of the standard token
* https://eips.ethereum.org/EIPS/eip-721
*/
contract ASETNF is ERC721 {
  string public name = "Another Standard ERC721 Token -NonFungible";
  string public symbol = "ASETNF";

  /*
  * Constructor
  * @dev Mints tokens and gives them to the contract creator.
  * @param _tokenCount The amount of tokens to mint
  */
  constructor(uint8 _tokenCount) public {
    for(uint8 i = 0; i < _tokenCount; i++){
      require(mint(msg.sender, i), "Token minting failed");
    }
  }

  /*
  * @dev Function to mint tokens.
  * @param to The address that will receive the minted tokens
  * @param tokenId The token id to mint
  */
  function mint(address _to, uint256 _tokenId) private returns (bool) {
    _mint(_to, _tokenId);
    return true;
  }

  /* 
  * @dev Removed sender arguments to simplify direct transfers.
  * @param _to address to receive the ownership of the given token ID
  * @param _tokenId uint256 ID of the token to be transferred
  */
  function transferTo(address _to, uint256 _tokenId) public {
    transferFrom(msg.sender, _to, _tokenId);
  }

  /* 
  * @dev Removed sender arguments to simplify safe direct transfers.
  * @param _to address to receive the ownership of the given token ID
  * @param _tokenId uint256 ID of the token to be transferred
  */
  function safeTransferTo(address _to, uint256 _tokenId) public {
    safeTransferFrom(msg.sender, _to, _tokenId);
  }
}