pragma solidity ^0.5.4;
//Preliminary Code - WIP

contract DAppBox {
/*
* TODO
* Hella Security
* Add gas cost estimator for front end
* Set up handling for ERC20s, ERC721s, ENS...
* Optimisations
* Events
* Sort out data overwriting
* Sort out escrow architecture
* Huge amount of cleanup
*/

  //Web3 DApp will check the status of secure before making transactions
  address public escrow;
  mapping(address => mapping(address => Box)) public boxes;
  mapping(address => uint256) public ethBalances;

  struct Erc20Offer{
		address erc20Ad;
		uint256 amount;
	}

  struct FuncCall {
    address contractAd;
    bytes encodedFunc;
  }

  struct Box {
    int256 ethOffer;//intentionally not a uint
    FuncCall[] funcOffers;
    Erc20Offer[] erc20Offers;
    uint8 count;
    bool satisfied;
    bytes32 funcsHash;//Encoded bytes of partner's box so that you can't front run a call to set satisfied
  }


  /*
  * Constructor
  */

  constructor() public {

  }


  /*
  * Escrow
  */

  function setEscrow(address _escrow) public {
    escrow = _escrow;
  }


  /*
  * Box Getters
  */

  function getFuncCall(address _add, address _tradePartner, uint8 _index) public view returns (address, bytes memory) {
    return (boxes[_add][_tradePartner].funcOffers[_index].contractAd, boxes[_add][_tradePartner].funcOffers[_index].encodedFunc);
  }
  
  function getEthOffer(address _add, address _tradePartner) public view returns (int256) {
    return boxes[_add][_tradePartner].ethOffer; 
  }
  
  function getCount(address _add, address _tradePartner) public view returns (uint8) {
    return boxes[_add][_tradePartner].count; 
  }

  function getSatisfied(address _add, address _tradePartner) public view returns (bool) {
    return boxes[_add][_tradePartner].satisfied; 
  }

  function getFuncsHash(address _add, address _tradePartner) public view returns (bytes32) {
    return boxes[_add][_tradePartner].funcsHash; 
  }


  /*
  * Box State Change
  */

  function pushOffer(address _tradePartner, int256 _ethOffer, address _contract, bytes memory _encodedFunction) public payable {
    pushEthOffer(_tradePartner, _ethOffer);
    pushFuncOffer(_tradePartner, _contract, _encodedFunction);
  }

  function pushEthOffer(address _tradePartner, int256 _ethOffer) public payable {
    ethBalances[msg.sender] += msg.value;
    require(int256(ethBalances[msg.sender]) >= _ethOffer, "Insufficient eth balance");
    boxes[msg.sender][_tradePartner].ethOffer += _ethOffer;
    
    dropSatisfaction(msg.sender, _tradePartner);
    //log updated offer
  }

  //TODO add reversal
  function pushFuncOffer(address _tradePartner, address _contract, bytes memory _encodedFunction) public {
    require(_contract != address(this) && _contract != escrow, "no");
    FuncCall memory call;
    call.encodedFunc = _encodedFunction;
    call.contractAd = _contract;
    boxes[msg.sender][_tradePartner].funcOffers.push(call);
    boxes[msg.sender][_tradePartner].count += 1;

    dropSatisfaction(msg.sender, _tradePartner);
    //log updated offer
  }

  function setCount(address _tradePartner, uint8 _count) public {
    boxes[msg.sender][_tradePartner].count = _count;
  }

  function setSatisfied(address _tradePartner, bytes32 _funcsHash) public {
    require(address(msg.sender) != address(_tradePartner), "Can't be satisfied with yourself");
    require(boxes[msg.sender][_tradePartner].satisfied != true, "Already Satisfied");
    boxes[msg.sender][_tradePartner].funcsHash = _funcsHash;
    boxes[msg.sender][_tradePartner].satisfied = true;
  }

  function setUnsatisfied(address _tradePartner) public {
    require(address(msg.sender) != address(_tradePartner), "Can't be satisfied with yourself");
    require(boxes[msg.sender][_tradePartner].satisfied != false, "Already Unsatisfied");
    boxes[msg.sender][_tradePartner].satisfied = false;
  }

  function dropSatisfaction(address _add1, address _add2) private {
    boxes[_add1][_add2].satisfied = false;
    boxes[_add2][_add1].satisfied = false;
  }

  function clearBox(address _tradePartner) public {//TODO test that this works as expected
    delete boxes[msg.sender][_tradePartner];
  }

	function pushDirectErc20TransferOffer(address _tradePartner, address _erc20Address, uint256 _amount) public {
		require(_erc20Address.allowance(msg.sender, _tradePartner) => _amount);
		Erc20Offer memory offer;
    offer.erc20Address = _erc20Address;
    offer.amount = _amount;
    boxes[msg.sender][_tradePartner].erc20Offers.push(offer);
    boxes[msg.sender][_tradePartner].erc20OfferCount += 1;

    dropSatisfaction(msg.sender, _tradePartner);
	}

	function directERC20Transfer(address _tradePartner, address _erc20Address, uint256 _amount) public {
		(success) = _erc20Address.transferFrom(msg.sender, _tradePartner, _amount); //Attack vector: Unvetted External Function
		require(success, "Failed to tranfer tokens");
	}


  /*
  * Trade Execution
  */

  //TODO Make payable for last sec eth update
  function executeTrade(address _tradePartner) public {
    require(boxes[msg.sender][_tradePartner].satisfied == true, "Sender not satisfied");
    require(boxes[_tradePartner][msg.sender].satisfied == true, "Trade partner not satisfied");

    require(checkHashes(_tradePartner), "Sender hashes failed to match");
    require(updateBalances(_tradePartner), "Trade partner hashes failed to match");

    executeFunctionCalls(msg.sender, _tradePartner);
    executeFunctionCalls(_tradePartner, msg.sender);

    dropSatisfaction(msg.sender, _tradePartner);
  }

  function combineFuncs(bytes memory _bitty1, bytes memory _bitty2, uint8 _count, address _add1, address _add2) public view returns (bytes memory) {
    bytes memory combined = abi.encodePacked(_bitty1, _bitty2);
    _count--;
    if(_count > 0){
      combineFuncs(combined, boxes[_add2][_add1].funcOffers[_count].encodedFunc, _count, _add1, _add2);
    }else{
      return combined;
    }
  }

  function checkHashes(address _tradePartner) public view returns (bool) {
    //Only one of these is technically necessary to prevent front running
    bytes32 funcHashes1 = boxes[msg.sender][_tradePartner].funcsHash;
    bytes32 funcHashes2 = boxes[_tradePartner][msg.sender].funcsHash;

    //Option 1
    uint8 count1 = boxes[_tradePartner][msg.sender].count;
    bytes memory combinedFunc1 = combineFuncs(boxes[_tradePartner][msg.sender].funcOffers[count1-1].encodedFunc, boxes[_tradePartner][msg.sender].funcOffers[count1-2].encodedFunc, count1-2, msg.sender, _tradePartner);
    //TODO add address into combo
    require(keccak256(combinedFunc1) == funcHashes1, "Hash mismatch");

    uint8 count2 = boxes[msg.sender][_tradePartner].count;
    bytes memory combinedFunc2 = combineFuncs(boxes[msg.sender][_tradePartner].funcOffers[count2-1].encodedFunc, boxes[msg.sender][_tradePartner].funcOffers[count2-2].encodedFunc, count2-2, _tradePartner, msg.sender);
    //TODO add address into combo
    
    require(keccak256(combinedFunc2) == funcHashes2, "Hash mismatch");

    return true;
      //Option2
//    bytes32[] memory funcArr1 = new bytes32[](boxes[msg.sender][_tradePartner].count);
//    for(uint8 i = 0; i < boxes[msg.sender][_tradePartner].count; i++){
//      funcArr1[i] = keccak256(abi.encodePacked(boxes[msg.sender][_tradePartner].funcOffers[i].encodedFunc));
//    }
//    require(keccak256(abi.encodePacked(funcArr)) == funcHashes1, "Sender calls don't match");

//    bytes32[] memory funcArr1 = new bytes32[](boxes[_tradePartner][msg.sender].count);
//    for(uint8 i = 0; i < boxes[_tradePartner][msg.sender].count; i++){
//      funcArr1[i] = keccak256(abi.encodePacked(boxes[_tradePartner][msg.sender].funcOffers[i].encodedFunc));
//    }
//    require(keccak256(abi.encodePacked(funcArr)) == funcHashes2, "Partner calls don't match");
  }

  function updateBalances(address _tradePartner) private returns (bool) {
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
    
    return true;
  }

  function executeFunctionCalls(address _add1, address _add2) private {
    FuncCall[] memory calls = boxes[_add1][_add2].funcOffers;
    for(uint8 i = 0; i < boxes[_add1][_add2].count; i++){
      address contractAd = calls[i].contractAd;
      bytes memory encodedFunc = calls[i].encodedFunc;

      (bool success, bytes memory data) = contractAd.call(encodedFunc);
      require(success == true, "Function call failed");
    }
  }


  /*
  * Withdrawal
  */

  function withdraw(uint256 _amt) public {
    if(_amt > ethBalances[msg.sender]){
      _amt = ethBalances[msg.sender];
    }
    msg.sender.transfer(_amt);
    ethBalances[msg.sender] -= _amt;
  }
}


/*

  //bool public secure;
  //mapping(address => bool) public trustedAddresses;
  //Web3 DApp will list this number that anyone can increment
  // uint256 public insecurityCount;
  // mapping(address => bool) public markedInsecure;

  constructor(){
    //secure = true;
    //trustedAddresses[msg.sender] = true;
  }


  function setTrustedAddress(address _trustedAddress) public {
    require(trustedAddresses[msg.sender] == true, "Untrusted address");
    trustedAddresses[_trustedAddress] = true;
  }

  function removeTrust() public {
    require(trustedAddresses[msg.sender] == true, "Untrusted address");
    trustedAddresses[msg.sender] = false;
  }

  function setSecure(bool _secure) public {
    require(trustedAddresses[msg.sender] == true, "Untrusted address");
    secure = _secure;
  }

  function markSecurity(bool _secure) public {
    require(markedInsecure[msg.sender] == !_secure, "Already marked");
    markedInsecure[msg.sender] = _secure;
    if(_secure == true){
      insecurityCount += 1;
    } else {
      insecurityCount -= 1;
    }
  }


}


*/