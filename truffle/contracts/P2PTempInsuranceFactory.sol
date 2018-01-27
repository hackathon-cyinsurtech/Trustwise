pragma solidity ^0.4.18;

import './P2PTempInsurance.sol';

contract P2PTempInsuranceFactory {

    mapping(address => address[]) public created;
    mapping(address => bool) public isP2PTempInsurance;

    event ContractInstantiation(address indexed sender, address indexed instantiation);

    function P2PTempInsuranceFactory() public  {}

    function createP2PTempInsurance(
        uint256 _payout,
        int32 _temperature, 
        bool _isTempBelow, 
        uint256 _startTime, 
        uint256 _endTime, 
        address _sensorContract,
        string _description
    ) public payable returns (address) {
        P2PTempInsurance newContract = (new P2PTempInsurance).value(msg.value)(
            _payout,
            _temperature, 
            _isTempBelow, 
            _startTime, 
            _endTime, 
            _sensorContract,
            _description
         );
        created[msg.sender].push(address(newContract));
        ContractInstantiation(msg.sender, address(newContract));
        newContract.transferOwnership(msg.sender);
        isP2PTempInsurance[address(newContract)] = true;
        return address(newContract);
    }

    function getCreated(address _address) view public returns (address[]) {
        return created[_address];
    }
}
