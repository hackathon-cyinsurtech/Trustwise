pragma solidity ^0.4.18;

import './ITempSensorable.sol';
import './owned.sol';

contract P2PTempInsurance is owned {

    event Bid(address indexed _bidder, uint256 _value);
    event PremiumWithdrawn(uint256 _value);
    event BidWithdrawn(address indexed _bidder, uint256 _value);
    event ExpiredWithdrawn(address indexed _address, uint256 _value);
    event PayedOut(uint _value);


    uint256 public constant REPEATED_INFRACTIONS = 3;
    uint256 public constant FEES_PERCENTAGE = 7;
    address public constant FEES_RECIPIENT = 0x1D4039ac31bFE1120C392cB6C839a3d422F742c8;

    uint256 public startPremium;
    uint256 public lowestPremium;
    uint256 public paybackPremium;
    uint256 public payout;
    uint256 public startTime;
    uint256 public endTime;
    int32 public temperature;
    bool public isTempBelow;
    address public sensorContract;

    address public lowestBidder;

    string public description;

    mapping (address=>uint256) returnAmounts;

    bool public payed;
    bool public expiredWithdrawn;
    
    function P2PTempInsurance(
        uint256 _payout,
        int32 _temperature, 
        bool _isTempBelow, 
        uint256 _startTime, 
        uint256 _endTime, 
        address _sensorContract,
        string _description
    ) public payable {
        require(_endTime > _startTime);

        payout = _payout;
        temperature = _temperature;
        isTempBelow = _isTempBelow;
        startTime = _startTime;
        endTime = _endTime;
        sensorContract = _sensorContract;
        description = _description;
        uint256 fee = msg.value * FEES_PERCENTAGE / 100;
        startPremium = lowestPremium = msg.value - fee;
        require(FEES_RECIPIENT.send(fee));
        expiredWithdrawn = payed = false;
    }


    function bid(uint256 premium) public payable {
        lowestBidder == 0x0 ? require(premium <= lowestPremium) : require(premium < lowestPremium);
        require(now < startTime);
        require(msg.value == payout);
        if (lowestBidder != 0x0) returnAmounts[lowestBidder] += payout;
        lowestPremium = premium;
        lowestBidder = msg.sender;
        paybackPremium = startPremium - lowestPremium;
        Bid(lowestBidder, lowestPremium);
    }

    function withdrawPremium() public returns(bool success) {
        require(now >= startTime);
        success = true;
        uint256 amount;
        if (lowestBidder == 0x0) {
            amount = lowestPremium;
            if (amount == 0) return false;
            lowestPremium = 0;
            if (!owner.send(amount)) {
                lowestPremium = amount;
                success = false;
            }
        } else {
            amount = paybackPremium;
            if (amount == 0) return false;
            paybackPremium = 0;
            if (!owner.send(amount)) {
                paybackPremium = amount;
                success = false;
            }
        }
        if (success) PremiumWithdrawn(amount);
    }

    function withdrawBid() public returns (bool success) {
        success = true;
        uint256 amount = returnAmounts[msg.sender];
        if (amount == 0) return false;
        returnAmounts[msg.sender] = 0;
        if (!msg.sender.send(amount)) {
            returnAmounts[msg.sender] = amount;
            success = false;
        }
        if (success) BidWithdrawn(msg.sender, amount);
    }

    function withdrawExpired() public returns (bool success) {
        require(now > endTime);
        require(!payed);
        require(lowestBidder != 0x0);
        if (expiredWithdrawn) return false;
        success = true;
        expiredWithdrawn = true;
        uint256 amount = payout + lowestPremium;
        if (!lowestBidder.send(amount)) {
            expiredWithdrawn = success = false;
        }
        if (success) ExpiredWithdrawn(lowestBidder, amount);
    }

    function checkConditions(uint256 from, uint256 to) public returns (bool _payed) {
        if (lowestBidder == 0x0) return false;
        _payed = false;
        uint256 repeated = 0;
        for (uint256 i = from; i <= to; ++i) {
            uint256 time;
            int32 temp;
            (time, temp) = ITempSensorable(sensorContract).getData(i);
            if (time < startTime && time > endTime) continue;
            if (isTempBelow) 
                repeated = temp < temperature ? repeated + 1 : 0;
            else
                repeated = temp > temperature ? repeated + 1 : 0;
            if (repeated >= REPEATED_INFRACTIONS) {
                _payed = processPayout();
            }
        }
    }

    function processPayout() internal returns (bool success) {
        if (payed) return false;
        success = true;
        payed = true;
        uint256 amount = lowestPremium;
        amount += payout;
        if (!owner.send(amount)) {
            success = payed = false;
        }
        if (success) PayedOut(amount);
    }
}