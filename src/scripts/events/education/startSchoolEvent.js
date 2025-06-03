import Life from "../../classes/Life.js";
import misc from "../../functions/misc.js";
import { db } from "../../database/master.js";
import { EducationStatus } from "../../enums.js";

/**
 * Starts school for the player.
 * 100% chance if player can start school.
 * Crucial event.
 * @param {*} life - Required life input
 */
export function startSchoolEvent(/** @type {Life} */life) {
    // Change life data
    life.education.status = EducationStatus.ACTIVE;
    life.education.school = db.education.stages[0].schools[Math.floor(Math.random() * 20)];

    // Define variables
    const gradeName = db.education.stages[0].grades[0].name;

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - I started my first day of school at ` +
    `${life.education.school}, where I started ${gradeName}.`;
    life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    window.progressing = false;
    $("#notification_h2").html("Welcome to school!");
    $("#notification_p_1").html( `Your parents have enrolled you into ${life.education.school}, ` +
        `where you will be starting ${gradeName} from today. `);
    $("#notification_p_2").html("Study hard, get good grades and have a bright future!");
    $("#notification_image").attr("src", "assets/png/notification_education.png");
    misc.display("notification_h1", "none");
    misc.display("notification_h2", "block");
    misc.display("notification_h3", "none");
    misc.display("notification_p_1", "block");
    misc.display("notification_p_2", "block");
    misc.display("notification_overlay", "block");
}

/**
 * Determines if the player can start school.
 * @param {*} life - Required life input
 */
export function canStartSchool(/** @type {Life} */life) {
    // Needs to be the first day of school for the first grade
    const startDate = db.education.stages[0].grades[0].startDate;
    if (startDate !== life.date.getMini()) return false;

    // Player must not have started school
    if (life.education.status !== EducationStatus.NOT_STARTED) return false;

    // Player needs to be old enough to start school
    if (life.age.getCode() < db.education.enrolmentAge) return false;

    // Return true if all conditions met
    return true;
}
