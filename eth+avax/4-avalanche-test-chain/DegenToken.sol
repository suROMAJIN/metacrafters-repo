// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable (msg.sender) {

    // Struct for item details
    struct Item {
        string name;
        uint price;
        uint stock;
    }

    // Mapping to store items by their ID (simple uint)
    mapping(uint => Item) private items;

    // Constructor to initialize the token and the items with your provided details
    constructor() ERC20("Degen", "DGN") {
        // Adding 5 items with price and stock details
        items[1] = Item("Sword", 4, 14);  // Item ID 1: Sword, Price 4 DGN, 14 in stock
        items[2] = Item("GreatSword", 8, 6); // Item ID 2: GreatSword, Price 8 DGN, 6 in stock
        items[3] = Item("Bow", 3, 21); // Item ID 3: Bow, Price 3 DGN, 21 in stock
        items[4] = Item("Magical Staff", 11, 9); // Item ID 4: Magical Staff, Price 11 DGN, 9 in stock
        items[5] = Item("Spear", 6, 17); // Item ID 5: Spear, Price 6 DGN, 17 in stock
    }

    // Function to redeem items using tokens
    function redeem(uint itemId, uint quantity) public {
        require(itemId > 0, "Invalid item ID");
        require(quantity > 0, "Quantity must be greater than 0");
        require(items[itemId].stock >= quantity, "Not enough stock");
        require(balanceOf(msg.sender) >= items[itemId].price * quantity, "Not enough DGN tokens");

        // Update item stock and burn tokens
        items[itemId].stock -= quantity;
        _burn(msg.sender, items[itemId].price * quantity);
    }

    // Mint new tokens (only the owner can mint)
    function mint(address recipient, uint amount) public onlyOwner {
        _mint(recipient, amount);
    }

    // Override transfer function (simple validation)
    function transfer(address recipient, uint amount) public override returns (bool) {
        require(amount > 0, "Amount must be greater than 0");
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    // Check the token balance of the sender
    function checkBalance() public view returns (uint) {
        return balanceOf(msg.sender);
    }

    // Burn tokens from the sender's account
    function burnTokens(uint amount) public {
        require(amount > 0, "Amount must be greater than 0");
        _burn(msg.sender, amount);
    }

    // Function to get item details by ID
    function getItemDetails(uint itemId) public view returns (string memory name, uint price, uint stock) {
        require(itemId > 0, "Invalid item ID");
        Item memory item = items[itemId];
        require(bytes(item.name).length > 0, "Item not found");
        return (item.name, item.price, item.stock);
    }
}

// By Jasper