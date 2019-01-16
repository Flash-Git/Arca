pragma solidity ^0.5.2;
//Preliminary Code - WIP

contract Trade {
/*
* TODO
* Hella Security
* Add gas cost estimator for front end
* Front end support for ENS
* Test ERC20s, ERC721s, ENS... transfers
* Optimisations
* Events
* Sort out data overwriting
* Sort out escrow architecture
*/

  address public escrow;
  mapping(address => mapping(address => Box)) public boxes;
  mapping(address => uint256) public ethBalances;

  struct FuncCall {
    bytes encodedFunc;
    bytes reverseFunc;
    address contractAd;
  }

  struct Box {
    int256 ethOffer;//intentionally not a uint
    FuncCall[] funcOffers;
    bool satisfied;//Could add a hash of both boxes so that race conditions don't come into play
  }

  constructor(address _escrow) public {
    escrow = _escrow;
  }

  function clearBox(address _tradePartner) public {//TODO test that this works as expected
    delete boxes[msg.sender][_tradePartner];
  }

  //Could add a hash of both boxes so that race conditions don't come into play
  function setSatisfied(address _tradePartner, bool _satisfied) public {
    require(address(msg.sender) != address(_tradePartner), "Can't be satisfied with yourself");
    boxes[msg.sender][_tradePartner].satisfied = _satisfied;
  }

  function pushOffer(address _tradePartner, int256 _ethOffer, address _contract, bytes memory _encodedFunction) public payable {
    pushEthOffer(_tradePartner, _ethOffer);
    pushFuncOffer(_tradePartner, _contract, _encodedFunction);
  }

  function pushEthOffer(address _tradePartner, int256 _ethOffer) public payable {
    ethBalances[msg.sender] += msg.value;
    require(int256(ethBalances[msg.sender]) >= _ethOffer, "Insufficient eth balance");
    boxes[msg.sender][_tradePartner].ethOffer += _ethOffer;
    
    boxes[msg.sender][_tradePartner].satisfied = false;
    boxes[_tradePartner][msg.sender].satisfied = false;
    //log updated offer
  }

  //TODO add reversal
  function pushFuncOffer(address _tradePartner, address _contract, bytes memory _encodedFunction) public {
    require(_contract != address(this) && _contract != escrow, "no");
    FuncCall memory call;
    call.encodedFunc = _encodedFunction;
    call.contractAd = _contract;
    boxes[msg.sender][_tradePartner].funcOffers.push(call);
    
    boxes[msg.sender][_tradePartner].satisfied = false;
    boxes[_tradePartner][msg.sender].satisfied = false;
  }

  function executeTrade(address _tradePartner) public payable {
    require(boxes[msg.sender][_tradePartner].satisfied == true, "Sender not satisfied");
    require(boxes[_tradePartner][msg.sender].satisfied == true, "Trade partner not satisfed");
    ethBalances[msg.sender] += msg.value;
    int256 senderBalance = int256(ethBalances[msg.sender]);
    int256 partnerBalance = int256(ethBalances[_tradePartner]);

    int256 senderOffer = boxes[msg.sender][_tradePartner].ethOffer;
    int256 partnerOffer = boxes[_tradePartner][msg.sender].ethOffer;

    int256 newSenderBalance = senderBalance - (senderOffer-partnerOffer);
    int256 newPartnerBalance = partnerBalance - (partnerOffer-senderOffer);

    //TODO over/underflow checks
    require(newSenderBalance >= 0 && newPartnerBalance >= 0, "Insufficient balance");        
    ethBalances[msg.sender] = uint256(newSenderBalance);
    ethBalances[_tradePartner] = uint256(newPartnerBalance);

    executeFunctionCalls(msg.sender, _tradePartner);
    //event Calls sent
    executeFunctionCalls(_tradePartner, msg.sender);
    //event Calls sent

    boxes[msg.sender][_tradePartner].satisfied = false;
    boxes[_tradePartner][msg.sender].satisfied = false;
  }

  function executeFunctionCalls(address _add1, address _add2) private {
    FuncCall[] memory calls = boxes[_add1][_add2].funcOffers;
    for(uint8 i = 0; i < calls.length; i++){
      address contractAd = calls[i].contractAd;
      bytes memory encodedFunc = calls[i].encodedFunc;

      (bool success, bytes memory data) = contractAd.call(encodedFunc);
      require(success == true, "Function call failed");
    }
  }

  function withdraw(uint256 _amt) public {
    if(_amt > ethBalances[msg.sender]){
      _amt = ethBalances[msg.sender];
    }
    msg.sender.transfer(_amt);
    ethBalances[msg.sender] -= _amt;
  }
}