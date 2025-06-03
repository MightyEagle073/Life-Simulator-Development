// Financials.js - The script containing the financials object

import Money from "./Money.js";

/**
 * Financials object - Containing information about a player's financial details, such as balance,
 * net worth and loans
 */
export default class Financials {
    constructor(data = {}) {
        this.balance = data.balance ? new Money(data.balance) : new Money();
        this.netWorth = data.netWorth ? new Money(data.netWorth) : new Money();
    }
}
