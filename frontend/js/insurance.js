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
  address = getUrlParameter('address')
  payout = getUrlParameter('payout')
  lowestPremium = getUrlParameter('lowestPremium')
  startTime = getUrlParameter('startTime')
  endTime = getUrlParameter('endTime')
  temperature = getUrlParameter('temperature')
  isTempBelow = getUrlParameter('isTempBelow')

  function formatDate(epoch) {
    return new Date(epoch).toISOString().split('.')[0].replace('T', ' ')
  }

  $('#insurance-address').append('Address: ' + address)
  $('#insurance-payout').append('Payout: ' + payout + ' Ether')
  $('#insurance-lowestPremium').append('Current Premium: ' + lowestPremium + ' Ether')
  $('#insurance-startTime').append('Start: ' + formatDate(startTime*1000))
  $('#insurance-endTime').append('End: ' + formatDate(endTime*1000))
  $('#insurance-temperature').append('Condition: ' + (isTempBelow ? 'Below ' : 'Above ') + temperature + '°C')

})
