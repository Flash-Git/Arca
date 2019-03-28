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
    uint256 nonce;
    uint256 partnerNonce;
  }

  function acceptTrade(address _tradePartner, uint256 _partnerNonce) public {
    boxes[msg.sender][_tradePartner].partnerNonce = _partnerNonce+1; //Offset serves to avoid explicit "satisfied" variable
  }

  function unacceptTrade(address _tradePartner) public {
    boxes[msg.sender][_tradePartner].partnerNonce = 0;
  }

  function acceptAndExecuteTrade(address _tradePartner, uint256 _partnerNonce) public {
    acceptTrade(_tradePartner, _partnerNonce);
    executeTrade(_tradePartner);
  }

  function executeTrade(address _tradePartner) public {
    //Reference
    Box memory senderBox = boxes[msg.sender][_tradePartner];
    Box memory prtnerBox = boxes[_tradePartner][msg.sender];

    //Check Nonces
    require(senderBox.nonce+1 == prtnerBox.partnerNonce, "Sender not satisfied");
    require(prtnerBox.nonce+1 == senderBox.partnerNonce, "Trade partner not satisfied");

    //Execute Erc20 Transfers
    executeTransfersErc20(msg.sender, _tradePartner);
    executeTransfersErc20(_tradePartner, msg.sender);

    //Execute Erc721 Transfers
    executeTransfersErc721(msg.sender, _tradePartner);
    executeTransfersErc721(_tradePartner, msg.sender);

    //Drop Satisfaction
    senderBox.partnerNonce = 0;
    prtnerBox.partnerNonce = 0;
  }


  /*
  * EXECUTION
  */

  function directERC20Transfer(address _tradePartner, address _erc20Address, uint256 _amount) public {
    bool success = Erc20(_erc20Address).transferFrom(msg.sender, _tradePartner, _amount); //Attack vector: Unvetted External Function
    require(success, "Failed to tranfer tokens");
  }


  /*
  * BOX FUNCTIONS
  */

  function pushOfferErc20(address _tradePartner, address _erc20Address, uint256 _amount) public {
		require(Erc20(_erc20Address).allowance(msg.sender, _tradePartner) >= _amount, "Insufficient allowance");
    OfferErc20 memory offer;
    offer.add = _erc20Address;
    offer.amount = _amount;
    boxes[msg.sender][_tradePartner].offersErc20.push(offer);
    boxes[msg.sender][_tradePartner].countErc20 += 1;

    boxes[msg.sender][_tradePartner].nonce++;
  }

  function setCountErc20(address _tradePartner, uint8 _count) public {
    boxes[msg.sender][_tradePartner].countErc20 = _count;

    boxes[msg.sender][_tradePartner].nonce++;
  }

  function setCountErc721(address _tradePartner, uint8 _count) public {
    boxes[msg.sender][_tradePartner].countErc721 = _count;

    boxes[msg.sender][_tradePartner].nonce++;
  }

}