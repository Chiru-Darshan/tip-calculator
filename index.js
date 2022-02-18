// Initialization
$('input[type="radio"]:checked').prop('checked', false);


const resetValues = () => {
    $('.tip-amount').prop('innerText', "0.00")
    $('.total-amount').prop('innerText', "0.00")
    $('input[type="radio"]:checked').prop('checked', false);
    $('input[name="bill"]').val("0.00")
    $('input[name="person"]').val("1")
    $('#custom').val("Custom")
    $('.tip-button').removeClass("active-btn")
}

const calculateTip = () => {

    const radioChecked = $('input[name="tip"]:checked').length !== 0;


    if ((radioChecked || $('#custom').val().trim().length !== 0) && $(
            'input[name="person"]').val().trim().length !== 0 && $('input[name="bill"]').val().trim()
        .length !== 0 && parseInt($('input[name="person"]').val()) !== 0) {
        const person = parseFloat($('input[name="person"]').val())
        let bill = parseFloat($('input[name="bill"]').val())
        let tip = radioChecked ? $('input[name="tip"]:checked').val() : $('#custom').val();
        tip = parseFloat(tip)


        const tipAmt = ((tip / 100) * bill);

        const tipPerPerson = tipAmt / person

        bill += parseFloat(tipAmt)
        const total = ((bill) / person)

        $('.tip-amount').prop('innerText', tipPerPerson.toFixed(2).toString())
        $('.total-amount').prop('innerText', total.toFixed(2).toString())
    } else {
        $('.tip-amount').prop('innerText', "0.00")
        $('.total-amount').prop('innerText', "0.00")
    }


}


$('input[type="radio"]').click((event) => {
    $('.tip-button').removeClass("active-btn")

    $('input[name="tip"]:checked').parent().addClass("active-btn")

})

$('#custom').focus(() => {
    $('.tip-button').removeClass("active-btn")
    $('input[type="radio"]:checked').prop('checked', false);
})

$('input[name="bill"]').on("input", () => {
    calculateTip()
})
$('input[name="person"]').on("input", (event) => {
    calculateTip()
})

$('#custom').on("input", () =>
    calculateTip()
)
$('input[type="radio"]').change(() => calculateTip())

$('input[name="person"]').on("input", function () {
    if (parseInt($('input[name="person"]').val()) === 0) {
        $('input[name="person"]')[0].setCustomValidity("Please Enter at least one person");
        $('input[name="person"]')[0].reportValidity();
        $('input[name="person"]').val("");

    }
});

$('input[name="bill"]').on("input", function () {
    if (parseInt($('input[name="bill"]').val()) === 0) {
        $('input[name="bill"]')[0].setCustomValidity("Please Enter valid amount");
        $('input[name="bill"]')[0].reportValidity()
        $('input[name="bill"]').val("")
    }
});

$('#custom').on("input", function () {
    if (parseInt($('#custom').val()) === 0) {
        $('#custom')[0].setCustomValidity("Please Enter at least one percent");
        $('#custom')[0].reportValidity()
        $('#custom').val("")
    }
});