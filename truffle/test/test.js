const web3 = global.web3

var P2PTempInsurance = artifacts.require("./P2PTempInsurance.sol")
var TempSensorContract = artifacts.require("./TempSensorContract.sol")

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

const getBalance = (account, at) =>
  promisify(cb => web3.eth.getBalance(account, at, cb));

contract('P2PTempInsurance', function (accounts) {
    let p2PTempInsurance
    let tempSensorContract
    // Let's make a dreamteam
    let bob = accounts[0]
    let jack = accounts[1]
    let michal = accounts[2]
    let robot = accounts[7]
    let jane = accounts[8]

    const timeTravel = function (time) {
        return new Promise((resolve, reject) => {
          web3.currentProvider.sendAsync({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [time], // 86400 is num seconds in day
            id: new Date().getSeconds()
          }, (err, result) => {
            if(err){ return reject(err) }
            return resolve(result)
          });
        })
      }

    const mineBlock = function () {
        web3.currentProvider.send({jsonrpc: "2.0", method: "evm_mine", params: [], id: 0})
      }

    before(async function () {
        //Create contract instances        
        tempSensorContract = await TempSensorContract.new({from: robot})

        now = (await web3.eth.getBlock('latest')).timestamp

        p2PTempInsurance = await P2PTempInsurance.new(
            web3.toWei(5000),
            5,
            true,
            now + 30,
            now + 300000,
            tempSensorContract.address,
            {from: bob, value: web3.toWei(200)}
        )
    })

    it("Robot is the owner of tempSensorContract", async function() {
        const ownerAddress = await tempSensorContract.owner.call({from: robot})
        assert.equal(ownerAddress, robot)
    })

    it("Bob is the owner of p2PTempInsurance", async function() {
        const ownerAddress = await p2PTempInsurance.owner.call({from: robot})
        assert.equal(ownerAddress, bob)
    })

    it("Start premium = lowest one = 200 - 7% (186)", async function() {
        const startPremium = await p2PTempInsurance.startPremium.call({from: robot})
        const lowestPremium = await p2PTempInsurance.lowestPremium.call({from: robot})
        assert.equal(startPremium.toNumber(), web3.toWei(186))
        assert.equal(lowestPremium.toNumber(), web3.toWei(186))
    })

    it("Start premium = lowest one = 200 - 7% (186)", async function() {
        const startPremium = await p2PTempInsurance.startPremium.call({from: robot})
        const lowestPremium = await p2PTempInsurance.lowestPremium.call({from: robot})
        assert.equal(startPremium.toNumber(), web3.toWei(186))
        assert.equal(lowestPremium.toNumber(), web3.toWei(186))
    })

    it("Jack bids 150", async function() {
        let bidEventListener = p2PTempInsurance.Bid()
        await p2PTempInsurance.bid(web3.toWei(150), {from: jack, value: web3.toWei(5000)})
        let bidLog = await new Promise(
            (resolve, reject) => bidEventListener.get(
            (error, log) => error ? reject(error) : resolve(log)))

        assert.equal(bidLog.length, 1, 'should be 1 event')

        let eventArgs = bidLog[0].args
        assert.equal(eventArgs._value, web3.toWei(150))
        assert.equal(eventArgs._bidder, jack)
    })

    it("Jack cannot withdraw his bid since he is the lowest bidder", async function() {
        success = await p2PTempInsurance.withdrawBid.call({from: jack})
        assert.equal(success, false)
    })

    it("Michal re-bids 130", async function() {
        let bidEventListener = p2PTempInsurance.Bid()
        await p2PTempInsurance.bid(web3.toWei(130), {from: michal, value: web3.toWei(5000)})
        let bidLog = await new Promise(
            (resolve, reject) => bidEventListener.get(
            (error, log) => error ? reject(error) : resolve(log)))

        assert.equal(bidLog.length, 1, 'should be 1 event')

        let eventArgs = bidLog[0].args
        assert.equal(eventArgs._value, web3.toWei(130))
        assert.equal(eventArgs._bidder, michal)
    })

    it("Jack can withdraw his bid since he is not the lowest bidder", async function() {
        success = await p2PTempInsurance.withdrawBid.call({from: jack})
        assert.equal(success, true);
    })

    it("Wait till start time, bob withdraws the premium difference", async function() {
        let error
        try {
            await p2PTempInsurance.withdrawPremium({from: bob})
        } catch (err) {
            error = err
        }
        assert.notEqual(error, undefined, 'Error must be thrown')
        await timeTravel(31)
        mineBlock()
        success = await p2PTempInsurance.withdrawPremium.call({from: bob})
        assert.equal(success, true)
    })


    it("Check conditions", async function() {
        await tempSensorContract.addTemperature(10,{from: robot})
        await tempSensorContract.addTemperature(4,{from: robot})
        await tempSensorContract.addTemperature(10,{from: robot})
        await tempSensorContract.addTemperature(4,{from: robot})
        await tempSensorContract.addTemperature(4,{from: robot})
        await tempSensorContract.addTemperature(10,{from: robot})
        await tempSensorContract.addTemperature(4,{from: robot})
        await tempSensorContract.addTemperature(4,{from: robot})
        await tempSensorContract.addTemperature(4,{from: robot})

        success = await p2PTempInsurance.checkConditions.call(0,2,{from: robot})
        assert.equal(success, false);
        success = await p2PTempInsurance.checkConditions.call(3,5,{from: robot})
        assert.equal(success, false);
        success = await p2PTempInsurance.checkConditions.call(6,8,{from: robot})
        assert.equal(success, true);

        let eventListener = p2PTempInsurance.PayedOut()
        await p2PTempInsurance.checkConditions(6,8,{from: robot})
        let log = await new Promise(
            (resolve, reject) => eventListener.get(
            (error, log) => error ? reject(error) : resolve(log)))
        let eventArgs = log[0].args
        assert.equal(eventArgs._value.toNumber(), web3.toWei(5130))

    })

    

/*
    it("Owner distributes 100 tokens to bob", async function() {
        let error
        try {
            await extendedToken.distribute(bob, 100, {from: bob})
        } catch (err) {
            error = err
        }
        assert.equal(error, undefined, 'Error must not be thrown')
    })

    it("Bob init. balance = 100, he has 1 log entry (start:1 length:100)", async function() {
        const balance = await extendedToken.balanceOf.call(bob, {from: robot})
        assert.equal(balance.toNumber(), 100)
        const tokenLogs = await extendedToken.getTokenCertificates(bob)
        assert.equal(tokenLogs.length, 2)
        assert.equal(tokenLogs[0].toNumber(), 1)
        assert.equal(tokenLogs[1].toNumber(), 100)
    })

    it("Bob transfers 20 shares to Jack",  async function() {
        let res = await extendedToken.transfer(jack, 20, {from: bob})
        console.log("Gas used: ", res['receipt']['cumulativeGasUsed'])
        const jackBalance = await extendedToken.balanceOf.call(jack, {from: robot})
        assert.equal(jackBalance.toNumber(), 20)
        const bobBalance = await extendedToken.balanceOf.call(bob, {from: robot})
        assert.equal(bobBalance.toNumber(), 80)
        const bobTokenLogs = await extendedToken.getTokenCertificates(bob)
        assert.equal(bobTokenLogs.length, 2)
        assert.equal(bobTokenLogs[0].toNumber(), 1)
        assert.equal(bobTokenLogs[1].toNumber(), 80)
        const jackTokenLogs = await extendedToken.getTokenCertificates(jack)
        assert.equal(jackTokenLogs.length, 2)
        assert.equal(jackTokenLogs[0].toNumber(), 81)
        assert.equal(jackTokenLogs[1].toNumber(), 20)
    })

    it("Jack transfers 10 shares to Michal",  async function() {
        let res = await extendedToken.transfer(michal, 10, {from: jack})
        console.log("Gas used: ", res['receipt']['cumulativeGasUsed'])
        const jackBalance = await extendedToken.balanceOf.call(jack, {from: robot})
        assert.equal(jackBalance.toNumber(), 10)
        const michalBalance = await extendedToken.balanceOf.call(michal, {from: robot})
        assert.equal(michalBalance.toNumber(), 10)
        const michalTokenLogs = await extendedToken.getTokenCertificates(michal)
        assert.equal(michalTokenLogs.length, 2)
        assert.equal(michalTokenLogs[0].toNumber(), 91)
        assert.equal(michalTokenLogs[1].toNumber(), 10)
        const jackTokenLogs = await extendedToken.getTokenCertificates(jack)
        assert.equal(jackTokenLogs.length, 2)
        assert.equal(jackTokenLogs[0].toNumber(), 81)
        assert.equal(jackTokenLogs[1].toNumber(), 10)
    })
    it("Michal transfers 5 shares to Bob",  async function() {
        let res = await extendedToken.transfer(bob, 5, {from: michal})
        console.log("Gas used: ", res['receipt']['cumulativeGasUsed'])
        const bobBalance = await extendedToken.balanceOf.call(bob, {from: robot})
        assert.equal(bobBalance.toNumber(), 85)
        const michalBalance = await extendedToken.balanceOf.call(michal, {from: robot})
        assert.equal(michalBalance.toNumber(), 5)
        const michalTokenLogs = await extendedToken.getTokenCertificates(michal)
        assert.equal(michalTokenLogs.length, 2)        
        assert.equal(michalTokenLogs[0].toNumber(), 91)
        assert.equal(michalTokenLogs[1].toNumber(), 5)
        const bobTokenLogs = await extendedToken.getTokenCertificates(bob)
        assert.equal(bobTokenLogs.length, 4)        
        assert.equal(bobTokenLogs[0].toNumber(), 1)
        assert.equal(bobTokenLogs[1].toNumber(), 80)
        assert.equal(bobTokenLogs[2].toNumber(), 96)
        assert.equal(bobTokenLogs[3].toNumber(), 5)
    })
    it("Bob transfers 10 shares to Jack",  async function() {
        let res = await extendedToken.transfer(jack, 10, {from: bob})
        console.log("Gas used: ", res['receipt']['cumulativeGasUsed'])
        const jackBalance = await extendedToken.balanceOf.call(jack, {from: robot})
        assert.equal(jackBalance.toNumber(), 20)
        const bobBalance = await extendedToken.balanceOf.call(bob, {from: robot})
        assert.equal(bobBalance.toNumber(), 75)
        const jackTokenLogs = await extendedToken.getTokenCertificates(jack)
        assert.equal(jackTokenLogs.length, 6)        
        assert.equal(jackTokenLogs[0].toNumber(), 81)
        assert.equal(jackTokenLogs[1].toNumber(), 10)
        assert.equal(jackTokenLogs[2].toNumber(), 96)
        assert.equal(jackTokenLogs[3].toNumber(), 5)
        assert.equal(jackTokenLogs[4].toNumber(), 76)
        assert.equal(jackTokenLogs[5].toNumber(), 5)
        const bobTokenLogs = await extendedToken.getTokenCertificates(bob)
        assert.equal(bobTokenLogs.length, 2)        
        assert.equal(bobTokenLogs[0].toNumber(), 1)
        assert.equal(bobTokenLogs[1].toNumber(), 75)
    })
    it("Jack transfers 8 shares to Michal",  async function() {
        let res = await extendedToken.transfer(michal, 8, {from: jack})
        console.log("Gas used: ", res['receipt']['cumulativeGasUsed'])
        const jackBalance = await extendedToken.balanceOf.call(jack, {from: robot})
        assert.equal(jackBalance.toNumber(), 12)
        const michalBalance = await extendedToken.balanceOf.call(michal, {from: robot})
        assert.equal(michalBalance.toNumber(), 13)
        const jackTokenLogs = await extendedToken.getTokenCertificates(jack)
        assert.equal(jackTokenLogs.length, 4)        
        assert.equal(jackTokenLogs[0].toNumber(), 81)
        assert.equal(jackTokenLogs[1].toNumber(), 10)
        assert.equal(jackTokenLogs[2].toNumber(), 96)
        assert.equal(jackTokenLogs[3].toNumber(), 2)
        const michalTokenLogs = await extendedToken.getTokenCertificates(michal)
        assert.equal(michalTokenLogs.length, 6)        
        assert.equal(michalTokenLogs[0].toNumber(), 91)
        assert.equal(michalTokenLogs[1].toNumber(), 5)
        assert.equal(michalTokenLogs[2].toNumber(), 76)
        assert.equal(michalTokenLogs[3].toNumber(), 5)
        assert.equal(michalTokenLogs[4].toNumber(), 98)
        assert.equal(michalTokenLogs[5].toNumber(), 3)
    })

    it("Michal cannot transfer 14 shares to Bob",  async function() {
        let error
        try {
            await extendedToken.transfer(bob, 14, {from: michal})
        } catch (err) {
            error = err
        }
        assert.notEqual(error, undefined, 'Error must be thrown')
        const bobBalance = await extendedToken.balanceOf.call(bob, {from: robot})
        assert.equal(bobBalance.toNumber(), 75)
        const michalBalance = await extendedToken.balanceOf.call(michal, {from: robot})
        assert.equal(michalBalance.toNumber(), 13)
        const bobTokenLogs = await extendedToken.getTokenCertificates(bob)
        assert.equal(bobTokenLogs.length, 2)        
        assert.equal(bobTokenLogs[0].toNumber(), 1)
        assert.equal(bobTokenLogs[1].toNumber(), 75)

        const michalTokenLogs = await extendedToken.getTokenCertificates(michal)
        assert.equal(michalTokenLogs.length, 6)        
        assert.equal(michalTokenLogs[0].toNumber(), 91)
        assert.equal(michalTokenLogs[1].toNumber(), 5)
        assert.equal(michalTokenLogs[2].toNumber(), 76)
        assert.equal(michalTokenLogs[3].toNumber(), 5)
        assert.equal(michalTokenLogs[4].toNumber(), 98)
        assert.equal(michalTokenLogs[5].toNumber(), 3) 
    })

    it("Michal transfers 13 shares to Bob",  async function() {
        let res = await extendedToken.transfer(bob, 13, {from: michal})
        console.log("Gas used: ", res['receipt']['cumulativeGasUsed'])
        const bobBalance = await extendedToken.balanceOf.call(bob, {from: robot})
        assert.equal(bobBalance.toNumber(), 88)
        const michalBalance = await extendedToken.balanceOf.call(michal, {from: robot})
        assert.equal(michalBalance.toNumber(), 0)
        const bobTokenLogs = await extendedToken.getTokenCertificates(bob)
        assert.equal(bobTokenLogs.length, 8)        
        assert.equal(bobTokenLogs[0].toNumber(), 1)
        assert.equal(bobTokenLogs[1].toNumber(), 75)
        assert.equal(bobTokenLogs[2].toNumber(), 98)
        assert.equal(bobTokenLogs[3].toNumber(), 3)
        assert.equal(bobTokenLogs[4].toNumber(), 76)
        assert.equal(bobTokenLogs[5].toNumber(), 5)
        assert.equal(bobTokenLogs[6].toNumber(), 91)
        assert.equal(bobTokenLogs[7].toNumber(), 5)

        const michalTokenLogs = await extendedToken.getTokenCertificates(michal)
        assert.equal(michalTokenLogs.length, 0)        
    })

*/
})