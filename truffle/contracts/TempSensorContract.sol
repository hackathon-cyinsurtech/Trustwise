pragma solidity ^0.4.18;

import './ITempSensorable.sol';
import './owned.sol';

contract TempSensorContract is ITempSensorable, owned {

    event NewTemperature(int32 _temperature);

    mapping (uint256=>uint256) public time;
    mapping (uint256=>int32) public temperature;

    uint256 public length;

    function TempSensorContract() public {
        length = 0;
    }

    function addTemperature(int32 _temperature) public onlyOwner returns (uint id) {
        id = length;
        time[length] = now;
        temperature[length] = _temperature;
        length++;
        NewTemperature(_temperature);
    }
    
    function getData(uint256 id) constant public returns (uint256, int32){
        return (time[id], temperature[id]);
    }
}