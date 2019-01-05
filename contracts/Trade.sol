pragma solidity ^0.5.2;
//Preliminary Code - WIP

contract Trade {
    mapping(address => address) public trades;
    mapping(address => TradeWindow) public tradeWindows;
    mapping(address => uint256) public ethBalances;

    struct FuncCall {
        bytes encodedFunc;
        address contractAd;
    }

    struct TradeWindow {
        int256 ethOffer;//intentionally not a uint
        FuncCall[] funcOffers;
        bool satisfied;
    }
    
//                arg = bytesToAddress(bytes(_argument));

    function getEncFunc() public view returns (bytes memory) {
        return tradeWindows[msg.sender].funcOffers[0].encodedFunc;
    }

    function getCAdd() public view returns (address) {
        return tradeWindows[msg.sender].funcOffers[0].contractAd;
    }
    
    function setEncFunc(string memory _encodedFunc) public {
        tradeWindows[msg.sender].funcOffers[0].encodedFunc = bytes(_encodedFunc);
    }

/*    function getEncBytes(string memory _function, string memory _arg) public pure returns (bytes memory) {
        return abi.encodePacked(bytesToBytes4(bytes(_function), 0), bytes(_arg));
    }*/
   
    function testbEncode(string memory _arg) public pure returns (address addr) {
        addr = bytesToAddressTwo(bytes(_arg));
    }

    
    function openTrade(address _tradePartner) public {
        require(trades[msg.sender]==address(0) && trades[_tradePartner]==address(0));
        trades[msg.sender] = _tradePartner;
        trades[_tradePartner] = msg.sender;
    }

    function closeTrade() public {//Does not wipe trade window
        tradeWindows[trades[msg.sender]].satisfied = false;
        tradeWindows[msg.sender].satisfied = false;
        trades[trades[msg.sender]] = address(0);
        trades[msg.sender] = address(0);
    }

    function pushOffer(int256 _ethOffer, address _contract, string memory _function, string memory _args, uint8[] memory _argIndex) public payable {
        pushEthOffer(_ethOffer);
        pushFuncOffer(_contract, _function, _args, _argIndex);
    }

    function pushEthOffer(int256 _ethOffer) public payable {
        ethBalances[msg.sender] += msg.value;
        require(int(ethBalances[msg.sender]) >= _ethOffer, "Invalid eth balance");
        tradeWindows[msg.sender].ethOffer += _ethOffer;
        
        tradeWindows[trades[msg.sender]].satisfied = false;
        tradeWindows[msg.sender].satisfied = false;
        //log updated offer
    }

    /*
    * ARGINDEX
    * 1 - bytes32
    * 2 - uint256
    * 3 - int256
    * 4 - bool
    * 5 - address
    * 
    */
    
    function bytesToBytes4(bytes memory b, uint offset) public pure returns (bytes4) {
      bytes4 out;
    
      for (uint i = 0; i < 4; i++) {
        out |= bytes4(b[offset + i] & 0xFF) >> (i * 8);
      }
      return out;
    }

    function pushFuncOffer(address _contract, string memory _function, string memory _args, uint8[] memory _argIndex) public {
        require(_contract != address(this), "no");
        
        bytes4 funcName =  bytesToBytes4(bytes(_function), 0);
        encodeFunctionCall(_contract, funcName, _args, _argIndex[0]);
        
        tradeWindows[trades[msg.sender]].satisfied = false;
        tradeWindows[msg.sender].satisfied = false;
    }
  
    function getBytes4(string memory _data) public pure returns (bytes4 funcHash) {
        funcHash = bytes4(keccak256(bytes(_data)));//"setSquish(uint256)"
    }
    
    /*The size must now be adjusted within the type before the conversion.
    For example, you can convert a bytes4 (4 bytes) to a uint64 (8 bytes)
    by first converting the bytes4 variable to bytes8 and then to uint64.
    You get the opposite padding when converting through uint32.*/

    /*function bytesToAddr (bytes b) constant returns (address) {
        uint result = 0;
        for (uint i = b.length-1; i+1 > 0; i--) {
            uint c = uint(b[i]);
            uint to_inc = c * ( 16 ** ((b.length - i-1) * 2));
            result += to_inc;
        }
        return address(result);
    }*/
    
    //outputs 0
    function bytesToAddress(bytes memory b) public pure returns (address) {
        uint result = 0;
        for (uint i = b.length-1; i+1 > 0; i--) {
            uint256 c = uint256(bytes32(b[i]));
            uint to_inc = c * ( 16 ** ((b.length - i-1) * 2));
            result += to_inc;
        }
        return address(result);
    }
    
    function bytesToAddressTwo(bytes memory b) public pure returns (address) {
        uint result = 0;
        for (uint i = b.length-1; i+1 > 0; i--) {
            uint256 c = uint256(uint8(bytes1(b[i])));
            uint to_inc = c * ( 16 ** ((b.length - i-1) * 2));
            result += to_inc;
        }
        return address(result);
    }

    //TODO Remove funcOffer
    //function 

    function encodeFunctionCall(address _contract, bytes4 _function, string memory _argument, uint8 _argIndex) private {
        FuncCall memory fCall;
        fCall.contractAd = _contract;
        
        address arg;
        //array
        if(_argIndex==5){
            arg = bytesToAddress(bytes(_argument));
        }else{
            revert();
        }
        
        fCall.encodedFunc = abi.encodePacked(_function, arg);
        tradeWindows[msg.sender].funcOffers.push(fCall);
        //log updated offer
    }

    function clearTradeWindow() public {//TODO test that this works as expected
        tradeWindows[msg.sender] = tradeWindows[address(0)];
        
        tradeWindows[trades[msg.sender]].satisfied = false;
        tradeWindows[msg.sender].satisfied = false;
    }

    function setSatisfied(bool _satisfied) public {
        tradeWindows[msg.sender].satisfied = _satisfied;
    }

    function executeTrade() public {
        require(tradeWindows[msg.sender].satisfied == true && tradeWindows[trades[msg.sender]].satisfied == true, "Both parties are not satisfied");
        int256 senderBalance = int256(ethBalances[msg.sender]);
        int256 partnerBalance = int256(ethBalances[trades[msg.sender]]);

        int256 senderOffer = tradeWindows[msg.sender].ethOffer;
        int256 partnerOffer = tradeWindows[trades[msg.sender]].ethOffer;

        int256 newSenderBalance = senderBalance + (senderOffer-partnerOffer);
        int256 newPartnerBalance = partnerBalance + (partnerOffer-senderOffer);

        require(newSenderBalance >= 0 && newPartnerBalance >= 0, "Insufficient balance on one side");        
        ethBalances[msg.sender] = uint256(newSenderBalance);
        ethBalances[trades[msg.sender]] = uint256(newPartnerBalance);

        executeFunctionCalls(msg.sender);
        executeFunctionCalls(trades[msg.sender]);
        closeTrade();
    }

    function executeFunctionCalls(address _trader) private {
        for(uint8 i = 0; i < tradeWindows[_trader].funcOffers.length; i++){
            address contractAd = tradeWindows[_trader].funcOffers[i].contractAd;
            bytes memory encodedFunc = tradeWindows[_trader].funcOffers[i].encodedFunc;

            (bool success, bytes memory data) = contractAd.call(encodedFunc);
            require(success == true, "Function call failed");
        }
    }
}

contract Squish {
    address public squishy = address(0);
    
    function setSquishy(address _squishy) public {
        squishy = _squishy;
    }
}