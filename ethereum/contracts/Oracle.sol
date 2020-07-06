pragma solidity ^0.6.10;
// "SPDX-License-Identifier: UNLICENSED"

contract Oracle {
  address public owner;
  address public newOwner;
  bool public accepted;
  uint public previousPrice;
  uint public currentPrice;

  modifier onlyOwner() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  event PriceUpdated(uint _oldPrice, uint _newPrice);

  /**
    * @notice Updates the ETHUSD price on the contract
    * @param _price Latest price from the CMC API
  */
  function updatePrice(uint _price) public onlyOwner {
    previousPrice = currentPrice;
    currentPrice = _price;
    emit PriceUpdated(previousPrice, currentPrice);
  }
  
  /**
    * @notice Begins the Ownership transfer process
    * @param _newOwner The address which will become the new owner
  */
  function changeOwner(address _newOwner) public onlyOwner {
    newOwner = _newOwner;
  }
  
  /**
    * @notice The new owner has to call this function to accept his new role
  */
  function acceptOwnership() public {
    require(msg.sender == newOwner, "You are not authorized to call this function");
    accepted = true;
  }
  
  /**
    * @notice Contract ownership is finally transferred to the new owner if he accepted it
  */
  function transferOwner() public onlyOwner {
    require(accepted == true, "The new owner has not accepted this position yet.");
    owner = newOwner;
    accepted = false;
  }
}