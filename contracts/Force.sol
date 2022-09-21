// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {
    address payable receiver;

    constructor(address payable _receiver) {
        receiver = _receiver;
    }

    function addValue() public payable {}

    function selfDestruct() public {
        selfdestruct(receiver);
    }
}
