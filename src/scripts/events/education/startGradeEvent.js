import Life from "../../classes/Life.js";
import misc from "../../functions/misc.js";
import { GameSpeed, DiaryLogging, EducationStatus } from "../../enums.js";
import { db } from "../../database/master.js";

/**
 * Starts school for the player.
 * 100% chance if player can start school.
 * Important event.
 * @param {*} life - Required life input
 */
export function startGradeEvent(/** @type {Life} */life) {
    // Change life data
    life.education.grade++;
    life.education.daysAttended = 0;
    life.education.status = EducationStatus.ACTIVE;

    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;
    const gradeName = db.education.stages[currentStage].grades[currentGrade].name;

    // Add to diary
    const diaryString = `${life.date.format("dd/mm/yyyy")} - I started ${gradeName}.`;
    const log = (misc.getData().settings.diaryLogging > DiaryLogging.MEDIUM);
    if (!window.life || log) life.diary.push(diaryString);

    // Trigger HTML
    if (!window.life) return;
    else if (misc.getData().settings.gameSpeed > GameSpeed.MEDIUM) return;
    window.progressing = false;
    $("#notification_h2").html("Back to school!");
    $("#notification_p_1").html( `Holidays are over, as you will start ${gradeName} from today. `);
    $("#notification_p_2").html("Study harder, as content will get harder!");
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
export function canStartGrade(/** @type {Life} */life) {
    // Define variables
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;

    // Current grade must not be last grade
    const numberOfGrades = db.education.stages[currentStage].grades.length;
    if (currentGrade + 1 === numberOfGrades) return false;

    // Needs to be the first day of school for the next grade
    const startDate = db.education.stages[currentStage].grades[currentGrade + 1].startDate;
    if (startDate !== life.date.getMini()) return false;

    // Player must be on holiday
    if (life.education.status !== EducationStatus.ON_HOLIDAY) return false;

    // Return true if all conditions met
    return true;
}
