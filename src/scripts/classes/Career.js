// Career.js - The script containing the career object

/**
 * Career object - Containing information about a player's current and past jobs
 */
export default class Career {
    constructor(data = {}) {
        this.current = data.current ?? [];
        this.past = data.past ?? [];
    }
}
