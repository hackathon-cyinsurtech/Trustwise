var factoryAddress = "0xbc12Fc8cE2E15f0c9Dd4d8Ab0e044DDdbE6E1b65";
var factoryAbi = [{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getCreated","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"created","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isP2PTempInsurance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_payout","type":"uint256"},{"name":"_temperature","type":"int32"},{"name":"_isTempBelow","type":"bool"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_sensorContract","type":"address"},{"name":"_description","type":"string"}],"name":"createP2PTempInsurance","outputs":[{"name":"","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"instantiation","type":"address"}],"name":"ContractInstantiation","type":"event"}]
var insuranceAbi = [{"constant":false,"inputs":[],"name":"withdrawExpired","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"FEES_PERCENTAGE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBid","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"premium","type":"uint256"}],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"paybackPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawPremium","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sensorContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lowestPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"temperature","outputs":[{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"expiredWithdrawn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lowestBidder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isTempBelow","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"FEES_RECIPIENT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"uint256"},{"name":"to","type":"uint256"}],"name":"checkConditions","outputs":[{"name":"_payed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"REPEATED_INFRACTIONS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_payout","type":"uint256"},{"name":"_temperature","type":"int32"},{"name":"_isTempBelow","type":"bool"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_sensorContract","type":"address"},{"name":"_description","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Bid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"PremiumWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"BidWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_address","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"ExpiredWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"PayedOut","type":"event"}]
var sensorAddress = "0xB5cB5ee604C4140997408B476E205D7cc8c9757E";
var sensorAbi = [{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"length","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"temperature","outputs":[{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_temperature","type":"int32"}],"name":"addTemperature","outputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_temperature","type":"int32"}],"name":"NewTemperature","type":"event"}];

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

  function getTransactionReceiptMined(txHash, interval) {
    const transactionReceiptAsync = function(resolve, reject) {
        web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
            if (error) {
                reject(error);
            } else if (receipt == null) {
                setTimeout(
                    () => transactionReceiptAsync(resolve, reject),
                    interval ? interval : 500);
            } else {
                resolve(receipt);
            }
        });
    };

    if (Array.isArray(txHash)) {
        return Promise.all(txHash.map(
            oneTxHash => web3.eth.getTransactionReceiptMined(oneTxHash, interval)));
    } else if (typeof txHash === "string") {
        return new Promise(transactionReceiptAsync);
    } else {
        throw new Error("Invalid Type: " + txHash);
    }
};

  async function getContractState(address) {
    var insuranceContract = web3.eth.contract(insuranceAbi);
    var instance = insuranceContract.at(address);
    var lowestBidder  = (await promisify(cb => instance.lowestBidder.call(cb)))
    var startTime     = (await promisify(cb => instance.startTime.call(cb))).toNumber()
    var endTime       = (await promisify(cb => instance.endTime.call(cb))).toNumber()
    var payed         = (await promisify(cb => instance.payed.call(cb)))
    now = Math.round(Date.now()/1000);
    console.log(lowestBidder);
    console.log(startTime);
    console.log(endTime);
    console.log(payed);
    console.log(now);
    if (payed) return 4 //trig
    if (now < startTime) return 1 //bidding
    if (lowestBidder == "0x0000000000000000000000000000000000000000" && now >= startTime) return 5 //canc
    if (now >= startTime && now <= endTime) return 2 //active
    return 3 //expired
  }

async function getAllInsurances() {
  var factoryContract = web3.eth.contract(factoryAbi);
  // instantiate by address
  var factory = factoryContract.at(factoryAddress);
  log = await promisify(cb => factory.ContractInstantiation({}, {fromBlock: 0, toBlock: 'latest'}).get(cb));
  var result = []
  for (var i in log) {
    temp = log[i].args
    temp = await getInsuranceData(log[i].args.instantiation, temp)
    result.push(temp)
  }
  return result
}

async function getInsuranceData(address, temp) {
    var insuranceContract = web3.eth.contract(insuranceAbi);
    var instance = insuranceContract.at(address);
    temp['payout']        = (await promisify(cb => instance.payout.call(cb))).toNumber()
    temp['lowestPremium'] = (await promisify(cb => instance.lowestPremium.call(cb))).toNumber()
    temp['startTime']     = (await promisify(cb => instance.startTime.call(cb))).toNumber()
    temp['endTime']       = (await promisify(cb => instance.endTime.call(cb))).toNumber()
    temp['temperature']   = (await promisify(cb => instance.temperature.call(cb))).toNumber()
    temp['isTempBelow']   = (await promisify(cb => instance.isTempBelow.call(cb)))
    temp['description']   = (await promisify(cb => instance.description.call(cb)))
    temp['owner']   = (await promisify(cb => instance.owner.call(cb)))
    return temp;
}

// async function placeBid() {
//   var address = $("#placeBid-address").val()
//   var bid = web3.toWei($("#bid").val())
//   var payout = web3.toWei($("#placeBid-payout").val())
//   var instance = insuranceContract.at(address);
//   console.log(address);
//   txHash = await promisify(cb => (instance.bid(bid,
//       {
//         from: web3.eth.accounts[0],
//         value: payout,
//         gasPrice: 22000000000,
//         gas: 1000000
//       }, cb
//     ))
//   )
//   console.log(txHash);
// }

$(document).ready(function(){


  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3 = new Web3(web3.currentProvider);
      // eth = new Eth(web3.currentProvider);
  } else {
      console.log('No web3? You should consider trying MetaMask!')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      eth = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }



  console.log("ready");

// ALEX CODE
// Dev phrase: granddad haiku uninsured cycle renewably gondola unburned enjoyer throwback gleaming employed grab

  // User
  // account = web3.eth.accounts[0];

  // Sensor
  // var sensorContractJson = require('./P2PTempInsuranceFactory.json');
  var sensorContract = web3.eth.contract(sensorAbi);
  // instantiate by address
  var sensor = sensorContract.at(sensorAddress);


  // Factory
  // var factoryContractJson = require('./P2PTempInsuranceFactory.json');
  // var factoryAddress = "0x3dF90A30312Ae2316Cd985e5BDee7b7eB2Dd23fE";
  var factoryContract = web3.eth.contract(factoryAbi);
  // instantiate by address
  var factory = factoryContract.at(factoryAddress);


  // Insurance
  // var insuranceContractJson = require('./P2PTempInsuranceFactory.json');
  // var insuranceAbi = [{"constant":false,"inputs":[],"name":"withdrawExpired","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"FEES_PERCENTAGE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBid","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"premium","type":"uint256"}],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"paybackPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawPremium","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sensorContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lowestPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"temperature","outputs":[{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"expiredWithdrawn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lowestBidder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isTempBelow","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"FEES_RECIPIENT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startPremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"uint256"},{"name":"to","type":"uint256"}],"name":"checkConditions","outputs":[{"name":"_payed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"REPEATED_INFRACTIONS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_payout","type":"uint256"},{"name":"_temperature","type":"int32"},{"name":"_isTempBelow","type":"bool"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_sensorContract","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Bid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"PremiumWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"BidWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_address","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"ExpiredWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"PayedOut","type":"event"}];
  var insuranceContract = web3.eth.contract(insuranceAbi);

  function web3_callback (error, result) {
    if (!error)
      console.log(result)
    else
      console.error(error);
  }

  function createNewInsurance() {
    $("#createContract").prop('disabled', true);
    var premium = web3.toWei($("#premium").val())
    var payout = web3.toWei($("#payout").val())
    var temp = $("#temp").val()
    var isTempBelow = $("#isTempBelow").is(':checked')
    var startTime = $('#startTime').data('epoch')
    var endTime = $('#endTime').data('epoch')
    var description = $("#description").val()
    console.log(premium)
    console.log(payout)
    console.log(temp)
    console.log(isTempBelow)
    console.log(startTime)
    console.log(endTime)
    console.log(description)
    promisify(cb => {
      return factory.createP2PTempInsurance.call(
        payout,
        temp,
        isTempBelow,
        startTime,
        endTime,
        sensorAddress,
        description,
        {
          from: web3.eth.accounts[0],
          value: premium,
          gasPrice: 22000000000
        }, cb
      )
    })
    .then(function (address) {
      promisify(cb => {return factory.createP2PTempInsurance(
          payout,
          temp,
          isTempBelow,
          startTime,
          endTime,
          sensorAddress,
          description,
          {
            from: web3.eth.accounts[0],
            value: premium,
            gasPrice: 22000000000
          }, cb
        )}
      ).then(txHash => {
        return getTransactionReceiptMined(txHash)
      }).
      then(recepient => {
        alert("Tx mined!")
        window.location = "/insurance.html/?hash=" + address
      })
    })

  }


  const promisify = (inner) =>
    new Promise((resolve, reject) =>
      inner((err, res) => {
        if (err) { reject(err) }
        resolve(res);
      })
    );

 async function placeBid() {
    var address = $("#bid-address").val()
    var bid = web3.toWei($("#bid-price").val())
    var payout = $("#bid-payout").val()
    var instance = insuranceContract.at(address);
    console.log(address);
    console.log(bid);
    console.log(payout);
    txHash = await promisify(cb => (instance.bid(bid,
        {
          from: web3.eth.accounts[0],
          value: payout,
          gasPrice: 22000000000,
          gas: 1000000
        }, cb
      ))
    ).then(txHash => {
      return getTransactionReceiptMined(txHash)
    }).
    then(recepient => {
      alert("Tx mined!")
      window.location = "/insurance.html/?hash=" + address
    })
    console.log(txHash);
  }

  async function withdrawPremium() {
    var address = $("#withdrawPremium-address").val()
    var instance = insuranceContract.at(address);
    txHash = await promisify(cb => (instance.withdrawPremium({},
        {
          from: web3.eth.accounts[0],
          gasPrice: 22000000000,
          gas: 1000000
        }, cb
      ))
    )
    console.log(txHash);
  }


  async function withdrawBid() {
    var address = $("#withdrawBid-address").val()
    var instance = insuranceContract.at(address);
    console.log(address)
    txHash = await promisify(cb => (instance.withdrawBid({},
        {
          from: web3.eth.accounts[0],
          gasPrice: 22000000000,
          gas: 1000000
        }, cb
      ))
    )
    console.log(txHash);
  }


  async function withdrawExpired() {
    var address = $("#withdrawExpired-address").val()
    var instance = insuranceContract.at(address);
    txHash = await promisify(cb => (instance.withdrawExpired({},
        {
          from: web3.eth.accounts[0],
          gasPrice: 22000000000,
          gas: 1000000
        }, cb
      ))
    )
    console.log(txHash);
  }

  async function getAddressBids() {
    var address = $("#addressBids-address").val()
    var instance = insuranceContract.at(address);
    log = await promisify(cb => instance.Bid({}, {fromBlock: 0, toBlock: 'latest'}).get(cb));
    result = []
    for (i in log) {
      result.push(log[i].args)
    }
    console.log(result);
    return result
  }

  async function getPayedOut() {
    var address = $("#payedout-address").val()
    var instance = insuranceContract.at(address);
    log = await promisify(cb => instance.PayedOut({}, {fromBlock: 0, toBlock: 'latest'}).get(cb));
    console.log(log.length == 1);
    return log.length == 1
  }


  async function stimulateSensor() {
    var temperature = $("#sensor-stimuli").val()
    txHash = await promisify(cb => (sensor.addTemperature(temperature,
        {
          from: web3.eth.accounts[0],
          gasPrice: 22000000000,
          gas: 1000000
        }, cb
      ))
    )
    console.log(txHash);
  }

  async function getTemperature() {
    log = await promisify(cb => sensor.NewTemperature({}, {fromBlock: 0, toBlock: 'latest'}).get(cb));
    result = []
    for (i in log) {
      blkNum = log[i].blockNumber
      block = await promisify(cb => web3.eth.getBlock(blkNum, cb))
      timestamp = block.timestamp
      result.push({
        temperature: log[i].args['_temperature'].toNumber(),
        timestamp: timestamp
      })
    }
    console.log(result);
    return result
  }


  async function getContractStateCaller() {
    var address = $("#contract-state-address").val()
    console.log(await getContractState(address))
  }

  async function checkConditions() {
    var from = 0
    var to = 100
    var address = $("#checkConditions-address").val()
    var instance = insuranceContract.at(address);
    txHash = await promisify(cb => (instance.checkConditions(
      from,
      to,
      {
        from: web3.eth.accounts[0],
        gasPrice: 22000000000,
        gas: 20000000
      }, cb
    )))
    console.log(txHash);
  }

  $("#createContract").on('click', createNewInsurance);
  $("#getAllInsurances").on('click', getAllInsurances);
  $("#placeBid").on('click', placeBid);
  $("#withdrawPremium").on('click', withdrawPremium);
  $("#withdrawBid").on('click', withdrawBid);
  $("#withdrawExpired").on('click', withdrawExpired);
  $("#getAddressBids").on('click', getAddressBids);
  $("#getPayedOut").on('click', getPayedOut);
  $("#stimulateSensor").on('click', stimulateSensor);
  $("#getTemperature").on('click', getTemperature);
  $("#getContractStateCaller").on('click', getContractStateCaller);
  $("#checkConditions").on('click', checkConditions);

});
