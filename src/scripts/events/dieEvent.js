// die.js - script containing die()

import misc from "../functions/misc.js";
import Life from "../classes/Life.js";

/**
 * Kills the player naturally.
 * 100% chance if the player has outlived their lifespan.
 * Very Important event.
 * @param {*} life - Required life input
 */
export function dieEvent(/** @type {Life} */life) {
    // Change life info
    life.status = 2;

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - I died due to natural causes. 
    I was aged ${life.age.years} years and ${life.age.days} days old when I died.`;
    life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) { console.log(diaryString); return; };
    window.progressing = false;
    misc.playAudio("death");
    misc.display("death_overlay", "block");
    const pronoun = life.gender === "m" ? "He" : "She";
    $("#death_age").html(`${pronoun} was at an age of ${life.age.years} years ${life.age.days} days.`);
    $("#death_died").html(`${life.name.first} ${life.name.last} has died on 
        ${life.date.format("dd/mm/yyyy")} due to natural causes.`);

}
