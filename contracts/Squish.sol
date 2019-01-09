pragma solidity ^0.5.2;
//Preliminary Code - WIP

contract Squish {
  uint256 public squishInt;
  bool public squishBool;
  address public squishAdd;
  
  function setSquish(uint256 _squish) public {
    squishInt = _squish;
  }
  
  function setSquish(bool _squish) public {
    squishBool = _squish;
  }

  function setSquish(address _squish) public {
    squishAdd = _squish;
  }
}