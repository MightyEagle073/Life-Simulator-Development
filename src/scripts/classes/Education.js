// Education.js - The script containing the education object

import Life from "./Life.js";
import misc from "../functions/misc.js";
import { EducationStatus } from "../enums.js";
import { db } from "../database/master.js";

/**
 * Education object - Containing information about a player's education details
 */
export default class Education {
    constructor(data = {}) {
        this.status = data.status ?? EducationStatus.NOT_STARTED;
        this.stage = data.stage ?? 0;
        this.grade = data.grade ?? 0;
        this.daysAttended = data.daysAttended ?? 0;
        this.school = data.school ?? null;
        this.marks = data.marks ?? 50;
        this.effort = data.effort ?? 50;
    }

    /**
     * Updates all information in the education overlayonce the education button has been pressed
     */
    static open() {
        // Define variables
        /** @type {Life} */const life = window.life;
        const currentStage = life.education.stage;
        const currentGrade = life.education.grade;
        const gradeName = db.education.stages[currentStage].grades[currentGrade].name;
        const marksRounded = Math.round(life.education.marks * 100) / 100;

        // Display the overlay and initialise effort value
        misc.display("education_overlay", "block");
        $("#education_effort_input").val(life.education.effort);
        this.effortTextUpdate();

        if (life.education.status === EducationStatus.NOT_STARTED) {
            const stageName = db.education.stages[0].name;
            const yearString = Math.floor(db.education.enrolmentAge / 1000);
            const dayString = db.education.enrolmentAge % 1000;
            $("#education_school").html("You are not currently enrolled in a school!");
            $("#education_grade").html(`Your parents will automatically enrol you in ${stageName}\
                after you turn ${yearString} years and ${dayString} days old.`);
            $("#education_marks").html(`Marks: ${life.education.marks}%`);
            $("#education_effort_input").prop("disabled", "true");
            $("#education_effort_level").html("");
            $("#education_effort_warning").html("");
        } else if (life.education.status === EducationStatus.ACTIVE) {
            $("#education_school").html(`School: ${life.education.school}`);
            $("#education_grade").html(`Grade: ${gradeName}`);
            $("#education_marks").html(`Marks: ${marksRounded}%`);
            $("#education_effort_input").removeAttr("disabled");
        } else if (life.education.status === EducationStatus.ON_HOLIDAY) {
            $("#education_school").html(`School: ${life.education.school}`);
            $("#education_grade").html(`Grade: ${gradeName}`);
            $("#education_marks").html(`Marks: ${Math.round(life.education.marks * 100) / 100}%`);
            $("#education_effort_input").prop("disabled", "true");
            $("#education_effort_level").html(
                "You are currently on holiday! Take this time to relax and don't stress too hard."
            );
            $("#education_effort_warning").html("");
        } else if (life.education.status === EducationStatus.GRADUATED) {
            $("#education_school").html("You've graduated!");
            $("#education_grade").html("Find a job by pressing the Careers option in the action bar.");
            $("#education_marks").html(`Mark at ${gradeName}: ${marksRounded}%`);
            $("#education_effort_input").prop("disabled", "true");
            $("#education_effort_level").html("");
            $("#education_effort_warning").html("");
        }
    }

    /**
     * Determines what the text should be below the education slider
     */
    static effortTextUpdate() {
        const effort = window.life.education.effort;
        if (effort === 0) {
            $("#education_effort_level").html(`${effort}%: What is school?`);
            $("#education_effort_warning").html(
                "WARNING: Putting no effort into studying might get you expelled from the school!"
            );
        } else if (effort >= 1 && effort <= 20) {
            $("#education_effort_level").html(`${effort}%: Slacking off`); // TODO Name clash
            $("#education_effort_warning").html("");
        } else if (effort >= 21 && effort <= 40) {
            $("#education_effort_level").html(`${effort}%: Doing bare minimums`); // TODO Name clash
            $("#education_effort_warning").html("");
        } else if (effort >= 41 && effort <= 60) {
            $("#education_effort_level").html(`${effort}%: Occasional studying`);
            $("#education_effort_warning").html("");
        } else if (effort >= 61 && effort <= 80) {
            $("#education_effort_level").html(`${effort}%: Absorbing the content`);
            $("#education_effort_warning").html("");
        } else if (effort >= 81 && effort <= 99) {
            $("#education_effort_level").html(`${effort}%: Nose to the grindstone`); // TODO Name clash
            $("#education_effort_warning").html("");
        } else if (effort === 100) {
            $("#education_effort_level").html(`${effort}%: STRIVING FOR SUCCESS`);
            $("#education_effort_warning").html(
                "WARNING: Putting this much effort into studying" +
                "is extremely stressful and might cause depression!"
            );
        }
    }

    /**
     * Updates the text below the slider upon detecting a change in the slider value
     */
    static effortSave() {
        window.life.education.effort = parseInt($("#education_effort_input").val());
        this.effortTextUpdate();
    }
}
