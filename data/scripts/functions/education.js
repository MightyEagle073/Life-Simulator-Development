//This script contains functions running the education system of the game.
//This script is used in main.html.

//Function 1: education_milestones: Checks if the current day is a beginning or the end of a grade, level or schooling. Ran during progress().
function education_milestones() {
    //If time to start school
    if (
        code_yddd(lifeInfo.age) >= database.education.enrolmentAge &&
        code_mmdd(lifeInfo.date) == database.education.grades.primary.startDate[1] &&
        lifeInfo.education.level == 0
    ) {
        lifeInfo.education.level = 1;
        lifeInfo.education.grade = 1;
        lifeInfo.education.school = Math.floor(Math.random() * 20 + 1);
        lifeInfo.education.status = 1;
        displayType("notification_h1", "none");
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        let string_newSchool = database.education.schools.primary[lifeInfo.education.school];
        let string_newGrade = database.education.grades.primary.names[lifeInfo.education.grade];
        $("#notification_h2").html("Welcome to school!");
        $("#notification_p_1").html(
            `Your parents have enrolled you into ${string_newSchool}, where you will be starting ${string_newGrade} from today.`
        );
        $("#notification_p_2").html("Study hard, get good grades and have a bright future!");
        diaryAdd(`I started my first day of school at ${string_newSchool}, where I started ${string_newGrade}.`);
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
    //If time to start a new grade
    else if (
        database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
        code_mmdd(lifeInfo.date) ==
            database.education.grades[database.education.levels[lifeInfo.education.level]].startDate[parseInt([lifeInfo.education.grade]) + 1] &&
        lifeInfo.education.level != 0 &&
        database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt(lifeInfo.education.grade) + 1] != null
    ) {
        lifeInfo.education.grade++;
        lifeInfo.education.status = 1;
        if (JSON.parse(localStorage.getItem("settings")).gameSpeed <= 2) {
            displayType("notification_h1", "none");
            displayType("notification_h2", "block");
            displayType("notification_h3", "none");
            displayType("notification_p_1", "block");
            displayType("notification_p_2", "block");
            let string_newGrade = database.education.grades[database.education.levels[lifeInfo.education.level]].names[lifeInfo.education.grade];
            $("#notification_h2").html(`Back to school!`);
            $("#notification_p_1").html(`Holidays are over, as you will start ${string_newGrade} from today.`);
            $("#notification_p_2").html("Study harder, as content will get harder!");
            diaryAdd(`I started ${string_newGrade}.`);
            displayType("notification_overlay", "block");
            breakfn = 1;
        }
    }
    //If time to start a new level
    else if (
        database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]] != null &&
        code_mmdd(lifeInfo.date) == database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]].startDate[1] &&
        lifeInfo.education.level != 0 &&
        database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt(lifeInfo.education.grade) + 1] == null &&
        database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]] != null
    ) {
        lifeInfo.education.level++;
        lifeInfo.education.grade = 1;
        lifeInfo.education.school = Math.floor(Math.random() * 20 + 1);
        lifeInfo.education.status = 1;
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        let string_newSchool = database.education.schools[database.education.levels[lifeInfo.education.level]][lifeInfo.education.school];
        let string_newGrade = database.education.grades[database.education.levels[lifeInfo.education.level]].names[lifeInfo.education.grade];
        $("#notification_h2").html(`Time for a new school!`);
        $("#notification_p_1").html(
            `Today you start a brand new school at ${string_newSchool}, where you will be starting ${string_newGrade} from today.`
        );
        $("#notification_p_2").html("Time to make some new friends!");
        diaryAdd(`I was enrolled into a new school at ${string_newSchool}, where I started ${string_newGrade}.`);
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
    //If time to graduate a grade
    else if (
        database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
        code_mmdd(lifeInfo.date) ==
            database.education.grades[database.education.levels[lifeInfo.education.level]].endDate[lifeInfo.education.grade] &&
        database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt([lifeInfo.education.grade]) + 1] != null &&
        lifeInfo.education.daysIntoGrade > 180
    ) {
        lifeInfo.education.status = 2;
        lifeInfo.education.daysIntoGrade = 0;
        if (JSON.parse(localStorage.getItem("settings")).gameSpeed <= 2) {
            displayType("notification_h1", "none");
            displayType("notification_h2", "block");
            displayType("notification_h3", "none");
            displayType("notification_p_1", "block");
            displayType("notification_p_2", "block");
            let string_mark = Math.floor(lifeInfo.education.marks);
            let string_grade = database.education.grades[database.education.levels[lifeInfo.education.level]].names[lifeInfo.education.grade];
            let string_nextGrade =
                database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt(lifeInfo.education.grade) + 1];
            let startDate =
                database.education.grades[database.education.levels[lifeInfo.education.level]].startDate[parseInt(lifeInfo.education.grade) + 1];
            let string_startDate = convert_dict_date(date_next(lifeInfo.date, startDate));
            $("#notification_h2").html(`That's a wrap!`);
            $("#notification_p_1").html(`You have completed ${string_grade} with a mark of ${string_mark}%.`);
            $("#notification_p_2").html(`Start ${string_nextGrade} on ${string_startDate}.`);
            diaryAdd(`I finished ${string_grade} with a mark of ${string_mark}%.`);
            displayType("notification_overlay", "block");
            breakfn = 1;
        }
    }
    //If time to graduate a level
    else if (
        database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
        code_mmdd(lifeInfo.date) ==
            database.education.grades[database.education.levels[lifeInfo.education.level]].endDate[lifeInfo.education.grade] &&
        database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt([lifeInfo.education.grade]) + 1] == null &&
        database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]] != null &&
        lifeInfo.education.daysIntoGrade > 180
    ) {
        lifeInfo.education.status = 2;
        lifeInfo.education.daysIntoGrade = 0;
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        playAudio("education_graduation_level");
        let string_mark = Math.floor(lifeInfo.education.marks);
        let string_grade = database.education.grades[database.education.levels[lifeInfo.education.level]].names[lifeInfo.education.grade];
        let string_school = database.education.schools[database.education.levels[lifeInfo.education.level]][lifeInfo.education.school];
        let string_nextGrade = database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]].names[1];
        let startDate = database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]].startDate[1];
        let string_startDate = convert_dict_date(date_next(lifeInfo.date, startDate));
        $("#notification_h2").html(`Farewell, old friends!`);
        $("#notification_p_1").html(`You have graduated at ${string_school}! Your mark at ${string_grade} was ${string_mark}%.`);
        $("#notification_p_2").html(`You will be enrolled into a new school on ${string_startDate}, where you'll be starting ${string_nextGrade}.`);
        diaryAdd(`I graduated at ${string_school}. My mark at ${string_grade} was ${string_mark}%.`);
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
    //If time to graduate school
    else if (
        database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
        code_mmdd(lifeInfo.date) ==
            database.education.grades[database.education.levels[lifeInfo.education.level]].endDate[lifeInfo.education.grade] &&
        database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt([lifeInfo.education.grade]) + 1] == null &&
        database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]] == null &&
        lifeInfo.education.status == 1 &&
        lifeInfo.education.daysIntoGrade > 180
    ) {
        lifeInfo.education.status = 3;
        displayType("notification_h1", "none");
        displayType("notification_h2", "block");
        displayType("notification_h3", "none");
        displayType("notification_p_1", "block");
        displayType("notification_p_2", "block");
        playAudio("education_graduation_school");
        let string_mark = Math.floor(lifeInfo.education.marks);
        let string_grade = database.education.grades[database.education.levels[lifeInfo.education.level]].names[lifeInfo.education.grade];
        let string_school = database.education.schools[database.education.levels[lifeInfo.education.level]][lifeInfo.education.school];
        $("#notification_h2").html(`Onwards!`);
        $("#notification_p_1").html(`You have graduated at ${string_school}! Your mark at ${string_grade} was ${string_mark}%.`);
        $("#notification_p_2").html(`With that, your schooling career is finished. Time to find a job!`);
        diaryAdd(`I graduated at ${string_school}. My mark at ${string_grade} was ${string_mark}%.`);
        displayType("notification_overlay", "block");
        breakfn = 1;
    }
}

//Function 2: Determines what will happen during the day, education-wise. Ran during progress().
function education_progress() {
    if (lifeInfo.education.status == 1) {
        //Increases the days into grade by 1
        lifeInfo.education.daysIntoGrade++;
        //Calculates the new mark of the day based on the amount of effort put into schooling, iq, current marks and difficulty of the grade
        let newMark_effort = lifeInfo.education.effort;
        let newMark_iq = lifeInfo.iq;
        let newMark_mark = lifeInfo.education.marks;
        let newMark_difficulty =
            database.education.grades[database.education.levels[lifeInfo.education.level]].difficulty[parseInt([lifeInfo.education.grade])];
        let newMark_workDone = ((5 + Math.pow(newMark_effort, 0.8)) * newMark_iq * (100 - newMark_mark)) / 500000;
        let newMark_workLoad = (1 + Math.pow(newMark_difficulty, 0.6)) / 100;
        let markAdded = newMark_workDone - newMark_workLoad;
        if (lifeInfo.education.marks >= 1 || markAdded > 0) {
            lifeInfo.education.marks += markAdded;
        }
    }
}

//Function 3: Determines what the text should be below the education slider
function education_effort_update() {
    if (lifeInfo.education.effort == 0) {
        $("#education_effort_level").html(`${lifeInfo.education.effort}%: What is school?`);
        $("#education_effort_warning").html(`WARNING: Putting no effort into studying might get you expelled from the school!`);
    } else if (lifeInfo.education.effort >= 1 && lifeInfo.education.effort <= 20) {
        $("#education_effort_level").html(`${lifeInfo.education.effort}%: Slacking off`);
        $("#education_effort_warning").html("");
    } else if (lifeInfo.education.effort >= 21 && lifeInfo.education.effort <= 40) {
        $("#education_effort_level").html(`${lifeInfo.education.effort}%: Doing bare minimums`);
        $("#education_effort_warning").html("");
    } else if (lifeInfo.education.effort >= 41 && lifeInfo.education.effort <= 60) {
        $("#education_effort_level").html(`${lifeInfo.education.effort}%: Occasional studying`);
        $("#education_effort_warning").html("");
    } else if (lifeInfo.education.effort >= 61 && lifeInfo.education.effort <= 80) {
        $("#education_effort_level").html(`${lifeInfo.education.effort}%: Absorbing the content`);
        $("#education_effort_warning").html("");
    } else if (lifeInfo.education.effort >= 81 && lifeInfo.education.effort <= 99) {
        $("#education_effort_level").html(`${lifeInfo.education.effort}%: Nose to the grindstone`);
        $("#education_effort_warning").html("");
    } else if (lifeInfo.education.effort == 100) {
        $("#education_effort_level").html(`${lifeInfo.education.effort}%: STRIVING FOR SUCCESS`);
        $("#education_effort_warning").html(`WARNING: Putting this much effort into studying is extremely stressful and might cause depression!`);
    }
}

//Segment 4: Updates all information in the education overlay once the education button has been pressed
function education_open() {
    displayType("education_overlay", "block");
    if (lifeInfo.education.level != 0) {
        $("#education_school").html(
            `School: ${database.education.schools[database.education.levels[lifeInfo.education.level]][lifeInfo.education.school]}`
        );
        $("#education_grade").html(
            `Grade: ${database.education.grades[database.education.levels[lifeInfo.education.level]].names[lifeInfo.education.grade]}`
        );
        $("#education_marks").html(`Marks: ${Math.floor(lifeInfo.education.marks)}%`);
        $("#education_effort_input").removeAttr("disabled");
        $("#education_effort_input").val(lifeInfo.education.effort);
    }
    education_effort_update();
}

//Function 5: Updates the text below the slider upon detecting a change in the slider value
function education_effort_save() {
    lifeInfo.education.effort = $("#education_effort_input").val();
    education_effort_update();
}
