import Life from "../../classes/Life.js";
import { db } from "../../database/master.js";

/**
 * Updates the stats for the player's education stats.
 * 100% chance if player's education status is active.
 * Passive event.
 * @param {*} life - Required life input
 */
export function educationStatsEvent(/** @type {Life} */life) {
    // Increases the days attended of the grade by one
    life.education.daysAttended++;

    // Updates the mark of the player. This method has some flaws that I cannot fix.
    // Desmos visualiser: https://www.desmos.com/calculator/l6d7xtstga
    const currentStage = life.education.stage;
    const currentGrade = life.education.grade;
    const gradeInfo = db.education.stages[currentStage].grades[currentGrade];
    const coefficient = 50 / gradeInfo.difficulty * life.skills.iq;
    const minMarks = (100 * coefficient) / (coefficient + 100);
    const maxMarks = (100 * coefficient) / (coefficient + 1);
    const asymptote = minMarks + (life.education.effort * (maxMarks - minMarks)) / 100;
    const difference = (asymptote - life.education.marks) / 100;
    life.education.marks += difference;
}
