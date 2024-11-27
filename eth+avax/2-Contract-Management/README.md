# A Simple DAPP: Implementing Burger Management with Smart Contracts
## Overview

`BurgerContracts` is a smart contract built on the Ethereum blockchain, designed for managing burger sales and inventory. This contract allows the designated owner to sell and buy burgers while maintaining a balance of ETH and burger count. It serves as an educational example of ownership management and error handling in Solidity programming.

## Features
- **Ownership Management**: Ensures that only the contract owner can execute functions related to selling and buying burgers.
- **Error Handling**: Demonstrates various methods of error handling in Solidity, including `require()`, `revert()`, and `assert()`.
- **Event Emission**: Emits events for significant actions like selling and buying burgers, providing transparency and traceability.

## Functions

### `getBalance()`
```solidity
function getBalance() public view returns(uint256)
```
- **Description**: Returns the current balance of the contract in ETH.
- **Parameters**: None
- **Returns**: `uint256` - The current balance of the contract.

### `getBurgerCount()`
```solidity
function getBurgerCount() public view returns(uint256)
```
- **Description**: Returns the current count of burgers available in the contract.
- **Parameters**: None
- **Returns**: `uint256` - The current burger count.

### `sellBurger(uint256 _amount)`
```solidity
function sellBurger(uint256 _amount) public payable
```
- **Description**: Allows the owner to sell burgers, increasing the contract's balance and decreasing the burger count. The function checks that the caller is the owner and that there are enough burgers available.
- **Parameters**: 
  - `_amount`: The number of burgers to sell.
- **Returns**: None

### `buyBurger(uint256 _withdrawAmount)`
```solidity
function buyBurger(uint256 _withdrawAmount) public payable
```
- **Description**: Allows the owner to buy burgers, decreasing the contract's balance and increasing the burger count. The function checks that the caller is the owner and that there is sufficient balance to complete the transaction.
- **Parameters**: 
  - `_withdrawAmount`: The amount of ETH to withdraw for buying burgers.
- **Returns**: None

## Events
- **SellBurger**: Emitted when the owner sells burgers.
- **DecreaseBurgerCount**: Emitted when the burger count is decreased.
- **BuyBurger**: Emitted when the owner buys burgers.
- **IncreaseBurgerCount**: Emitted when the burger count is increased.

## Custom Errors
- **InsufficientBalance**: A custom error that is thrown when there is not enough balance to complete a buy transaction.

## Constructor
```solidity
constructor(uint initBalance, uint initBurgerCount) payable
```
- **Description**: Initializes the contract with an initial balance and burger count. The contract owner is set to the address that deploys the contract.
- **Parameters**: 
  - `initBalance`: The initial balance of the contract.
  - `initBurgerCount`: The initial count of burgers available.

## Instructions on how to run in local environment
- Clone into your own machine
- Change active directory to root folder
- Run the command "npm i". This will install all necessary packages needed.
- Open a new terminal, and then run `npx hardhat node`
- Open another new terminal, and in there run `npx hardhat run --network localhost scripts/deploy.js`
- Open A third terminal, and in this terminal you can now start the front end by running `npm run dev`

- So to summarize, first terminal is for creating test network, second terminal is for compiling and deploying to network, and then third is for runing the react app.


## Troubleshooting errors
- If you encounter errors like `Nonce too high, Transaction fallback, or ethBlockNumber too high etc.`
    This is probably due to metamask and/or the hardhat node.
1. Try stopping the hardhat node and then the react app first. And then starting them again by proceeding with 
the instructions like above.
2. Try removing localhost network from metamask. Pick another network first, delete localhost, and then re-enter details again.
3. Try deleting cached data. For metamask, go to settings-advanced-clea tab activity data.
And then for hardhat, stop the current node and then run `npx hardhat clean`. Restart the app.
* Sometimes you might want to try to deploy the contract again while the app is running (?)

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for more information.

## Acknowledgments

Inspired by basic principles of token standards on Ethereum based on lessons from Metacrafters. 
Developed using Solidity and Remix IDE.
