import Life from "../../classes/Life.js";
import misc from "../../functions/misc.js";
import { db } from "../../database/master.js";
import { EducationStatus, GameSpeed } from "../../enums.js";

/**
 * Ends grade for the player.
 * 100% chance if player can end grade.
 * Crucial event.
 * @param {*} life - Required life input
 */
export function endStageEvent(/** @type {Life} */life) {
    // Change life data
    life.education.status = EducationStatus.ON_HOLIDAY;

    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;
    const gradeName = db.education.stages[currentStage].grades[currentGrade].name;
    const nextGradeName = db.education.stages[currentStage + 1].grades[0].name;
    const nextStartMMDD = db.education.stages[currentStage + 1].grades[0].startDate;
    const nextStartDate = life.date.next(nextStartMMDD).format("dd/mm/yyyy");
    const marksRounded = Math.round(life.education.marks * 100) / 100;

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - I graduated at ${life.education.school}. ` +
    `My mark at ${gradeName} was ${marksRounded}%.`;
    life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    window.progressing = false;
    $("#notification_h2").html("Farewell, old friends!");
    $("#notification_p_1").html( `You have graduated at ${life.education.school}! ` +
        `Your mark at ${gradeName} was ${marksRounded}%.`);
    $("#notification_p_2").html($("#notification_p_2").html("Enjoy your holidays, and you will be enrolled" +
        `into a new school on ${nextStartDate}, where you'll be starting ${nextGradeName}.`));
    $("#notification_image").attr("src", "assets/png/notification_education.png");
    misc.display("notification_h1", "none");
    misc.display("notification_h2", "block");
    misc.display("notification_h3", "none");
    misc.display("notification_p_1", "block");
    misc.display("notification_p_2", "block");
    misc.display("notification_overlay", "block");
    misc.playAudio("education_graduation_stage");
}

/**
 * Determines if the player can start school.
 * @param {*} life - Required life input
 */
export function canEndStage(/** @type {Life} */life) {
    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;

    // Current grade must be last grade
    const numberOfGrades = db.education.stages[currentStage].grades.length;
    if (currentGrade + 1 !== numberOfGrades) return false;

    // Current grade must not be last stage
    const numberOfStages = db.education.stages.length;
    if (currentStage + 1 === numberOfStages) return false;

    // Needs to be the last day of school for the current grade
    const endDate = db.education.stages[currentStage].grades[currentGrade].endDate;
    if (endDate !== life.date.getMini()) return false;

    // Player must be in school
    if (life.education.status !== EducationStatus.ACTIVE) return false;

    // Player must have attended at least 100 days of school
    if (life.education.daysAttended < 100) return false;

    // Return true if all conditions met
    return true;
}
