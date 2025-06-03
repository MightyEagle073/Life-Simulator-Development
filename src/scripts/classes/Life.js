// Life.js - The script containing the life object, which contains essentially every bit of
// information about the current game that is going on.

import { LifeStatus, Gender } from "../enums.js";

// Class imports
import LifeDate from "./LifeDate.js";
import Name from "./Name.js";
import Period from "./Period.js";
import Education from "./Education.js";
import Career from "./Career.js";
import Financials from "./Financials.js";
import Skills from "./Skills.js";
import Health from "./Health.js";

// Function imports
import htmlUpdate from "../functions/htmlUpdate.js";
import control from "../functions/control.js";
import misc from "../functions/misc.js";

// Event imports

import { birthdayEvents } from "../events/birthdayEvents.js";
import { educationEvents } from "../events/educationEvents.js";
import { dieEvent } from "../events/dieEvent.js";

/**
 * Life Object - containing all information about a player's current life
 */
export default class Life {
    constructor(data = {}) {
        const birthdayData = data.birthday ?? data.date;
        this.status = data.status ?? LifeStatus.ALIVE;
        this.date = data.date ? new LifeDate(data.date) : new LifeDate();
        this.name = data.name ? new Name(data.name) : new Name();
        this.age = data.age ? new Period(data.age): new Period();
        this.gender = data.gender ?? Gender.MALE;
        this.birthday = birthdayData ? new LifeDate(birthdayData) : new LifeDate();
        this.diary = data.diary ?? [];
        this.education = data.education ? new Education(data.education) : new Education();
        this.career = data.career ? new Career(data.career) : new Career();
        this.financials = data.financials ? new Financials(data.financials) : new Financials();
        this.skills = data.skills ? new Skills(data.skills) : new Skills();
        this.health = data.skills ? new Health(data.health) : new Health();
    }

    /**
     * Progresses the life by one day
     * https://docs.google.com/document/d/1dsxPD7rZSmUrtbqPG2hVWQzgYPiTqTglBCfK-zawc5o/edit?usp=sharing
     */
    progress() {
        // Do not do anything if player is already dead
        if (this.status === 2) return;

        // Close any open notifications
        misc.display("notification_overlay", "none");

        // Determines the events that happen today
        this.date.add(1);
        this.age = new Period(this.birthday, this.date);
        if (this.age.days === 0) birthdayEvents(this);
        educationEvents(this);
        if (this.age.getCode() >= this.health.lifespan.getCode()) dieEvent(this);

        // Browser specific actions
        if (!window.life) return;
        if (!window.progressing) control.pause(); // Pause if progressing is set to false
        htmlUpdate(); // Update HTML with new information
    }
}
