import Life from "../classes/Life.js";
import { educationStatsEvent } from "./education/educationStatsEvent.js";
import { canStartGrade, startGradeEvent } from "./education/startGradeEvent.js";
import { canStartStage, startStageEvent } from "./education/startStageEvent.js";
import { canStartSchool, startSchoolEvent } from "./education/startSchoolEvent.js";
import { canEndGrade, endGradeEvent } from "./education/endGradeEvent.js";
import { canEndStage, endStageEvent } from "./education/endStageEvent.js";
import { canEndSchool, endSchoolEvent } from "./education/endSchoolEvent.js";
import { EducationStatus } from "../enums.js";

/**
 * Celebrates the player's birthday.
 * 100% Chance if player’s birthday is today
 * Event of events.
 * @param {*} life - Required life input
 */
export function educationEvents (/** @type {Life} */life) {
    if (canStartGrade(life)) startGradeEvent(life);
    if (canStartStage(life)) startStageEvent(life);
    if (canStartSchool(life)) startSchoolEvent(life);
    if (canEndGrade(life)) endGradeEvent(life);
    if (canEndStage(life)) endStageEvent(life);
    if (canEndSchool(life)) endSchoolEvent(life);
    if (life.education.status === EducationStatus.ACTIVE) educationStatsEvent(life);
}
