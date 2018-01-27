$(document).ready(function () {

    $('#inputGroupSelect01').val(0)
    $('#inputGroupSelect02').val(0)
    $('#inputGroupSelect03').val(0)
    $("#inputGroupSelect01").parent().show()
    $("#inputGroupSelect02").parent().hide()
    $("#inputGroupSelect03").parent().hide()
    $("#new-contract-card").hide()

    $("#inputGroupSelect01").change(function () {
        if (parseInt($("#inputGroupSelect01 option:selected")[0].value) === 1) {
            $("#inputGroupSelect02").parent().show();
        } else {
            $("#inputGroupSelect02").parent().hide();
            $("#inputGroupSelect03").parent().hide();
            $("#new-contract-card").hide();
        }
    });

    $("#inputGroupSelect02").change(function () {
        if (parseInt($("#inputGroupSelect02 option:selected")[0].value) === 1) {
            $("#inputGroupSelect03").parent().show();
        } else {
            $("#inputGroupSelect03").parent().hide();
            $("#new-contract-card").hide();
        }
    });

    $("#inputGroupSelect03").change(function () {
        if (parseInt($("#inputGroupSelect03 option:selected")[0].value) === 1) {
            $("#new-contract-card").show();
        } else {
            $("#new-contract-card").hide();
        }
    });

});
