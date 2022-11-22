// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//yarn add --dev @openzeppelin/contracts

contract OurToken is ERC20 {
    //our constructor and the ERC20 constructor
    constructor(uint256 initialSupply) ERC20("Chill", "CHILL") {
        _mint(msg.sender, initialSupply);
    }
    //careful that ERC20s have a function called decimals() which tells us how many decimals we should expect with our ERC20
    //the default is 18 and we can override the function if we want a different amount of decimals
    //and if we know the decimals are 18 and imagine we want to deploy with initial supply of 50
    //we should then do initial supply of "50e18" or "50 * 10**18"
}
