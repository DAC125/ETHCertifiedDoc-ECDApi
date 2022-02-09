// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


contract MyContract{
    uint public data;

    function setData(uint _data) external{
        data = _data;
    }
}