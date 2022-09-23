// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./GatekeeperOne.sol";

contract GatekeeperOneCaller {
    GatekeeperOne GATEKEEPER;
    bool public testEntry;
    uint256 public properGas;

    constructor(address gatekeeperAddress) {
        GATEKEEPER = GatekeeperOne(gatekeeperAddress);
    }

    function enterGateWithKey(bytes8 _gateKey) public {
        (bool success, ) = address(GATEKEEPER).call{gas: 24847}(
            abi.encodeWithSignature("enter(bytes8)", _gateKey)
        );
        require(success, "unsuccessful entry");
    }

    function getKeyFromAddress(address originAddress)
        public
        pure
        returns (bytes8 key)
    {
        key = bytes8(uint64(uint160(originAddress)) & 0xFFFFFFFF0000FFFF);
    }

    function findGas(bytes8 _gateKey) public {
        bool success;
        uint256 gasValue;
        for (gasValue = 0; gasValue <= 8191; gasValue++) {
            (success, ) = address(GATEKEEPER).call{gas: gasValue + (8191 * 3)}(
                abi.encodeWithSignature("enter(bytes8)", _gateKey)
            );
            if (success) {
                properGas = gasValue + (8191 * 3);
                break;
            }
        }
        require(success, "Unsuccessful entry");
    }

    modifier gateOne() {
        // this should be != but we're testing from sender
        require(msg.sender == tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(uint160(tx.origin))),
            "GatekeeperOne: invalid gateThree part three"
        );
        _;
    }

    function testGates(bytes8 _gateKey)
        public
        gateOne
        gateTwo
        gateThree(_gateKey)
    {
        testEntry = true;
    }

    function testGate3(bytes8 testBytes) public {
        require(
            uint32(uint64(testBytes)) == uint16(uint64(testBytes)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(testBytes)) != uint64(testBytes),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            // this tests tx.origin in practice, but we're testing from the sender
            uint32(uint64(testBytes)) == uint16(uint64(uint160(msg.sender))),
            "GatekeeperOne: invalid gateThree part three"
        );
        testEntry = true;
    }
}
