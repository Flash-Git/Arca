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

    function pushOffer(int256 _ethOffer, address _contract, bytes4 _function, bytes32[] memory _args, uint8[] memory _argIndex) public payable {
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

    function pushFuncOffer(address _contract, bytes4 _function, bytes32[] memory _args, uint8[] memory _argIndex) public {
        require(_contract != address(this), "no");
        require(_args.length < 3, "Too many arguments");//TODO does it work with 0?


        if(_args.length == 1){
            encodeFunctionCall(_contract, _function, _args[0]);
        }
        if(_args.length == 2){
            encodeFunctionCall(_contract, _function, _args[0], _args[1]);
        }
        if(_args.length == 3){
            encodeFunctionCall(_contract, _function, _args[0], _args[1], _args[2]);
        }
        
        tradeWindows[trades[msg.sender]].satisfied = false;
        tradeWindows[msg.sender].satisfied = false;
    }
  
    function getBytes4(bytes memory _data) public pure returns (bytes4 funcHash) {
        funcHash = bytes4(keccak256(_data));//"setSquish(uint256)"
    }

    function bytesToAddress(bytes32 _data) private pure returns (address addr) {
        assembly {
            addr := mload(add(_data, 20))
        } 
    }

    //TODO Remove funcOffer
    //function 

    function encodeFunctionCall(address _contract, bytes4 _function, bytes32 _argument) private {
        FuncCall memory fCall;
        fCall.contractAd = _contract;
        fCall.encodedFunc = abi.encodePacked(_function, _argument);
        tradeWindows[msg.sender].funcOffers.push(fCall);
        //log updated offer
    }

    function encodeFunctionCall(address _contract, bytes4 _function, bytes32 _argumentOne, bytes32 _argumentTwo) private {
        FuncCall memory fCall;
        fCall.contractAd = _contract;
        fCall.encodedFunc = abi.encodePacked(_function, _argumentOne, _argumentTwo);
        tradeWindows[msg.sender].funcOffers.push(fCall);
        //log updated offer
    }
    
    function encodeFunctionCall(address _contract, bytes4 _function, bytes32 _argumentOne, bytes32 _argumentTwo, bytes32 _argumentThree) private {
        FuncCall memory fCall;
        fCall.contractAd = _contract;
        fCall.encodedFunc = abi.encodePacked(_function, _argumentOne, _argumentTwo, _argumentThree);
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