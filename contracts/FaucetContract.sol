// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    //this is a special function and is called when you amke a txn that doesnt specify function name call
    // External functions are a part of the contract interface which means thaey can be called via contracts and other txns

    receive() external payable {}

    function addFunds() external payable {}

    function justTesting() external pure returns (uint256) {
        return 5 + 5;
    }
    // pure,view - read-only, - no gas fee
    // view -  indicates the func won't alter the storage state in any way
    // pure - more strict than view and it won't even read the storage state
}
// const instance = await Faucet.deployed()
