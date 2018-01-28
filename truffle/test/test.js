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
            'DESCRIPTION',
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
})