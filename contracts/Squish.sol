pragma solidity ^0.5.2;
//Preliminary Code - WIP

contract Squish {

  uint256 private squishUint;
  bool private squishBool;
  address private squishAdd;
  mapping(address => SquishyAsset) private assets;

  struct SquishyAsset {
    address owner;
    mapping(address => bytes8) msgs;
    mapping(address => int256) loveFactors;
  }


  /*
  * SquishyAssets
  *
  */

  function setAssetOwner(address _add) public {
    assets[msg.sender].owner = _add;
  }

  function setAssetMsg(address _add, bytes8 _msg) public {
    assets[msg.sender].msgs[_add] = _msg;
  }

  function setAssetLoveFactor(address _add, int256 _loveFactor) public {
    assets[msg.sender].loveFactors[_add] = _loveFactor;
  }

  function setAssetOwner(address _ad, address _add) public {
    require(assets[_ad].owner == msg.sender, "Not an owner");
    assets[_ad].owner = _add;
  }
  
  function setAssetMsg(address _ad, address _add, bytes8 _msg) public {
    require(assets[_ad].owner == msg.sender, "Not an owner");
    assets[_ad].msgs[_add] = _msg;
  }

  function setAssetLoveFactor(address _ad, address _add, int256 _loveFactor) public {
    require(assets[_ad].owner == msg.sender, "Not an owner");
    assets[_ad].loveFactors[_add] = _loveFactor;
  }

  //Getters
  function getAssetOwner(address _add) public view returns (address) {
    return assets[_add].owner;
  }

  function getAssetMsg(address _add, address _assetAdd) public view returns (bytes8) {
    return assets[_add].msgs[_assetAdd];
  }

  function getAssetLoveFactor(address _add, address _assetAdd) public view returns (int256) {
    return assets[_add].loveFactors[_assetAdd];
  }

  function getAsset(address _add, address _assetAdd) public view returns (address, bytes8, int256) {
    return(getAssetOwner(_add), getAssetMsg(_add, _assetAdd), getAssetLoveFactor(_add, _assetAdd));
  }


  /*
  * Direct Setters
  *
  */


  function setUint(uint256 _uint) public {
    squishUint = _uint;
  }
  
  function setBool(bool _bool) public {
    squishBool = _bool;
  }

  function setAdd(address _add) public {
    squishAdd = _add;
  }

  function setAdd() public {
    squishAdd = msg.sender;
  }

  function addToUint(uint256 _uint) public {
    squishUint += _uint;
  }

  function switchBool() public {
    squishBool = !squishBool;
  }

  //Getters
  function getUint() public view returns (uint256) {
    return squishUint;
  }
  
  function getBool() public view returns (bool) {
    return squishBool;
  }
  
  function getAdd() public view returns (address) {
    return squishAdd;
  }

  /*
  * Var Combinations
  *
  */


  function setVars(uint256 _uint) public {
    setUint(_uint);
  }

  function setVars(bool _bool) public {
    setBool(_bool);
  }

  function setVars(address _add) public {
    setAdd(_add);
  }

  function setVars(uint256 _uint, bool _bool) public {
    setUint(_uint);
    setBool(_bool);
  }

  function setVars(uint256 _uint, bool _bool, address _add) public {
    setUint(_uint);
    setBool(_bool);
    setAdd(_add);
  }

  function setVars(bool _bool, address _add) public {
    setBool(_bool);
    setAdd(_add);
  }

  function setVars(uint256 _uint, address _add) public {
    setUint(_uint);
    setAdd(_add);
  }
  
  //Getters
  function getVars() public view returns (uint256, bool, address){
    return(squishUint, squishBool, squishAdd);
  }


  /*
  * Failing Calls
  *
  */

  function revertedCall() public pure {
    revert();
  }

  function requiredCall(bool _bool) public pure {
    require(_bool == false, "Input wasn't false");
  }
  
  function assertedCall(bool _bool) public pure {
    assert(_bool == false);
  }

}