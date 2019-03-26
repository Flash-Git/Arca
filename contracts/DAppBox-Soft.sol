pragma solidity ^0.5.5;
//Preliminary Code - WIP

/*
* Handles escrowless ERC20 and ERC721 transfers
*/

contract DAppBoxSoft {
  mapping(address => mapping(address => Box)) public boxes;
  mapping(address => mapping(address => uint256)) public balances;

  struct OfferErc20 {
		address add;
		uint256 amount;
	}

  struct OfferErc721 {
    address add;
    uint256 id;
  }

  struct Box {
    OfferErc20[] offersErc20;
    OfferErc721[] offersErc721;
    uint8 countErc20;
    uint8 countErc721;
    bool satisfied;
    bytes32 funcsHash;//Encoded bytes of partner's box to prevent front running
  }

}