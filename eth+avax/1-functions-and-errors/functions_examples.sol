// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/* 
    By Jasper Rodriguez
    Write a smart contract that implements the require(), assert() and revert() statements.
*/

contract FunctionsExamples {
    // State variable to store the owner's address
    address public owner;

    // Constructor that sets the contract deployer as the owner
    constructor() {
        owner = msg.sender; 
    }

    // Function to check if the caller is the owner using require()
    function onlyOwner() public view {
    /*
        Checks if the caller is the owner of the contract.
        This method ensures that only the owner can call functions that require ownership.
        If a non-owner attempts to call this function, it will revert with an error message.

        Parameters:
        None

        Returns:
        None
    */
        require(msg.sender == owner, "Only the owner can call this function."); 
    }

    // Function to check if the caller is the owner using revert()
    function isOwnerHere() public view {
    /*
        Verifies if the caller is the owner of the contract.
        This method checks if the caller's address matches the owner's address.
        If it does not, it reverts the transaction with a specific error message.

        Parameters:
        None

        Returns:
        None
    */
        if (msg.sender != owner) { 
            revert("The caller is not the owner."); 
        }
    }


    function assertOwner() public view {
    /*
        Asserts that the caller is the owner of the contract.
        This method uses assert to guarantee that only the owner can call this function.
        If a non-owner attempts to call it, an assertion failure will occur, indicating a critical logic error.

        Parameters:
        None

        Returns:
        None
    */
        assert(msg.sender == owner); 
    }
}
