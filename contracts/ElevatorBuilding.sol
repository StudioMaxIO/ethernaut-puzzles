// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Elevator.sol";

contract ElevatorBuilding is Building {
    Elevator ELEVATOR;
    uint256 public constant TOP_FLOOR = 10;
    bool public top;
    uint256 public floor;

    constructor(address _elevatorAddress) {
        ELEVATOR = Elevator(_elevatorAddress);
    }

    function goToFloor(uint256 _floor) public {
        ELEVATOR.goTo(_floor);
    }

    function isLastFloor(uint256 _floor) external view returns (bool) {
        if (_floor <= TOP_FLOOR && _floor != ELEVATOR.floor()) {
            return false;
        } else if (_floor == TOP_FLOOR) {
            return true;
        } else {
            return false;
        }
    }
}
