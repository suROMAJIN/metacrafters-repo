// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AnToken is ERC20 {

    address public owner;  // Public variable to store the owner's address


    // Constructor initializes the token with name and symbol, and sets the owner to the contract deployer's address
    constructor() ERC20("AnToken", "ANTK") {
        owner = msg.sender;  // Set the owner to the address that deploys the contract
    }

    // Mint function - Only the owner can mint new tokens to a specified address
    function mintTokens(address to, uint256 amount) external {
        require(owner == msg.sender, "Only owner can mint ANTK");  // Ensure only the owner can mint tokens
        require(amount > 0, "Mint amount must be greater than 0 ANTK");
        _mint(to, amount);
    }

    // Transfer function - Users can transfer tokens to other users, with checks for valid amount
    function transferTokens(address to, uint256 amount) external returns (bool) {
        require(amount > 0, "Transfer amount must be greater than 0 ANTK");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance to transfer");
        _transfer(msg.sender, to, amount);
        return true;
    }

    // Burn function - Any user can burn their own tokens, removing them from the supply
    function burnTokens(uint256 amount) external {
        require(amount > 0, "Burn amount must be greater than 0 ANTK");
        _burn(msg.sender, amount);
    }

}

//By Jasper
