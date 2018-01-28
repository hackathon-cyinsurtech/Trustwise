
var statusCode = {
    1: "Bidding",
    2: "Active",
    3: "Expired",
    4: "Triggered",
    5: "Cancelled"
};

function formatDate(epoch) {
  return new Date(epoch).toISOString().split('.')[0].replace('T', ' ')
}

$(document).ready(function () {
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  };


  address = getUrlParameter('hash')
  debug = getUrlParameter('debug')

  getInsuranceData(address, [])
  .then(function (temp) {
    payout = temp.payout
    lowestPremium = temp.lowestPremium
    startTime = temp.startTime
    endTime = temp.endTime
    temperature = temp.temperature
    isTempBelow = temp.isTempBelow
    description = temp.description
    console.log(temp)


    $('#insurance-title').append('Insurance')
    $('#insurance-subtitle').append(description)
    $('#insurance-address').append('Address: ' + address)
    $('#insurance-payout').append('Payout: ' + web3.fromWei(payout) + ' Ether')
    $('#insurance-lowestPremium').append('Current Premium: ' + web3.fromWei(lowestPremium) + ' Ether')
    $('#insurance-startTime').append('Start: ' + formatDate(startTime*1000))
    $('#insurance-endTime').append('End: ' + formatDate(endTime*1000))
    $('#insurance-temperature').append('Condition: ' + (isTempBelow ? 'Below ' : 'Above ') + temperature + '°C')
    $('#insurance-description').append('Description: ' + description)


    step=0.00001
    $('#bid-price').attr({
      max: lowestPremium - step
    })
    console.log(address);
    $('#bid-address').val(address)
    $('#bid-payout').val(payout)
    $('#withdrawBid-address').val(address)
    $('#withdrawExpired-address').val(address)
    $('#withdrawPremium-address').val(address)
    $('#checkConditions-address').val(address)
  })

  getContractState(address)
  .then(function(res) {
    $('#insurance-status').append('Status: ' + statusCode[res])
    if (debug) {
      $('#withdrawExpired-top').show()
      $('#withdrawPremium-top').show()
      $('#placeBid-top').show()
    } else {
      switch (res) {
        case 1:     // Bidding
          $('#withdrawExpired-top').hide()
          $('#withdrawPremium-top').hide()
          $('#placeBid-top').show()
          break
        case 2:     // Active
          $('#withdrawExpired-top').hide()
          $('#withdrawPremium-top').show()
          $('#placeBid-top').hide()
          break
        case 3:     // Expired
          $('#withdrawExpired-top').show()
          $('#withdrawPremium-top').show()
          $('#placeBid-top').hide()
          break
        case 4:     // Triggered
          $('#withdrawExpired-top').hide()
          $('#withdrawPremium-top').show()
          $('#placeBid-top').hide()
          break
        case 5:     // Cancelled
          $('#withdrawExpired-top').hide()
          $('#withdrawPremium-top').show()
          $('#placeBid-top').hide()
          break
        default:
          console.error('Should never reach this case')
          console.error(res)
          break
      }
    }
  }).catch(function (err) {
    console.error(err)
    window.location = "/";
  })

})
