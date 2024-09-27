// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract MyToken {
    string public name = "Decentralized Accreditation in Monetary Notes";
    string public symbol = "DAMN";
    uint256 public supply = 0;

    mapping(address => uint256) public balances;


    function mint(address sender, uint256 amount) public {
        supply += amount;
        balances[sender] += amount;
    }

    function burn(address recipient, uint256 amount) public {
        if(balances[recipient] >= amount){   

            supply -= amount;
            balances[recipient] -= amount;
        }
    }
}
