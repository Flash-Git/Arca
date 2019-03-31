pragma solidity ^0.5.0;

import "./IERC165.sol";

/*
* Original code sourced from OpenZeppelin
*
* @title ERC165
* @dev Implements ERC165 using a lookup table.
*/
contract ERC165 is IERC165 {
  bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;
  /*
  * 0x01ffc9a7 ===
  *   bytes4(keccak256('supportsInterface(bytes4)'))
  */

  /*
  * @dev A mapping of interface id to whether or not it's supported.
  */
  mapping(bytes4 => bool) private _supportedInterfaces;

  /*
  * @dev A contract implementing SupportsInterfaceWithLookup.
  * implement ERC165 itself
  */
  constructor() internal {
    _registerInterface(_INTERFACE_ID_ERC165);
  }

  /*
  * @dev Implement supportsInterface(bytes4) using a lookup table.
  */
  function supportsInterface(bytes4 interfaceId) external view returns (bool) {
    return _supportedInterfaces[interfaceId];
  }

  /*
  * @dev Internal method for registering an interface.
  */
  function _registerInterface(bytes4 interfaceId) internal {
    require(interfaceId != 0xffffffff);
    _supportedInterfaces[interfaceId] = true;
  }
}