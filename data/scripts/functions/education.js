// This script contains functions running the education system of the game.

import { db } from "../database.js";
import dates from "./dates.js";
import misc from "./misc.js";

export default class education {
    // Function 1: education_milestones: Checks if the current day is a beginning
    // or the end of a grade, level or schooling. Ran during progress().
    static milestones() {
        const dbe = db.education;
        const lie = window.life.education;
        const currentLevel = dbe.grades[dbe.levels[lie.level]] ?? null;
        const nextGrade = currentLevel?.names[Number(lie.grade) + 1] ?? null;
        const nextLevel = dbe.grades[dbe.levels[parseInt(lie.level) + 1]];
        if ( // Case 1: If time to start school
            // Condition 1: Player meets enrolment age
            dates.code_yddd(window.life.age) >= dbe.enrolmentAge &&
            // Condition 2: Today is the school enrolment day
            dates.code_mmdd(window.life.date) === dbe.grades.primary.startDate[1] &&
            // Condition 3: Player has not been to school yet
            lie.level === 0
        ) {
            lie.level = 1;
            lie.grade = 1;
            lie.school = Math.floor(Math.random() * 20 + 1);
            lie.status = 1;
            misc.display("notification_h1", "none");
            misc.display("notification_h1", "none");
            misc.display("notification_h2", "block");
            misc.display("notification_h3", "none");
            misc.display("notification_p_1", "block");
            misc.display("notification_p_2", "block");
            const newSchoolString = dbe.schools.primary[lie.school];
            const newGradeString = dbe.grades.primary.names[lie.grade];
            $("#notification_h2").html("Welcome to school!");
            $("#notification_p_1").html(
                `Your parents have enrolled you into ${newSchoolString}, ` +
                `where you will be starting ${newGradeString} from today. `
            );
            $("#notification_p_2").html("Study hard, get good grades and have a bright future!");
            misc.diaryAdd(
                `I started my first day of school at ${newSchoolString}, ` +
                `where I started ${newGradeString}.`
            );
            misc.display("notification_overlay", "block");
            window.progressing = false;
        }
        else if ( // Case 2: If time to start a new grade
            // Condition 1: If the current level is not null
            currentLevel &&
            // Condition 2: Today is the next grade's enrolment day
            dates.code_mmdd(window.life.date) === currentLevel.startDate[parseInt(lie.grade) + 1] &&
            // Condition 3: Player has been to school
            lie.level !== 0 &&
            // Condition 4: Current grade isn't last grade
            nextGrade
        ) {
            lie.grade++;
            lie.status = 1;
            if (misc.getData().settings.gameSpeed <= 2) {
                misc.display("notification_h1", "none");
                misc.display("notification_h2", "block");
                misc.display("notification_h3", "none");
                misc.display("notification_p_1", "block");
                misc.display("notification_p_2", "block");
                const newGradeString = currentLevel.names[lie.grade];
                $("#notification_h2").html("Back to school!");
                $("#notification_p_1").html(
                    `Holidays are over, as you will start ${newGradeString} from today.`
                );
                $("#notification_p_2").html("Study harder, as content will get harder!");
                misc.diaryAdd(`I started ${newGradeString}.`);
                misc.display("notification_overlay", "block");
                window.progressing = false;
            }
        }
        else if ( // Case 3: If time to start a new level
            // Condition 1: Current level isn't last level
            nextLevel &&
            // Condition 2: Today is the next level's enrolment date
            dates.code_mmdd(window.life.date) === nextLevel.startDate[1] &&
            // Condition 3: Player has been to school
            lie.level !== 0 &&
            // Condition 4: Current grade is last grade
            !nextGrade &&
            // Condition 5: Current level isn't last level
            nextLevel
        ) {
            lie.level++;
            lie.grade = 1;
            lie.school = Math.floor(Math.random() * 20 + 1);
            lie.status = 1;
            misc.display("notification_h1", "none");
            misc.display("notification_h2", "block");
            misc.display("notification_h3", "none");
            misc.display("notification_p_1", "block");
            misc.display("notification_p_2", "block");
            const newSchoolString = dbe.schools[dbe.levels[lie.level]][lie.school];
            const newGradeString = currentLevel.names[lie.grade];
            $("#notification_h2").html("Time for a new school!");
            $("#notification_p_1").html(
                `Today you start a brand new school at ${newSchoolString}, ` +
                `where you will be starting ${newGradeString} from today.`
            );
            $("#notification_p_2").html("Time to make some new friends!");
            misc.diaryAdd(
                `I was enrolled into a new school at ${newSchoolString}, ` +
                `where I started ${newGradeString}.`
            );
            misc.display("notification_overlay", "block");
            window.progressing = false;
        }
        else if ( // Case 4: If time to graduate a grade
            // Condition 1: Current level exists
            currentLevel &&
            // Condition 2: Today is the last day of the grade
            dates.code_mmdd(window.life.date) === currentLevel.endDate[lie.grade] &&
            // Condition 3: Current grade isn't last grade
            nextGrade &&
            // Concition 4: Number of days into the grade has been over 180 days
            lie.daysIntoGrade > 180
        ) {
            lie.status = 2;
            lie.daysIntoGrade = 0;
            if (misc.getData().settings.gameSpeed <= 2) {
                misc.display("notification_h1", "none");
                misc.display("notification_h2", "block");
                misc.display("notification_h3", "none");
                misc.display("notification_p_1", "block");
                misc.display("notification_p_2", "block");
                const markString = Math.floor(lie.marks);
                const gradeString = currentLevel.names[lie.grade];
                const nextGradeString = nextGrade;
                const startDate = currentLevel.startDate[parseInt(lie.grade) + 1];
                const startDateString = dates.convert_dict_date(dates.next(window.life.date, startDate));
                $("#notification_h2").html("That's a wrap!");
                $("#notification_p_1").html(
                    `You have completed ${gradeString} ` + `
                    with a mark of ${markString}%.`
                );
                $("#notification_p_2").html(`Start ${nextGradeString} on ${startDateString}.`);
                misc.diaryAdd(`I finished ${gradeString} with a mark of ${markString}%.`);
                misc.display("notification_overlay", "block");
                window.progressing = false;
            }
        }
        else if ( // Case 5: If time to graduate a level
            // Condition 1: Current level exists
            currentLevel &&
            // Condition 2: Today is the last day of the grade
            dates.code_mmdd(window.life.date) === currentLevel.endDate[lie.grade] &&
            // Condition 3: Current grade is last grade
            !nextGrade &&
            // Condition 4: Current level isn't last level
            nextLevel &&
            // Condition 5: Number of days into the grade has been over 180 days
            lie.daysIntoGrade > 180
        ) {
            lie.status = 2;
            lie.daysIntoGrade = 0;
            misc.display("notification_h1", "none");
            misc.display("notification_h2", "block");
            misc.display("notification_h3", "none");
            misc.display("notification_p_1", "block");
            misc.display("notification_p_2", "block");
            misc.playAudio("education_graduation_level");
            const markString = Math.floor(lie.marks);
            const gradeString = currentLevel.names[lie.grade];
            const schoolString = dbe.schools[dbe.levels[lie.level]][lie.school];
            const nextGradeString = nextLevel.names[1];
            const startDate = nextLevel.startDate[1];
            const startDateString = dates.convert_dict_date(dates.next(window.life.date, startDate));
            $("#notification_h2").html("Farewell, old friends!");
            $("#notification_p_1").html(
                `You have graduated at ${schoolString}! ` +
                `Your mark at ${gradeString} was ${markString}%.`
            );
            $("#notification_p_2").html(
                "You will be enrolled into a new school on " +
                `${startDateString}, where you'll be starting ${nextGradeString}.`
            );
            misc.diaryAdd(
                `I graduated at ${schoolString}. ` +
                `My mark at ${gradeString} was ${markString}%.`
            );
            misc.display("notification_overlay", "block");
            window.progressing = false;
        }
        else if ( // Case 6: If time to graduate school
            // Condition 1: Current level exists
            currentLevel &&
            // Condition 2: Today is the last day of the grade
            dates.code_mmdd(window.life.date) === currentLevel.endDate[lie.grade] &&
            // Condition 3: Current grade is last grade
            !nextGrade &&
            // Condition 4: Current level is last level
            !nextLevel &&
            // Condition 5: Currently in school
            lie.status === 1 &&
            // Condition 6: Number of days into the grade has been over 180 days
            lie.daysIntoGrade > 180
        ) {
            lie.status = 3;
            misc.display("notification_h1", "none");
            misc.display("notification_h2", "block");
            misc.display("notification_h3", "none");
            misc.display("notification_p_1", "block");
            misc.display("notification_p_2", "block");
            misc.playAudio("education_graduation_school");
            const markString = Math.floor(lie.marks);
            const markGrade = currentLevel.names[lie.grade];
            const markSchool = dbe.schools[dbe.levels[lie.level]][lie.school];
            $("#notification_h2").html("Onwards!");
            $("#notification_p_1").html(
                `You have graduated at ${markSchool}! ` +
                `Your mark at ${markGrade} was ${markString}%.`
            );
            $("#notification_p_2").html(
                "With that, your schooling career is finished. Time to find a job!"
            );
            misc.diaryAdd(
                `I graduated at ${markSchool}. My mark at ${markGrade} was ${markString}%.`
            );
            misc.display("notification_overlay", "block");
            window.progressing = false;
        }
        window.life.education = lie;
    }

    // Function 2: Determines what will happen during the day, education-wise. Ran during progress().
    static progress() {
        const dbe = db.education;
        const lie = window.life.education;
        const currentLevel = dbe.grades[dbe.levels[lie.level]];
        if (lie.status === 1) {
            // Increases the days into grade by 1
            lie.daysIntoGrade++;
            // Calculates the new mark of the day based on the amount of effort put
            // into schooling, iq, current marks and difficulty of the grade
            const newMark_effort = lie.effort;
            const newMark_iq = window.life.iq;
            const newMark_mark = lie.marks;
            const newMark_difficulty = currentLevel.difficulty[parseInt([lie.grade])];
            const newMark_workDone = (
                (5 + Math.pow(newMark_effort, 0.8)) *
                newMark_iq *
                (100 - newMark_mark)
            ) / 500000;
            const newMark_workLoad = (1 + Math.pow(newMark_difficulty, 0.6)) / 100;
            const markAdded = newMark_workDone - newMark_workLoad;
            if (lie.marks >= 1 || markAdded > 0) {
                lie.marks += markAdded;
            }
        }
        window.life.education = lie;
    }

    // Function 3: Determines what the text should be below the education slider
    static effortUpdate() {
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

    // Function 4: Updates all information in the education overlay
    // once the education button has been pressed
    static open() {
        const dbe = db.education;
        const lie = window.life.education;
        const currentLevel = dbe.grades[dbe.levels[lie.level]];
        let school = 0;
        if (lie.level !== 0) {
            school = dbe.schools[dbe.levels[lie.level]][lie.school];
        }
        let grade = 0;
        if (lie.level !== 0) {
            grade = currentLevel.names[lie.grade];
        }
        const mark = Math.floor(lie.marks);
        misc.display("education_overlay", "block");
        $("#education_effort_input").val(lie.effort);
        this.effortUpdate();
        if (lie.status === 0) {
            $("#education_school").html("You are not currently enrolled in a school!");
            $("#education_grade").html(
                "Your parents will automatically enrol you in Primary School after you turn " +
                `${Math.floor(dbe.enrolmentAge / 1000)} years and ${dbe.enrolmentAge % 1000} days old.`
            );
            $("#education_marks").html(`Marks: ${mark}%`);
            $("#education_effort_input").prop("disabled", "true");
            $("#education_effort_level").html("");
            $("#education_effort_warning").html("");
        } else if (lie.status === 1) {
            $("#education_school").html(`School: ${school}`);
            $("#education_grade").html(`Grade: ${grade}`);
            $("#education_marks").html(`Marks: ${mark}%`);
            $("#education_effort_input").removeAttr("disabled");
        } else if (lie.status === 2) {
            $("#education_school").html(`School: ${school}`);
            $("#education_grade").html(`Grade: ${grade}`);
            $("#education_marks").html(`Marks: ${mark}%`);
            $("#education_effort_input").prop("disabled", "true");
            $("#education_effort_level").html(
                "You are currently on holiday! Take this time to relax and don't stress too hard."
            );
            $("#education_effort_warning").html("");
        } else if (lie.status === 3) {
            $("#education_school").html("You've graduated!");
            $("#education_grade").html("Find a job by pressing the Careers option in the action bar.");
            $("#education_marks").html(`Mark at ${grade}: ${mark}%`);
            $("#education_effort_input").prop("disabled", "true");
            $("#education_effort_level").html("");
            $("#education_effort_warning").html("");
        }
    }

    // Function 5: Updates the text below the slider upon detecting a change in the slider value
    static effortSave() {
        window.life.education.effort = $("#education_effort_input").val();
        this.effortUpdate();
    }
}
