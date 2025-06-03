// DiaryEntry.js - The script containing the diary entry object

import LifeDate from "./LifeDate.js";

/**
 * DiaryEntry Object - Contains every single diary entry of the person
 */

export default class DiaryEntry {
    constructor(data = {}) {
        this.date = data.date ? new LifeDate(data.date) : new LifeDate();
        this.text = data.text ? new Text(data.text) : new Text();
    }
}
