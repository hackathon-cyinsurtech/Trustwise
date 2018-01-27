$(document).ready(function () {
    $("#inputGroupSelect01").change(function () {
        if (parseInt($("#inputGroupSelect01 option:selected")[0].value) === 1) {
            $("#inputGroupSelect02").parent().show();
        } else {
            $("#inputGroupSelect02").parent().hide();
            $("#inputGroupSelect03").parent().hide();
        }
    });
    
    $("#inputGroupSelect02").change(function () {
        if (parseInt($("#inputGroupSelect02 option:selected")[0].value) === 1) {
            $("#inputGroupSelect03").parent().show();
        } else {
            $("#inputGroupSelect03").parent().hide();
        }
    });
});