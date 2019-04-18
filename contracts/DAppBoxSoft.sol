pragma solidity ^0.5.0;
//Preliminary Code - WIP

/*
* Allows for the trade of multiple asset types
* Handles escrowless ERC20 and ERC721 transfers
*/

interface Erc20 {
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function balanceOf(address who) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface Erc721 {
  function ownerOf(uint256 tokenId) external view returns (address owner);
  function isApprovedForAll(address owner, address operator) external view returns (bool);
  function safeTransferFrom(address from, address to, uint256 tokenId) external;
}

contract DAppBoxSoft {
  event TradeAccepted(address indexed sender, address indexed partner, uint256 indexed partnerNonce);
  event TradeUnaccepted(address indexed sender, address indexed partner);
  event TradeExecuted(address indexed sender, address indexed partner);
  event OfferModifiedERC20(address indexed sender, address indexed partner,
    address contractAdd, uint256 amount, uint8 indexed index, uint256 nonce);
  event OfferModifiedERC721(address indexed sender, address indexed partner,
    address contractAdd, uint256 id, uint8 indexed index, uint256 nonce);
  event OfferRemovedERC20(address indexed sender, address indexed partner, uint8 indexed index, uint256 nonce);
  event OfferRemovedERC721(address indexed sender, address indexed partner, uint8 indexed index, uint256 nonce);
  event BoxCountModifiedERC20(address indexed sender, address indexed partner, uint8 indexed count, uint256 nonce);
  event BoxCountModifiedERC721(address indexed sender, address indexed partner, uint8 indexed count, uint256 nonce);

  mapping(address => mapping(address => Box)) private boxes;

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


  /*
  * GETTERS
  */

  function getOfferErc20(address _add1, address _add2, uint8 _index) public view returns(address, uint256) {
    return (boxes[_add1][_add2].offersErc20[_index].add, boxes[_add1][_add2].offersErc20[_index].amount);
  }
  
  function getOfferErc721(address _add1, address _add2, uint8 _index) public view returns(address, uint256) {
    return (boxes[_add1][_add2].offersErc721[_index].add, boxes[_add1][_add2].offersErc721[_index].id);
  }

  function getErc20Count(address _add1, address _add2) public view returns(uint8) {
    return boxes[_add1][_add2].countErc20;
  }

  function getErc721Count(address _add1, address _add2) public view returns(uint8) {
    return boxes[_add1][_add2].countErc721;
  }

  function getNonce(address _add1, address _add2) public view returns(uint256) {
    return boxes[_add1][_add2].nonce;
  }

  function getPartnerNonce(address _add1, address _add2) public view returns(uint256) {
    return boxes[_add1][_add2].partnerNonce;
  }


  /*
  * TRADE ACTIONS
  */

  function acceptTrade(address _tradePartner, uint256 _partnerNonce) public {
    boxes[msg.sender][_tradePartner].partnerNonce = _partnerNonce+1; //Offset serves to avoid explicit "satisfied" variable
    emit TradeAccepted(msg.sender, _tradePartner, _partnerNonce+1);
  }

  function unacceptTrade(address _tradePartner) public {
    boxes[msg.sender][_tradePartner].partnerNonce = 0;
    emit TradeUnaccepted(msg.sender, _tradePartner);
  }

  function acceptAndExecuteTrade(address _tradePartner, uint256 _partnerNonce) public {
    acceptTrade(_tradePartner, _partnerNonce);
    executeTrade(_tradePartner);
  }

  function executeTrade(address _tradePartner) public {
    //Reference
    Box storage senderBox = boxes[msg.sender][_tradePartner];
    Box storage prtnerBox = boxes[_tradePartner][msg.sender];

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

    //Wipe (Not Necessary)
    senderBox.countErc20 = 0;
    prtnerBox.countErc20 = 0;
    senderBox.countErc721 = 0;
    prtnerBox.countErc721 = 0;

    emit TradeExecuted(msg.sender, _tradePartner);
  }


  /*
  * BOX FUNCTIONS
  */

  function pushOfferErc20(address _tradePartner, address _erc20Address, uint256 _amount) public {
    addOfferErc20(_tradePartner, _erc20Address, _amount, boxes[msg.sender][_tradePartner].countErc20);
  }

  function addOfferErc20(address _tradePartner, address _erc20Address, uint256 _amount, uint8 _index) public {
    require(Erc20(_erc20Address).allowance(msg.sender, address(this)) >= _amount, "Insufficient allowance");

    OfferErc20 memory offer;
    offer.add = _erc20Address;
    offer.amount = _amount;

    Box storage box = boxes[msg.sender][_tradePartner];
    if(box.offersErc20.length > _index){
      box.offersErc20[_index] = offer;
    }else{
      box.offersErc20.push(offer);
      box.countErc20++;
    }

    box.nonce++;
    emit OfferModifiedERC20(msg.sender, _tradePartner, _erc20Address, _amount, _index, box.nonce);
  }
  
  function pushOfferErc721(address _tradePartner, address _erc721Address, uint256 _id) public {
    addOfferErc721(_tradePartner, _erc721Address, _id, boxes[msg.sender][_tradePartner].countErc721);
  }
  
  function addOfferErc721(address _tradePartner, address _erc721Address, uint256 _id, uint8 _index) public {
    require(Erc721(_erc721Address).ownerOf(_id) == msg.sender, "Sender isn't owner of this erc721 token");
    require(Erc721(_erc721Address).isApprovedForAll(msg.sender, address(this)) == true, "Contract not approved for erc721 token transfers");

    OfferErc721 memory offer;
    offer.add = _erc721Address;
    offer.id = _id;

    Box storage box = boxes[msg.sender][_tradePartner];
    if(box.offersErc721.length > _index){
      box.offersErc721[_index] = offer;
    }else{
      box.offersErc721.push(offer);
      box.countErc721++;
    }

    box.nonce++;
    emit OfferModifiedERC721(msg.sender, _tradePartner, _erc721Address, _id, _index, box.nonce);
  }

  function removeOfferErc20(address _tradePartner, uint8 _index) public {
    Box storage box = boxes[msg.sender][_tradePartner];
    box.offersErc20[_index].add = address(0);

    box.nonce++;
    emit OfferRemovedERC20(msg.sender, _tradePartner, _index, box.nonce);
  }

  function removeOfferErc721(address _tradePartner, uint8 _index) public {
    Box storage box = boxes[msg.sender][_tradePartner];
    box.offersErc721[_index].add = address(0);

    box.nonce++;
    emit OfferRemovedERC721(msg.sender, _tradePartner, _index, box.nonce);
  }

  //Set to 0 to clear
  function setCountErc20(address _tradePartner, uint8 _count) public {
    Box storage box = boxes[msg.sender][_tradePartner];
    box.countErc20 = _count;

    box.nonce++;
    emit BoxCountModifiedERC20(msg.sender, _tradePartner, _count, box.nonce);
  }

  //Set to 0 to clear
  function setCountErc721(address _tradePartner, uint8 _count) public {
    Box storage box = boxes[msg.sender][_tradePartner];
    box.countErc721 = _count;

    box.nonce++;
    emit BoxCountModifiedERC721(msg.sender, _tradePartner, _count, box.nonce);
  }


  /*
  * EXECUTION
  */

  function executeTransfersErc20(address _add1, address _add2) private {
    Box storage box = boxes[_add1][_add2];

    OfferErc20[] memory offers = box.offersErc20;
    for(uint8 i = 0; i < box.countErc20; i++){
      if(box.offersErc20[i].add != address(0)){
        directErc20Transfer(_add1, _add2, offers[i].add, offers[i].amount);
      }
    }
  }
  
  function executeTransfersErc721(address _add1, address _add2) private {
    Box storage box = boxes[_add1][_add2];

    OfferErc721[] memory offers = box.offersErc721;
    for(uint8 i = 0; i < box.countErc721; i++){
      if(box.offersErc721[i].add != address(0)){
        directErc721Transfer(_add1, _add2, offers[i].add, offers[i].id);
      }
    }
  }

  function directErc20Transfer(address _add1, address _add2, address _erc20Address, uint256 _amount) private {
    bool success = Erc20(_erc20Address).transferFrom(_add1, _add2, _amount);
    require(success, "Failed to transfer erc20 tokens");
  }

  function directErc721Transfer(address _add1, address _add2, address _erc721Address, uint256 _id) private {
    Erc721(_erc721Address).safeTransferFrom(_add1, _add2, _id); //Erc 721 transfers don't require a return?
    require(Erc721(_erc721Address).ownerOf(_id) == _add2, "Failed to transfer erc721 token");
  }

}