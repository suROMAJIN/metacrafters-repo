// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BurgerContracts {
    address payable public owner;
    uint256 public balance;
    uint256 public burgerCount;

    event SellBurger(uint256 amount);
    event BuyBurger(uint256 amount);

    constructor(uint initBalance, uint initBurgerCount) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        burgerCount = initBurgerCount;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function getBurgerCount() public view returns(uint256) {
        return burgerCount;
    }

    // This function allows the owner to sell a burger, increasing the contract's balance
    function sellBurger(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // Make sure the caller is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // Receive the amount of ETH sent in the transaction
      //  require(msg.value >= _amount, "Not enough ETH sent");

        require(burgerCount >= 1, "You don't have enough burgers buddy!");

        // Perform the transaction and increase the balance, decrease burger count
        balance += _amount;
        burgerCount -= _amount;

        // Assert that the transaction was successful
        assert(balance == _previousBalance + _amount);

        // Emit an event
        emit SellBurger(_amount);
    }

    // Custom error for insufficient balance
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    // This function allows the owner to buy a burger, decreasing the contract's balance
    function buyBurger(uint256 _withdrawAmount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");

        // Ensure the correct amount of ETH is sent to buy the burger
       // require(msg.value >= _withdrawAmount, "Not enough ETH sent");

        uint _previousBalance = balance;

        // Check if there are enough burgers (balance) to sell
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // Deduct the amount from the contract balance, and then decrease burger count
        //  hardcoded burgercount because two burgers with differenct costs
        // use this function
        balance -= _withdrawAmount;
        burgerCount += 1;

        // Assert that the balance is correctly updated
        assert(balance == (_previousBalance - _withdrawAmount));

        // Emit an event
        emit BuyBurger(_withdrawAmount);
    }

    /* Fallback function to handle direct ETH transfers to the contract
    receive() external payable {
        
    }

     Optional: Fallback function for calls with no matching function (not required for ETH handling)
    fallback() external payable {
        
    }
    */

}
