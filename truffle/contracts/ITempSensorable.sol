pragma solidity ^0.4.18;

interface ITempSensorable {
    function getData(uint256 id) constant public returns (uint256, int32);
}
