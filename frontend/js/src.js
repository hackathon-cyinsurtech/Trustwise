$(document).ready(function(){
  window.addEventListener('load', function () {

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
          // Use Mist/MetaMask's provider
          web3js = new Web3(web3.currentProvider);
      } else {
          console.log('No web3? You should consider trying MetaMask!')
          // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
          web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }

      // Now you can start your app & access web3 freely:
      startApp()

  });
  console.log("ready");
  web3.version.getNetwork((err, netId) => {
      switch (netId) {
          case "1":
          console.log('This is mainnet')
          break
          case "2":
          console.log('This is the deprecated Morden test network.')
          break
        case "3":
        console.log('This is the ropsten test network.')
          break
          case "4":
          console.log('This is the Rinkeby test network.')
          break
          case "42":
          console.log('This is the Kovan test network.')
          break
          default:
          console.log('This is an unknown network.')
      }
  })












// ALEX CODE
// Dev phrase: granddad haiku uninsured cycle renewably gondola unburned enjoyer throwback gleaming employed grab

  // User
  account = web3.eth.accounts[0];

  // Sensor
  // var sensorContractJson = require('./P2PTempInsuranceFactory.json');
  var sensorAddress = "0x62613DbC33E793075B59d56F26B2eADF43D99687";
  var sensorAbi = [{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"length","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"temperature","outputs":[{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_temperature","type":"int32"}],"name":"addTemperature","outputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_temperature","type":"int32"}],"name":"NewTemperature","type":"event"}];
  var sensorContract = web3.eth.contract(sensorAbi);
  // instantiate by address
  var sensor = sensorContract.at(sensorAddress);


  // Factory
  // var factoryContractJson = require('./P2PTempInsuranceFactory.json');
  var factoryAddress = "0x3dF90A30312Ae2316Cd985e5BDee7b7eB2Dd23fE";
  var factoryAbi = [{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getCreated","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"created","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_payout","type":"uint256"},{"name":"_temperature","type":"int32"},{"name":"_isTempBelow","type":"bool"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_sensorContract","type":"address"}],"name":"createP2PTempInsurance","outputs":[{"name":"","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isP2PTempInsurance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"instantiation","type":"address"}],"name":"ContractInstantiation","type":"event"}];
  var factoryContract = web3.eth.contract(factoryAbi);
  // instantiate by address
  var factory = factoryContract.at(factoryAddress);


  // Insurance
  // var insuranceContractJson = require('./P2PTempInsuranceFactory.json');
  var insuranceAbi = [{"constant":false,"inputs":[],"name":"withdrawExpired","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"FEES_PERCENTAGE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBid","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"premium","type":"uint256"}],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"paybackPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawPremium","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sensorContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lowestPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"temperature","outputs":[{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"expiredWithdrawn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lowestBidder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isTempBelow","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"FEES_RECIPIENT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"uint256"},{"name":"to","type":"uint256"}],"name":"checkConditions","outputs":[{"name":"_payed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"REPEATED_INFRACTIONS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_payout","type":"uint256"},{"name":"_temperature","type":"int32"},{"name":"_isTempBelow","type":"bool"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_sensorContract","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Bid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"PremiumWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"BidWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_address","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"ExpiredWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"PayedOut","type":"event"}];
  var insuranceContract = web3.eth.contract(insuranceAbi);

  function web3_callback (error, result) {
    if (!error)
      console.log(result)
    else
      console.error(error);
  }

  function createNewInsurance() {
    var premium = 1000000;
    var payout = 10000000;
    var temp = 3;
    var isTempBelow = 1;
    var startTime = 1517003553;
    var endTime = startTime + 100;


    // _payout=payout,
    // _temperature=temp,
    // _isTempBelow=isTempBelow,
    // _startTime=startTime,
    // _endTime=endTime,
    // _sensorContract=sensorAddress,


    factory.createP2PTempInsurance(
      payout,
      temp,
      isTempBelow,
      startTime,
      endTime,
      sensorAddress,
      {
        // data: '0x12345...',
        from: account,
        value: premium,
        // gas: 220000
        gasPrice: 22000000000
      }, web3_callback
    )
  }

  $("#createContract").on('click', createNewInsurance);





  // // deploy new contract
  // var contractInstance = factoryContract.new([constructorParam1] [, constructorParam2], {data: '0x12345...', from: myAccount, gas: 1000000});

  // // Get the data to deploy the contract manually
  // var contractData = factoryContract.new.getData([constructorParam1] [, constructorParam2], {data: '0x12345...'});
  // // contractData = '0x12345643213456000000000023434234'



  // contract.myMethod.call()
});
