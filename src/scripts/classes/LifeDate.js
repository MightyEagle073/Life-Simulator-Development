// LifeDate.js - The script containing the LifeDate object


/**
 * LifeDate object - Containing a date object with year, month and day fields
 */
export default class LifeDate {
    constructor(data = {}) {
        const native = new Date(data);
        const validNative = (!isNaN(native.getTime()));
        this.year = validNative ? native.getFullYear() : data.year ?? 1970;
        this.month = validNative ? native.getMonth() + 1 : data.month ?? 1;
        this.day = validNative ? native.getDate() : data.day ?? 1;
    }

    /**
     * Converts the date into a string with given format
     * @param {String} f - Format string (e.g. dd/mm/yyyy)
     * @returns Formatted date or error message
     */
    format(f) {
        // Check if there is a correct amount of y's, m's and d's in input string
        if (!f.includes("yyyy") && !f.includes("yy")) return "Invalid year";
        if (!f.includes("mm") && !f.includes("m")) return "Invalid month";
        if (!f.includes("dd") && !f.includes("d")) return "Invalid day";
        if ((f.match(/y/g)).length !== 2 && (f.match(/y/g)).length !== 4) return "Invalid year";
        if ((f.match(/m/g)).length !== 1 && (f.match(/m/g)).length !== 2) return "Invalid month";
        if ((f.match(/d/g)).length !== 1 && (f.match(/d/g)).length !== 2) return "Invalid day";

        // Replaces Strings
        if (f.includes("yyyy")) f = f.replace("yyyy", this.year);
        else if (f.includes("yy")) f = f.replace("yy", this.year.toString().slice(-2));
        if (f.includes("mm")) f = f.replace("mm", ("0" + this.month).slice(-2));
        else if (f.includes("m")) f = f.replace("m", this.month);
        if (f.includes("dd")) f = f.replace("dd", ("0" + this.day).slice(-2));
        else if (f.includes("d")) f = f.replace("d", this.day);

        // Final check and return
        if (f.includes("y")) return "Invalid year";
        if (f.includes("m")) return "Invalid month";
        if (f.includes("d")) return "Invalid day";
        return f;
    }

    /**
     * Adds a set amount of days to the current class
     * @param {Number} days - The amount of days to add, if negative, subtract
     */
    add(days) {
        const native = new Date(this.year, this.month - 1, this.day);
        native.setDate(native.getDate() + days);
        this.year = native.getFullYear();
        this.month = native.getMonth() + 1;
        this.day = native.getDate();
    }

    /**
     * Gets the 8 digit yyyymmdd code
     * @returns {Number}
     */
    getCode() {
        return parseInt(this.format("yyyymmdd"));
    }

    /**
     * Gets the 4 digit mmdd code
     * @returns {Number}
     */
    getMini() {
        return parseInt(this.month * 100 + this.day);
    }

    /**
     * Finds out when the next time an mmdd code occurs
     * @static
     * @param {Number} mmdd
     * @returns {LifeDate}
     */
    next(mmdd) {
        const output = new LifeDate(this);
        output.month = Math.floor(mmdd / 100);
        output.day = mmdd % 100;
        if (this.getMini() > mmdd) output.year++;
        return output;
    }
}
