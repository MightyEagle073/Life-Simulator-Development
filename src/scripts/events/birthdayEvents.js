import Life from "../classes/Life.js";
import { majorBirthdayEvent } from "./birthday/majorBirthdayEvent.js";
import { minorBirthdayEvent } from "./birthday/minorBirthdayEvent.js";

/**
 * Celebrates the player's birthday.
 * 100% Chance if player’s birthday is today
 * Event of events.
 * @param {*} life - Required life input
 */
export function birthdayEvents(/** @type {Life} */life) {
    const majorBirthdays = [13, 18, 25, 40, 50, 60, 70, 80, 90, 100, 110];
    if (majorBirthdays.includes(life.age.years)) majorBirthdayEvent(life);
    else minorBirthdayEvent(life);
}
