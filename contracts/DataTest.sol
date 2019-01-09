pragma solidity ^0.5.2;
//Preliminary Code - WIP

contract DataTest {
  
  function getHard(uint256 _value) public pure returns (bytes memory) {
    return abi.encodePacked(bytes4(keccak256("setSquish(uint256)")), _value);
  }

  function callHard(address _contract, uint256 _value) public {
    _contract.call(abi.encodePacked(bytes4(keccak256("setSquish(uint256)")), _value));
  }

  function callHardBool(address _contract, bool _value) public {
    _contract.call(abi.encodePacked(bytes4(keccak256("setSquish(bool)")), _value));
  }

  //_funcName is easier to call using a string on remix
  function getSoft(string memory _funcName, uint256 _value) public pure returns (bytes memory) {
    return abi.encodePacked(bytes4(keccak256(bytes(_funcName))), _value);
  }

  //_funcName is easier to call using a string on remix
  function callSoft(address _contract, string memory _funcName, uint256 _value) public {
    _contract.call(abi.encodePacked(bytes4(keccak256(bytes(_funcName))), _value));
  }
  
  //_funcName is easier to call using a string on remix
  function callSoftBool(address _contract, string memory _funcName, bool _value) public {
    _contract.call(abi.encodePacked(bytes4(keccak256(bytes(_funcName))), _value));
  }

  function callPreEncoded(address _contract, bytes memory _value) public {
    _contract.call(_value);
  }
}