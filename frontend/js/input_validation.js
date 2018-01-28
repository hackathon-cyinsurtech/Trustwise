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

    $('#startTime').daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "timePickerSeconds": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "locale": {
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            "firstDay": 1
        },
        "format": "X",
        "opens": "center"
    }, function(start, end, label) {
    console.log('Start date selected: ' + start.format('X'));
    });

    $('#endTime').daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "timePickerSeconds": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "locale": {
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            "firstDay": 1
        },
        "format": "X",
        "opens": "center"
    }, function(start, end, label) {
    console.log('Start date selected: ' + start.format('X'));
    });

    $("#premium").keyup(function() {
        var prem = +($(this).val());
        var tot = Math.round(100000*(prem*100)/93)/100000;

        $("#total").val(tot);
    });

    $("#total").keyup(function() {
        var tot = +($(this).val());
        var prem = Math.round(100000*(tot*93)/100)/100000;

        $("#premium").val(prem);
    });

});
