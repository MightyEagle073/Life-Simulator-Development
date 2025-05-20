// This script contains functions related to coding and calculating dates and time.

export default class dates {
    // Function 1: convert_dict_date() - Converts library of dates into readable date or time
    static convert_dict_date(input) {
        let year = input.year.toString();
        let month = input.month.toString();
        let day = input.day.toString();
        return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;
    }

    // Function 2: convert_calendar_date() - Converts the calendar input in the new 
    // life overlay to readable date or time
    static convert_calendar_date(input) {
        let unix = new Date(input);
        let year = unix.getFullYear().toString();
        let month = (unix.getMonth() + 1).toString();
        let day = unix.getDate().toString();
        return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;
    }

    // Function 3: convert_calendar_dict() - Converts the calendar input into library of dates
    static convert_calendar_dict(input) {
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
    static code_mmdd(input) {
        return input.month * 100 + input.day;
    }

    // Function 5: code_yddd() - Converts years and days of age into code
    static code_yddd(input) {
        return input.years * 1000 + input.days;
    }

    // Function 6: date_add() - Adds a specified amount of days to the input date
    static add(input, days) {
        const unixA = new Date(input.year + "/" + input.month + "/" + input.day);
        const unixB = new Date(unixA.getTime() + days * 86400000 + 3600000);
        const year = unixB.getFullYear();
        const month = unixB.getMonth() + 1;
        const day = unixB.getDate();
        return {
            year: year,
            month: month,
            day: day,
        };
    }

    /**
     * Finds the next occurrence of a given MMDD code (i.e the next time this date will happen),
     * ensuring that it is at least a certain amount of days in the future (if provided).
     * @static
     * @param {*} input
     * @param {int} mmdd
     * @param {*} atLeast
     * @returns {{ year: int; month: int; day: int; }}
     */
    static next(input, mmdd, atLeast) {
        const minimum = atLeast ?? 0;
        const newInput = this.add(input, minimum);
        if (mmdd > this.code_mmdd(newInput)) {
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
}
