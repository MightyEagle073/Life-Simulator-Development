// Name.js - The script containing the name object

/**
 * Name Object - Containing information about a person's name
 */
export default class Name {
    constructor(data = {}) {
        this.first = data.first ?? "John";
        this.middle = data.middle ?? null;
        this.last = data.last ?? "Smith";
    }

    format(f) {
        if (f === "initials") { return this.first[0] + this.last[0]; }
        else { return this.first + " " + this.last; }
    }
}
