// This script contains functions related to coding and calculating dates and time.
// This script is used in home.html and main.html.

// Function 1: convert_dict_date() - Converts library of dates into readable date or time
function convert_dict_date(input) {
    let year = input.year.toString();
    let month = input.month.toString();
    let day = input.day.toString();
    return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;
}

// Function 2: convert_calendar_date() - Converts the calendar input in the new 
// life overlay to readable date or time
function convert_calendar_date(input) {
    let unix = new Date(input);
    let year = unix.getFullYear().toString();
    let month = (unix.getMonth() + 1).toString();
    let day = unix.getDate().toString();
    return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;
}

// Function 3: convert_calendar_dict() - Converts the calendar input into library of dates
function convert_calendar_dict(input) {
    let unix = new Date(input);
    let year = unix.getFullYear();
    let month = unix.getMonth() + 1;
    let day = unix.getDate();
    return {
        year: year,
        month: month,
        day: day,
    };
}

// Function 4: code_mmdd() - Converts library of dates into MMDD code
function code_mmdd(input) {
    return input.month * 100 + input.day;
}

// Function 5: code_yddd() - Converts years and days of age into code
function code_yddd(input) {
    return input.years * 1000 + input.days;
}

// Function 6: date_add() - Adds a specified amount of days to the input date
function date_add(input, days) {
    unix_a = new Date(input.year + "/" + input.month + "/" + input.day);
    unix_b = new Date(unix_a.getTime() + days * 86400000 + 3600000);
    let year = unix_b.getFullYear();
    let month = unix_b.getMonth() + 1;
    let day = unix_b.getDate();
    return {
        year: year,
        month: month,
        day: day,
    };
}
// Function 7: date_next() - Finds when the next time this date will occur, 
// which is at least atLeast days in the future
function date_next(input, mmdd, atLeast) {
    if ((atLeast = null)) {
        atLeast == 0;
    }
    newInput = date_add(input, atLeast);
    if (mmdd > code_mmdd(newInput)) {
        return {
            year: newInput.year,
            month: Math.floor(mmdd / 100),
            day: mmdd % 100,
        };
    } else {
        return {
            year: newInput.year + 1,
            month: Math.floor(mmdd / 100),
            day: mmdd % 100,
        };
    }
}
