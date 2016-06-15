function isNotEmpty(s) {
    return s !== "";
}

function isInt(s) {
    return /^\d+$/.test(s);
}

function isIntWithMinVal(s, v) {
    return /^\d+$/.test(s) && parseInt(s) >= v;
}

function isIntWithMaxVal(s, v) {
    return /^\d+$/.test(s) && parseInt(s) <= v;
}

function isIntWithMinMaxVal(s, v1, v2) {
    return /^\d+$/.test(s) && parseInt(s) >= v1 && parseInt(s) <= v2;
}

function showAlert(msg, type) {
    $.bootstrapGrowl(msg, {
        ele: 'body',
        type: type,
        offset: {from: 'top', amount: 10},
        align: 'center', 
        width: "auto",
        delay: 4000, 
        allow_dismiss: true,
        stackup_spacing: 10
    });
}

function toggleDisabled(elem, disabled) {
    if (disabled) {
        elem.addClass("disabled");
    }
    else {
        elem.removeClass("disabled");
    }
    elem.prop("disabled", disabled);
}
