# DegenToken: A Simple Token-Based Item Redemption System

## Overview

`DegenToken` is an Ethereum-based ERC-20 token contract designed to manage a simple token economy where users can redeem items from an inventory using `Degen` (DGN) tokens. The contract includes basic functionality for minting new tokens, transferring tokens, and managing an inventory of items. The contract is primarily educational, demonstrating ownership control, token transfers, and simple item management in Solidity.

## Features

- **ERC-20 Token**: Implements a basic ERC-20 token (DegenToken) that can be transferred between users.
- **Item Redemption**: Users can redeem items from an inventory by spending DGN tokens.
- **Inventory Management**: Items are stored with their names, prices, and stock. The contract owner can mint new tokens and manage the inventory.
- **Ownership Management**: Only the contract owner can mint new tokens or manage the inventory.
- **Item Details**: View item details, including name, price, and available stock.

## Functions

### `redeem(uint itemId, uint quantity)`
```solidity
function redeem(uint itemId, uint quantity) public
```
- **Description**: Allows users to redeem items from the inventory using their DGN tokens. The user must have enough tokens to purchase the requested quantity of items, and there must be sufficient stock available.
- **Parameters**: 
  - `itemId`: The ID of the item being redeemed.
  - `quantity`: The number of items to redeem.
- **Returns**: None (updates the stock and burns tokens).

### `mint(address recipient, uint amount)`
```solidity
function mint(address recipient, uint amount) public onlyOwner
```
- **Description**: Allows the owner to mint new DGN tokens and send them to a specified address.
- **Parameters**: 
  - `recipient`: The address that will receive the newly minted tokens.
  - `amount`: The number of tokens to mint.
- **Returns**: None

### `transfer(address recipient, uint amount)`
```solidity
function transfer(address recipient, uint amount) public override returns (bool)
```
- **Description**: Overrides the default ERC-20 `transfer` function with basic validation to ensure the transfer amount is greater than 0.
- **Parameters**: 
  - `recipient`: The address to which tokens will be transferred.
  - `amount`: The number of tokens to transfer.
- **Returns**: A boolean indicating whether the transfer was successful.

### `checkBalance()`
```solidity
function checkBalance() public view returns (uint)
```
- **Description**: Returns the DGN token balance of the calling user.
- **Parameters**: None
- **Returns**: `uint` - The current balance of the user in DGN tokens.

### `burnTokens(uint amount)`
```solidity
function burnTokens(uint amount) public
```
- **Description**: Allows users to burn a specified amount of DGN tokens from their own balance.
- **Parameters**: 
  - `amount`: The number of tokens to burn.
- **Returns**: None

### `getItemDetails(uint itemId)`
```solidity
function getItemDetails(uint itemId) public view returns (string memory name, uint price, uint stock)
```
- **Description**: Returns the details of an item in the inventory, including its name, price, and available stock.
- **Parameters**: 
  - `itemId`: The ID of the item to retrieve details for.
- **Returns**: 
  - `name`: The name of the item.
  - `price`: The price of the item in DGN tokens.
  - `stock`: The available stock of the item.

## Inventory Example

The contract includes a simple inventory of 5 items with the following details:

- **Item 1**: Sword, Price 4 DGN, Stock 14
- **Item 2**: GreatSword, Price 8 DGN, Stock 6
- **Item 3**: Bow, Price 3 DGN, Stock 21
- **Item 4**: Magical Staff, Price 11 DGN, Stock 9
- **Item 5**: Spear, Price 6 DGN, Stock 17

## Constructor

```solidity
constructor() ERC20("Degen", "DGN")
```
- **Description**: Initializes the DegenToken contract with the token name "Degen" and symbol "DGN". The inventory is also populated with the 5 predefined items.
- **Parameters**: None

## Instructions on Running the Contract Locally

### 1. Copy Code on Remix IDE 
-  Make sure that it is being compiled correctly. You may need to create a new workspace so that the OpenZeppelin packages are correctly used

### 2. Create Two metawallet accounts

### 3. Connect those two accounts [here](https://core.app/tools/testnet-faucet/?subnet=c&token=c). Basically connect them to the fuji test network.

### 4. Then fill up at least one account with test avax. You might need a promo code depending on availability.

### 5. Go back to remix IDE, change environment to `injector provider - metamask`. It should detect your metamask and know that there are only 2 wallets in the network they are connected to (the fuji test chain)

### 6. Send a small amount of test avax to the second accound so that it can also be used for the operations.

### 6. You can now deploy the contract. In the deployed contracts, copy the address of the contract and find it in [here](https://testnet.snowtrace.io/)

### 7. Since you have now deployed the contract, you can now interact with the contract thru REMIX IDE.

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for more information.

## Acknowledgments

- Developed using Solidity and OpenZeppelin Contracts.
- Inspired by token-based systems and smart contract principles in decentralized applications.
