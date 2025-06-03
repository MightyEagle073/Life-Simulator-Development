// Money.js - The script containing the money object

/**
 * Money object - An object containing the amount of money in question, with the number and the
 * currency
 */
export default class Money {
    constructor(data = {}) {
        this.amount = data.amount ?? 0.0;
        this.currency = data.currency ?? "aud";
    }

    /**
     * Converts object into its string format
     * @returns {string} - Formatted text of the money
     */
    format() { return `$${this.amount}`; }
}
