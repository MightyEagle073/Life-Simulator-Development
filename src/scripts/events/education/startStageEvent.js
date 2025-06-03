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
export function startStageEvent(/** @type {Life} */life) {
    // Change life data
    life.education.stage++;
    life.education.grade = 0;
    life.education.daysAttended = 0;
    life.education.status = EducationStatus.ACTIVE;
    life.education.school = db.education.stages[life.education.stage].schools[Math.floor(Math.random() * 20)];

    // Define variables
    const currentStage = life.education.stage;
    const gradeName = db.education.stages[currentStage].grades[0].name;

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - I was enrolled into a new school at ` +
    `${life.education.school}, where I started ${gradeName}.`;
    life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    window.progressing = false;
    $("#notification_h2").html("Time for a new school!");
    $("#notification_p_1").html(`Today you start a brand new school at ${life.education.school}, ` +
        `where you will be starting ${gradeName} from today. `);
    $("#notification_p_2").html("Time to make some new friends!");
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
export function canStartStage(/** @type {Life} */life) {
    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;

    // Current grade must be last grade
    const numberOfGrades = db.education.stages[currentStage].grades.length;
    if (currentGrade + 1 !== numberOfGrades) return false;

    // Current grade must not be last stage
    const numberOfStages = db.education.stages.length;
    if (currentStage + 1 === numberOfStages) return false;

    // Needs to be the first day of school for the next grade
    const startDate = db.education.stages[currentStage + 1].grades[0].startDate;
    if (startDate !== life.date.getMini()) return false;

    // Player must be on holiday
    if (life.education.status !== EducationStatus.ON_HOLIDAY) return false;

    // Return true if all conditions met
    return true;
}
