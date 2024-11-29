# A Simple ERC20 Token: Implementing Token Management with Smart Contracts

## Overview

`AnToken` is a smart contract built on the Ethereum blockchain, designed to create and manage an ERC20 token called **AnToken (ANTK)**. This contract allows the designated owner to mint tokens to specific addresses, while enabling users to transfer and burn tokens. It serves as an educational example of basic token functionalities like minting, transferring, and burning, as well as ownership management in Solidity programming.

## Features
- **Minting**: Only the contract owner can mint new tokens to any address.
- **Transferring**: Users can transfer tokens to other users, with checks for sufficient balance.
- **Burning**: Any user can burn their own tokens, reducing the total supply.
- **Ownership Management**: The owner can transfer ownership of the contract to another address.
- **Event Emission**: Emits events for minting and burning tokens for transparency.

## Functions

### `mintTokens(address to, uint256 amount)`
```solidity
function mintTokens(address to, uint256 amount) external
```
- **Description**: Allows the owner to mint new tokens and send them to a specified address (`to`).
- **Parameters**: 
  - `to`: The address to which tokens will be minted.
  - `amount`: The number of tokens to mint.
- **Returns**: None

### `transferTokens(address to, uint256 amount)`
```solidity
function transferTokens(address to, uint256 amount) external returns (bool)
```
- **Description**: Allows users to transfer tokens to another address (`to`), checking that the sender has enough balance.
- **Parameters**: 
  - `to`: The recipient address to which tokens will be sent.
  - `amount`: The number of tokens to transfer.
- **Returns**: `bool` - Returns `true` if the transfer is successful.

### `burnTokens(uint256 amount)`
```solidity
function burnTokens(uint256 amount) external
```
- **Description**: Allows any user to burn (destroy) their own tokens, reducing the total supply.
- **Parameters**: 
  - `amount`: The number of tokens to burn.
- **Returns**: None

## Constructor
```solidity
constructor() ERC20("AnToken", "ANTK")
```
- **Description**: Initializes the contract with the name `AnToken` and symbol `ANTK`. The deployer’s address is set as the contract owner.
- **Parameters**: None
- **Returns**: None

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for more information.

## Acknowledgments

- Inspired by the principles of ERC20 tokens and smart contract development.
- Developed using Solidity and Remix IDE, with the help of the OpenZeppelin library for secure and tested implementations of common standards like ERC20.
