import Life from "../../classes/Life.js";
import misc from "../../functions/misc.js";
import { db } from "../../database/master.js";
import { EducationStatus } from "../../enums.js";

/**
 * Ends grade for the player.
 * 100% chance if player can end grade.
 * Crucial event.
 * @param {*} life - Required life input
 */
export function endSchoolEvent(/** @type {Life} */life) {
    // Change life data
    life.education.status = EducationStatus.GRADUATED;

    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;
    const gradeName = db.education.stages[currentStage].grades[currentGrade].name;
    const marksRounded = Math.round(life.education.marks * 100) / 100;

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - I graduated at ${life.education.school}. ` +
        `My mark at ${gradeName} was ${marksRounded}%.`;
    life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    window.progressing = false;
    $("#notification_h2").html("Onwards!");
    $("#notification_p_1").html( `You have graduated at ${life.education.school}! ` +
        `Your mark at ${gradeName} was ${marksRounded}%.`);
    $("#notification_p_2").html("With that, your schooling career is finished. Time to find a job!");
    $("#notification_image").attr("src", "assets/png/notification_education.png");
    misc.display("notification_h1", "none");
    misc.display("notification_h2", "block");
    misc.display("notification_h3", "none");
    misc.display("notification_p_1", "block");
    misc.display("notification_p_2", "block");
    misc.display("notification_overlay", "block");
    misc.playAudio("education_graduation_school");
}

/**
 * Determines if the player can start school.
 * @param {*} life - Required life input
 */
export function canEndSchool(/** @type {Life} */life) {
    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;

    // Current grade must be last grade
    const numberOfGrades = db.education.stages[currentStage].grades.length;
    if (currentGrade + 1 !== numberOfGrades) return false;

    // Current grade must be last stage
    const numberOfStages = db.education.stages.length;
    if (currentStage + 1 !== numberOfStages) return false;

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
