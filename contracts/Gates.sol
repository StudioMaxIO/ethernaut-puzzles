// SPDX-License-Identifier: MIT
/*
pragma solidity ^0.6.0;

contract Gates {
    function origin() public view returns(address){
        return tx.origin;
    }
    function whatIsGateKey3AsUint16() public view returns(uint16){
        return uint16(tx.origin);
    }
    function gate3_3Test(bytes8 _gateKey) public view returns(bool){
        return(uint32(uint64(_gateKey)) == uint16(tx.origin));
    }
    function gate3_2Test(bytes8 _gateKey) public view returns(bool){
        return(uint32(uint64(_gateKey)) == uint64(_gateKey));
    }
    function uint64ToBytes8(uint64 input) public view returns(bytes8){
        return bytes8(input);
    }
    function gasLeft() public view returns(uint256) {
        return gasleft() % 8191;
    }
}
*/