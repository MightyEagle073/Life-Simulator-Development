// Health.js - The script containing the health object

import Period from "./Period.js";

/**
 * Health object - Information about the player's current health
 */
export default class Health {
    constructor(data = {}) {
        this.lifespan = data.lifespan ? new Period(data.lifespan) : Health.valueToLifespan(Math.random());
    }

    /**
     * Converts a number between 0 to 1 into a human lifespan
     * @param {Float} value - A float between 0 to 1, with 0 being shortest lifespan, and 1 being the longest
     * @returns {Period} - The lifespan for the person
     */
    static valueToLifespan(value) {
        const points = [
            [0.00, 65], [0.25, 75], [0.50, 80], [0.75, 90], [0.90, 100], [0.99, 110], [1.00, 120]
        ];

        for (let i = 0; i < points.length - 1; i++) {
            if (value >= points[i][0] && value <= points[i + 1][0]) {
                const slope = (points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0]);
                const yearsFloat = points[i][1] + (value - points[i][0]) * slope;
                return new Period({ years: Math.floor(yearsFloat), days: Math.floor(yearsFloat % 1 * 365) });
            }
        }
    }
}
