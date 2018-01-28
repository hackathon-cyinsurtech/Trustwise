function getDuration (seconds) {
    if (seconds<60) return seconds.toString() + " second(s)"
    if (seconds<60*60) return Math.floor(seconds/60).toString() + " minute(s)"
    if (seconds<60*60*24) return Math.floor(seconds/60/60).toString() + " hour(s)"
    if (seconds<60*60*24*365) return Math.floor(seconds/60/60/24).toString() + " month(s)"
    return Math.floor(seconds/60/60/24/365).toString() + " year(s)"
}

var statusEnum = {
    1: {class: "list-group-item-primary", name: "bidding"},
    2: {class: "list-group-item-success", name: "active"},
    3: {class: "list-group-item-warning", name: "ended"},
    4: {class: "list-group-item-danger", name: "triggered"},
    5: {class: "list-group-item-dark", name: "expired"}
};

function createInsuranceListItem(hash, status, premium, payout, start, end, description, isBelow, temp) {
    var newListItem = '';
    newListItem += '<a href="/insurance.html?hash=' + hash + '"';
    newListItem += ' class="list-group-item list-group-item-action ' + statusEnum[status].class;
    newListItem += ' flex-column align-items-start"> <h5 class="mb-1 ml-auto mr-auto text-center">' + description;
    newListItem += '</h5> <div class="d-flex w-100 justify-content-between"> <h5 class="mb-1">status<span class="badge badge-light ml-1 mr-1">' + statusEnum[status].name;
    newListItem += '</span></h5> <h5>start:<span class="badge badge-light ml-1 mr-1">' + new Date(start).toISOString().split('.')[0].replace('T', ' ');
    newListItem += '</span></h5> </div><div class="d-flex w-100 justify-content-between"> <h5 class="mb-1">premium:<span class="badge badge-info ml-1 mr-1">' + premium + ' ETH';
    newListItem += '</span></h5> <h5 class="mb-1">trigger:<span class="badge badge-info ml-1 mr-1">' + (isBelow ? "below " : "above ") + temp
    newListItem += '</span></h5> <h5>duration:<span class="badge badge-light ml-1 mr-1">' + getDuration(end-start);
    newListItem += '</span></h5> </div><div class="d-flex w-100 justify-content-between"> <h5 class="mb-1">payout:<span class="badge badge-info ml-1 mr-1">' + payout + ' ETH';
    newListItem += '</span></h5> <h5>end:<span class="badge badge-light ml-1 mr-1">' + new Date(end).toISOString().split('.')[0].replace('T', ' ');
    newListItem += '</span></h5> </div></a>';

    console.log(newListItem);

    $(".list-group").append(newListItem);
}

$(document).ready(function() {
  getAllInsurances().then(vv => {
    console.log(vv);
    vv.forEach(v => {
      createInsuranceListItem(v.instantiation, 1, web3.fromWei(v.lowestPremium), web3.fromWei(v.payout), v.startTime, v.endTime, "asrdase", v.isTempBelow, v.temperature)
    })
  })
});
