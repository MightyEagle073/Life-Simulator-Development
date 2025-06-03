// Period.js - The script containing the period object

import LifeDate from "./LifeDate.js";

/**
 * Period object - Containing a date object with year, month and day fields
 */
export default class Period {
    constructor(data = {}, data2) {
        try {
            // Get earlier/later year
            let earlier = data.getCode() < data2.getCode() ? data : data2;
            const later = data.getCode() >= data2.getCode() ? data : data2;

            // Calculate years
            let years = 0;
            while (years < 9999) {
                const newEarlier = new LifeDate(earlier);
                newEarlier.year++;
                if (newEarlier.getCode() > later.getCode()) break;
                earlier = newEarlier;
                years++;
            }
            this.years = years;

            // Calculate days
            const nativeA = Date.UTC(earlier.year, earlier.month - 1, earlier.day);
            const nativeB = Date.UTC(later.year, later.month - 1, later.day);
            let days = 0;
            days = (nativeB - nativeA) / 86400000;
            this.days = days;
        } catch {
            this.years = data.years ?? 0;
            this.days = data.days ?? 0;
        }
    }

    getCode() {
        return this.years * 1000 + this.days;
    }

    getYears() {
        return this.years + (this.days / 365);
    }
}
