pragma solidity ^0.5.7;
//Preliminary Code - WIP

/*
* Allows for the trade of multiple asset types
* Handles escrowless ERC20 and ERC721 transfers
*/

interface Erc20 {
  function transfer(address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
  
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

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
    bytes32 boxHash;//Encoded bytes of partner's box to prevent front running
  }

  function setCountErc20(address _tradePartner, uint8 _count) public {
    boxes[msg.sender][_tradePartner].countErc20 = _count;
  }

  function setCountErc721(address _tradePartner, uint8 _count) public {
    boxes[msg.sender][_tradePartner].countErc721 = _count;
  }

  function acceptTrade(address _tradePartner, bytes32 _boxHash) public {
    boxes[msg.sender][_tradePartner].satisfied = true;
    boxes[msg.sender][_tradePartner].boxHash = _boxHash;
  }

  function unacceptTrade(address _tradePartner) public {
    boxes[msg.sender][_tradePartner].satisfied = false;
  }

  function acceptAndExecuteTrade(address _tradePartner, bytes32 _boxHash) public {
    acceptTrade(_tradePartner, _boxHash);
    executeTrade(_tradePartner);
  }

  function executeTrade(address _tradePartner) public {
    //Check Satisfaction
    require(boxes[msg.sender][_tradePartner].satisfied == true, "Sender not satisfied");
    require(boxes[_tradePartner][msg.sender].satisfied == true, "Trade partner not satisfied");

    //Check hashes
    require(checkHashes(msg.sender, _tradePartner), "Sender hashes failed to match partner's box");
    require(checkHashes(_tradePartner, msg.sender), "Partner hashes failed to match sender's box");

    //Execute Erc20 Transfers
    executeTransfersErc20(msg.sender, _tradePartner);
    executeTransfersErc20(_tradePartner, msg.sender);

    //Execute Erc721 Transfers
    executeTransfersErc721(msg.sender, _tradePartner);
    executeTransfersErc721(_tradePartner, msg.sender);

    //Drop Satisfaction
    boxes[_add1][_add2].satisfied = false;
    boxes[_add2][_add1].satisfied = false;
  }

  function pushOfferErc20(address _tradePartner, address _erc20Address, uint256 _amount) public {
    tokenContract = Erc20(_erc20Address);
    require(tokenContract.allowance(msg.sender, _tradePartner) => _amount);
		OfferErc20 memory offer;
    offer.add = _erc20Address;
    offer.amount = _amount;
    boxes[msg.sender][_tradePartner].offersErc20.push(offer);
    boxes[msg.sender][_tradePartner].countErc20 += 1;

    dropSatisfaction(msg.sender, _tradePartner);
  }

  function directERC20Transfer(address _tradePartner, address _erc20Address, uint256 _amount) public {
    tokenContract = Erc20(_erc20Address);
    (success) = tokenContract.transferFrom(msg.sender, _tradePartner, _amount); //Attack vector: Unvetted External Function
    require(success, "Failed to tranfer tokens");
  }

}