// This script contains functions running the education system of the game.
// This script is used in main.html.

// Function 1: education_milestones: Checks if the current day is a beginning 
// or the end of a grade, level or schooling. Ran during progress().
function education_milestones() {
    let dbe = database.education;
    let lie = lifeInfo.education;
    let currentLevel = dbe.grades[dbe.levels[lie.level]];
    let nextGrade;
    if (currentLevel != null) {
        nextGrade = currentLevel.names[parseInt(lie.grade) + 1];
    }
    let nextLevel = dbe.grades[dbe.levels[parseInt(lie.level) + 1]];
    if ( // Case 1: If time to start school
        // Condition 1: Player meets enrolment age
        code_yddd(lifeInfo.age) >= dbe.enrolmentAge && 
        // Condition 2: Today is the school enrolment day
        code_mmdd(lifeInfo.date) == dbe.grades.primary.startDate[1] && 
        // Condition 3: Player has not been to school yet 
        lie.level == 0
    ) {
        lie.level = 1;
        lie.grade = 1;
        lie.school = Math.floor(Math.random() * 20 + 1);
        lie.status = 1;
        displayType("notification_h1", "none");
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        let string_newSchool = dbe.schools.primary[lie.school];
        let string_newGrade = dbe.grades.primary.names[lie.grade];
        $("#notification_h2").html("Welcome to school!");
        $("#notification_p_1").html(
            `Your parents have enrolled you into ${string_newSchool}, ` +
            `where you will be starting ${string_newGrade} from today. `
        );
        $("#notification_p_2").html("Study hard, get good grades and have a bright future!");
        diaryAdd(
            `I started my first day of school at ${string_newSchool}, ` +
            `where I started ${string_newGrade}.`
        );
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
    else if ( // Case 2: If time to start a new grade
        // Condition 1: If the current level is not null
        currentLevel != null &&
        // Condition 2: Today is the next grade's enrolment day
        code_mmdd(lifeInfo.date) == currentLevel.startDate[parseInt(lie.grade) + 1] &&
        // Condition 3: Player has been to school
        lie.level != 0 &&
        // Condition 4: Current grade isn't last grade
        nextGrade != null
    ) {
        lie.grade++;
        lie.status = 1;
        if (JSON.parse(localStorage.getItem("settings")).gameSpeed <= 2) {
            displayType("notification_h1", "none");
            displayType("notification_h2", "block");
            displayType("notification_h3", "none");
            displayType("notification_p_1", "block");
            displayType("notification_p_2", "block");
            let string_newGrade = currentLevel.names[lie.grade];
            $("#notification_h2").html(`Back to school!`);
            $("#notification_p_1").html(
                `Holidays are over, as you will start ${string_newGrade} from today.`
            );
            $("#notification_p_2").html("Study harder, as content will get harder!");
            diaryAdd(`I started ${string_newGrade}.`);
            displayType("notification_overlay", "block");
            breakfn = 1;
        }
    }
    else if ( // Case 3: If time to start a new level
        // Condition 1: Current level isn't last level
        nextLevel != null &&
        // Condition 2: Today is the next level's enrolment date
        code_mmdd(lifeInfo.date) == nextLevel.startDate[1] &&
        // Condition 3: Player has been to school
        lie.level != 0 &&
        // Condition 4: Current grade is last grade
        nextGrade == null &&
        // Condition 5: Current level isn't last level
        nextLevel != null
    ) {
        lie.level++;
        lie.grade = 1;
        lie.school = Math.floor(Math.random() * 20 + 1);
        lie.status = 1;
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        let string_newSchool = dbe.schools[dbe.levels[lie.level]][lie.school];
        let string_newGrade = currentLevel.names[lie.grade];
        $("#notification_h2").html(`Time for a new school!`);
        $("#notification_p_1").html(
            `Today you start a brand new school at ${string_newSchool}, ` +
            `where you will be starting ${string_newGrade} from today.`
        );
        $("#notification_p_2").html("Time to make some new friends!");
        diaryAdd(
            `I was enrolled into a new school at ${string_newSchool}, ` + 
            `where I started ${string_newGrade}.`
        );
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
    else if ( // Case 4: If time to graduate a grade
        // Condition 1: Current level exists
        currentLevel != null &&
        // Condition 2: Today is the last day of the grade
        code_mmdd(lifeInfo.date) == currentLevel.endDate[lie.grade] &&
        // Condition 3: Current grade isn't last grade
        nextGrade != null &&
        // Concition 4: Number of days into the grade has been over 180 days
        lie.daysIntoGrade > 180
    ) {
        lie.status = 2;
        lie.daysIntoGrade = 0;
        if (JSON.parse(localStorage.getItem("settings")).gameSpeed <= 2) {
            displayType("notification_h1", "none");
            displayType("notification_h2", "block");
            displayType("notification_h3", "none");
            displayType("notification_p_1", "block");
            displayType("notification_p_2", "block");
            let string_mark = Math.floor(lie.marks);
            let string_grade = currentLevel.names[lie.grade];
            let string_nextGrade =
                nextGrade;
            let startDate =
                currentLevel.startDate[parseInt(lie.grade) + 1];
            let string_startDate = convert_dict_date(date_next(lifeInfo.date, startDate));
            $("#notification_h2").html(`That's a wrap!`);
            $("#notification_p_1").html(
                `You have completed ${string_grade} ` + `
                with a mark of ${string_mark}%.`
            );
            $("#notification_p_2").html(`Start ${string_nextGrade} on ${string_startDate}.`);
            diaryAdd(`I finished ${string_grade} with a mark of ${string_mark}%.`);
            displayType("notification_overlay", "block");
            breakfn = 1;
        }
    }
    else if ( // Case 5: If time to graduate a level
        // Condition 1: Current level exists
        currentLevel != null &&
        // Condition 2: Today is the last day of the grade
        code_mmdd(lifeInfo.date) == currentLevel.endDate[lie.grade] &&
        // Condition 3: Current grade is last grade
        nextGrade == null &&
        // Condition 4: Current level isn't last level
        nextLevel != null &&
        // Condition 5: Number of days into the grade has been over 180 days
        lie.daysIntoGrade > 180
    ) {
        lie.status = 2;
        lie.daysIntoGrade = 0;
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        playAudio("education_graduation_level");
        let string_mark = Math.floor(lie.marks);
        let string_grade = currentLevel.names[lie.grade];
        let string_school = dbe.schools[dbe.levels[lie.level]][lie.school];
        let string_nextGrade = nextLevel.names[1];
        let startDate = nextLevel.startDate[1];
        let string_startDate = convert_dict_date(date_next(lifeInfo.date, startDate));
        $("#notification_h2").html(`Farewell, old friends!`);
        $("#notification_p_1").html(
            `You have graduated at ${string_school}! ` + 
            `Your mark at ${string_grade} was ${string_mark}%.`
        );
        $("#notification_p_2").html(
            `You will be enrolled into a new school on ` +
            `${string_startDate}, where you'll be starting ${string_nextGrade}.`
        );
        diaryAdd(
            `I graduated at ${string_school}. ` + 
            `My mark at ${string_grade} was ${string_mark}%.`
        );
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
    else if ( // Case 6: If time to graduate school
        // Condition 1: Current level exists
        currentLevel != null &&
        // Condition 2: Today is the last day of the grade
        code_mmdd(lifeInfo.date) == currentLevel.endDate[lie.grade] &&
        // Condition 3: Current grade is last grade
        nextGrade == null &&
        // Condition 4: Current level is last level
        nextLevel == null &&
        // Condition 5: Currently in school
        lie.status == 1 &&
        // Condition 6: Number of days into the grade has been over 180 days
        lie.daysIntoGrade > 180
    ) {
        lie.status = 3;
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        playAudio("education_graduation_school");
        let string_mark = Math.floor(lie.marks);
        let string_grade = currentLevel.names[lie.grade];
        let string_school = dbe.schools[dbe.levels[lie.level]][lie.school];
        $("#notification_h2").html(`Onwards!`);
        $("#notification_p_1").html(
            `You have graduated at ${string_school}! ` +
            `Your mark at ${string_grade} was ${string_mark}%.`
        );
        $("#notification_p_2").html(
            `With that, your schooling career is finished. Time to find a job!`
        );
        diaryAdd(
            `I graduated at ${string_school}. My mark at ${string_grade} was ${string_mark}%.`
        );
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
    lifeInfo.eduction = lie
}

//Function 2: Determines what will happen during the day, education-wise. Ran during progress().
function education_progress() {
    let dbe = database.education;
    let lie = lifeInfo.education;
    let currentLevel = dbe.grades[dbe.levels[lie.level]];
    if (lie.status == 1) {
        // Increases the days into grade by 1
        lie.daysIntoGrade++;
        // Calculates the new mark of the day based on the amount of effort put
        // into schooling, iq, current marks and difficulty of the grade
        let newMark_effort = lie.effort;
        let newMark_iq = lifeInfo.iq;
        let newMark_mark = lie.marks;
        let newMark_difficulty = currentLevel.difficulty[parseInt([lie.grade])];
        let newMark_workDone = (
            (5 + Math.pow(newMark_effort, 0.8)) * 
            newMark_iq * 
            (100 - newMark_mark)
        ) / 500000;
        let newMark_workLoad = (1 + Math.pow(newMark_difficulty, 0.6)) / 100;
        let markAdded = newMark_workDone - newMark_workLoad;
        if (lie.marks >= 1 || markAdded > 0) {
            lie.marks += markAdded;
        }
    }
    lifeInfo.education = lie;
}

// Function 3: Determines what the text should be below the education slider
function education_effort_update() {
    let effort = lifeInfo.education.effort;
    if (effort == 0) {
        $("#education_effort_level").html(`${effort}%: What is school?`);
        $("#education_effort_warning").html(
            `WARNING: Putting no effort into studying might get you expelled from the school!`
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
    } else if (effort == 100) {
        $("#education_effort_level").html(`${effort}%: STRIVING FOR SUCCESS`);
        $("#education_effort_warning").html(
            `WARNING: Putting this much effort into studying` +
            `is extremely stressful and might cause depression!`
        );
    }
}

// Function 4: Updates all information in the education overlay 
// once the education button has been pressed
function education_open() {
    let dbe = database.education;
    let lie = lifeInfo.education;
    let currentLevel = dbe.grades[dbe.levels[lie.level]];
    let school = 0;
    if (lie.level != 0) {
        school = dbe.schools[dbe.levels[lie.level]][lie.school];
    }
    let grade = 0;
    if (lie.level != 0) {
        grade = currentLevel.names[lie.grade];
    }
    let mark = Math.floor(lie.marks);
    displayType("education_overlay", "block");
    $("#education_effort_input").val(lie.effort);
    education_effort_update();
    if (lie.status == 0) {
        $("#education_school").html(`You are not currently enrolled in a school!`);
        $("#education_grade").html(
            `Your parents will automatically enrol you in Primary School after you turn ` +
            `${Math.floor(dbe.enrolmentAge / 1000)} years and ${dbe.enrolmentAge % 1000} days old.`
        );
        $("#education_marks").html(`Marks: ${mark}%`);
        $("#education_effort_input").prop("disabled", "true");
        $("#education_effort_level").html("");
        $("#education_effort_warning").html("");
    } else if (lie.status == 1) {
        $("#education_school").html(`School: ${school}`);
        $("#education_grade").html(`Grade: ${grade}`);
        $("#education_marks").html(`Marks: ${mark}%`);
        $("#education_effort_input").removeAttr("disabled");
    } else if (lie.status == 2) {
        $("#education_school").html(`School: ${school}`);
        $("#education_grade").html(`Grade: ${grade}`);
        $("#education_marks").html(`Marks: ${mark}%`);
        $("#education_effort_input").prop("disabled", "true");
        $("#education_effort_level").html(
            "You are currently on holiday! Take this time to relax and don't stress too hard."
        );
        $("#education_effort_warning").html("");
    } else if (lie.status == 3) {
        $("#education_school").html("You've graduated!");
        $("#education_grade").html("Find a job by pressing the Careers option in the action bar.");
        $("#education_marks").html(`Mark at ${grade}: ${mark}%`);
        $("#education_effort_input").prop("disabled", "true");
        $("#education_effort_level").html("");
        $("#education_effort_warning").html("");
    }
}

// Function 5: Updates the text below the slider upon detecting a change in the slider value
function education_effort_save() {
    lifeInfo.education.effort = $("#education_effort_input").val();
    education_effort_update();
}
