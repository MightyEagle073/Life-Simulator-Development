import Life from "../../classes/Life.js";
import misc from "../../functions/misc.js";
import { db } from "../../database/master.js";
import { EducationStatus, DiaryLogging, GameSpeed } from "../../enums.js";

/**
 * Ends grade for the player.
 * 100% chance if player can end grade.
 * Important event.
 * @param {*} life - Required life input
 */
export function endGradeEvent(/** @type {Life} */life) {
    // Change life data
    life.education.status = EducationStatus.ON_HOLIDAY;

    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;
    const gradeName = db.education.stages[currentStage].grades[currentGrade].name;
    const nextGradeName = db.education.stages[currentStage].grades[currentGrade + 1].name;
    const nextStartMMDD = db.education.stages[currentStage].grades[currentGrade + 1].startDate;
    const nextStartDate = life.date.next(nextStartMMDD).format("dd/mm/yyyy");
    const marksRounded = Math.round(life.education.marks * 100) / 100;

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - ` +
        `I finished ${gradeName} with a mark of ${marksRounded}%.`;
    const log = (misc.getData().settings.diaryLogging > DiaryLogging.MEDIUM);
    if (!window.life || log) life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    else if (misc.getData().settings.gameSpeed > GameSpeed.MEDIUM) return;
    window.progressing = false;
    $("#notification_h2").html("That's a wrap!");
    $("#notification_p_1").html(`You have completed ${gradeName} with a mark of ${marksRounded}%.`);
    $("#notification_p_2").html(`Enjoy your holidays, and start ${nextGradeName} on ${nextStartDate}.`);
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
export function canEndGrade(/** @type {Life} */life) {
    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;

    // Current grade must not be last grade
    const numberOfGrades = db.education.stages[currentStage].grades.length;
    if (currentGrade + 1 === numberOfGrades) return false;

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
