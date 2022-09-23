//Segment M1: Checks if user is using an unsupported brower
if (navigator.userAgent.indexOf("Firefox") != -1) {
    displayType("notSupported_overlay", "block");
}

//Segment M3: Initialises Life
if (localStorage.getItem("lifeTransfer")) {
    var lifeInfo = JSON.parse(localStorage.getItem("lifeTransfer"));
    var diaryReplace_array = [];
    localStorage.removeItem("lifeTransfer");
} else {
    window.location.href = "../home.html";
}

//Segment M4: This function changes the settings according to setting local storages
settings_initialise();

//Segment M5: This segment changes the life information on the diary (top left) and information (top right) tabs
$("#main_diary_h1").html(`${lifeInfo.name.first} ${lifeInfo.name.last}'s Diary`);
$("#main_diary_p").html(`${lifeInfo.diary}`);
$("#main_info_age").html(`Age: ${lifeInfo.age.years} years ${lifeInfo.age.days} days`);
switch (lifeInfo.gender) {
    case "m":
        $("#main_info_gender").html("Gender: Male");
        break;
    case "f":
        $("#main_info_gender").html("Gender: Female");
        break;
    default:
        $("#main_info_gender").html("Gender: Error! You might want to restart your game.");
}
$("#main_info_balance").html("Balance: " + lifeInfo.balance.toLocaleString("en-AU", {style: "currency", currency: "AUD"}));
$("#main_info_netWorth").html("Net Worth: " + lifeInfo.netWorth.toLocaleString("en-AU", {style: "currency", currency: "AUD"}));
$("#main_info_birthday").html("Birthday:" + " " + convert_dict_date(lifeInfo.birthday));
$("#main_control_currentDate").html(convert_dict_date(lifeInfo.date));
$("#main_control_speed").val(0);

//Segment M7: This function creates temporary variables that can later be changed
var {volume: volume_temp, theme: theme_temp, gameSpeed: gameSpeed_temp} = JSON.parse(localStorage.getItem("settings"));

//Segment M8: This function changes the text on the secondary overlay according to the settings
function settings_sure() {
    displayType("settings2_overlay", "block");
    volume_temp = $("#settings_volume").val();
    if ($("#settings_gameSpeed1").checked) {
        gameSpeed_temp = 1;
    } else if ($("#settings_gameSpeed2").checked) {
        gameSpeed_temp = 2;
    } else {
        gameSpeed_temp = 3;
    }
}

//Segment M9: This function changes the value of the settings theme button
function settings_theme() {
    if (theme_temp == database.themeNames.length - 1) {
        theme_temp = 1;
    } else {
        theme_temp = theme_temp + 1;
    }
    $("#settings_theme").css("backgroundImage", `url('wallpapers/previews/${database.themeNames[theme_temp]}')`);
}

//Segment M10: These functions are related to education
//Segment M10a: This function determines what the text should be below the education slider
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

//Segment M10b: This function updates all information in the education overlay once the education button has been pressed
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

//Segment M10c: This function updates the text below the slider upon detecting a change in the slider value
function education_effort_save() {
    lifeInfo.education.effort = $("#education_effort_input").val();
    education_effort_update();
}

//Segment M11: This function adds the wait function, which tells the program to hold for a given amount of milliseconds
function wait(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    } while (d2 - d < ms);
}

//Segment M12: This segment defines diaryReplace(), which replaces the curly brackets inside the quote, defined in the database, with a variable.
// ! Obsolete function: Either redesign or removal
function diaryReplace(input) {
    let array_a = input.split(/{|}/);
    for (let i = 1; i < array_a.length; i += 2) {
        let array_b = array_a[i].split(",");
        switch (array_b.length) {
            case 1:
                array_a[i] = lifeInfo[array_b[0]];
                break;
            case 2:
                array_a[i] = lifeInfo[array_b[0]][array_b[1]];
                break;
            case 3:
                array_a[i] = lifeInfo[array_b[0]][array_b[1]][array_b[2]];
                break;
            case 4:
                array_a[i] = lifeInfo[array_b[0]][array_b[1]][array_b[2]][array_b[3]];
                break;
        }
    }
    output = array_a.join("");
    return output;
}

//Segment M13: This segment defines progress(), which forwards the game by one day, and determines what happens during that day. Instead of dividing this into subsegments, this segment will be divided into tasks. This version (0.3.0) will perform 9 tasks for each iteration, and will be labelled as such. Future versions may perform more and more tasks per iteration. Not all tasks may be performed in an iteration.
function progress() {
    if (breakfn == 0) {
        //Task 1: Upon starting the game, player's life begins, log birth into diary. Only performed during first day of player's life.
        if (lifeInfo.dsb == 0) {
            lifeInfo.diary = convert_dict_date(lifeInfo.date) + database.diaryEntries.born;
        }
        //Task 2: Advances time by one day
        lifeInfo.date = date_add(lifeInfo.date, 1);
        //Task 3: Player gets older by one day. If the month and day of the current day and the month and day of the character's birthday matches, the age goes up by 1. Else, the days goes up by 1.
        if (code_mmdd(lifeInfo.date) == code_mmdd(lifeInfo.birthday)) {
            lifeInfo.age.years++;
            lifeInfo.age.days = 0;
        } else {
            lifeInfo.age.days++;
        }
        //Task 4: Active days since birth goes up by one. DSB is never displayed to the player.
        lifeInfo.dsb++;
        //Task 5: Education milestones (starting or graduating)
        if ("Education Milestones" != 0) {
            //Task 5a: Starting primary school
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
                lifeInfo.diary =
                    lifeInfo.diary +
                    convert_dict_date(lifeInfo.date) +
                    `- I started my first day of school at ${string_newSchool}, where I started ${string_newGrade}. <br>`;
                displayType("notification_overlay", "block");
                breakfn = 1;
            }
            //Task 5b: Starting a new grade
            else if (
                database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
                code_mmdd(lifeInfo.date) ==
                    database.education.grades[database.education.levels[lifeInfo.education.level]].startDate[
                        parseInt([lifeInfo.education.grade]) + 1
                    ] &&
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
                    let string_newGrade =
                        database.education.grades[database.education.levels[lifeInfo.education.level]].names[lifeInfo.education.grade];
                    $("#notification_h2").html(`Back to school!`);
                    $("#notification_p_1").html(`Holidays are over, as you will start ${string_newGrade} from today.`);
                    $("#notification_p_2").html("Study harder, as content will get harder!");
                    lifeInfo.diary = lifeInfo.diary + convert_dict_date(lifeInfo.date) + `- I started ${string_newGrade}. <br>`;
                    displayType("notification_overlay", "block");
                    breakfn = 1;
                }
            }
            //Task 5c: Starting a new school
            else if (
                database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]] != null &&
                code_mmdd(lifeInfo.date) ==
                    database.education.grades[database.education.levels[parseInt(lifeInfo.education.level) + 1]].startDate[1] &&
                lifeInfo.education.level != 0 &&
                database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt(lifeInfo.education.grade) + 1] ==
                    null &&
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
                lifeInfo.diary =
                    lifeInfo.diary +
                    convert_dict_date(lifeInfo.date) +
                    `- I was enrolled into a new school at ${string_newSchool}, where I started ${string_newGrade}. <br>`;
                displayType("notification_overlay", "block");
                breakfn = 1;
            }
            //Task 5d: Graduating a grade
            else if (
                database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
                code_mmdd(lifeInfo.date) ==
                    database.education.grades[database.education.levels[lifeInfo.education.level]].endDate[lifeInfo.education.grade] &&
                database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt([lifeInfo.education.grade]) + 1] !=
                    null &&
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
                        database.education.grades[database.education.levels[lifeInfo.education.level]].startDate[
                            parseInt(lifeInfo.education.grade) + 1
                        ];
                    let string_startDate = convert_dict_date(date_next(lifeInfo.date, startDate));
                    $("#notification_h2").html(`That's a wrap!`);
                    $("#notification_p_1").html(`You have completed ${string_grade} with a mark of ${string_mark}%.`);
                    $("#notification_p_2").html(`Start ${string_nextGrade} on ${string_startDate}.`);
                    lifeInfo.diary =
                        lifeInfo.diary + convert_dict_date(lifeInfo.date) + `- I finished ${string_grade} with a mark of ${string_mark}%. <br>`;
                    displayType("notification_overlay", "block");
                    breakfn = 1;
                }
            }
            //Task 5e: Graduating a level
            else if (
                database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
                code_mmdd(lifeInfo.date) ==
                    database.education.grades[database.education.levels[lifeInfo.education.level]].endDate[lifeInfo.education.grade] &&
                database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt([lifeInfo.education.grade]) + 1] ==
                    null &&
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
                $("#notification_p_2").html(
                    `You will be enrolled into a new school on ${string_startDate}, where you'll be starting ${string_nextGrade}.`
                );
                lifeInfo.diary =
                    lifeInfo.diary +
                    convert_dict_date(lifeInfo.date) +
                    `- I graduated at ${string_school}. My mark at ${string_grade} was ${string_mark}%. <br>`;
                displayType("notification_overlay", "block");
                breakfn = 1;
            }
            //Task 5f: Graduating school
            else if (
                database.education.grades[database.education.levels[lifeInfo.education.level]] != null &&
                code_mmdd(lifeInfo.date) ==
                    database.education.grades[database.education.levels[lifeInfo.education.level]].endDate[lifeInfo.education.grade] &&
                database.education.grades[database.education.levels[lifeInfo.education.level]].names[parseInt([lifeInfo.education.grade]) + 1] ==
                    null &&
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
                lifeInfo.diary =
                    lifeInfo.diary +
                    convert_dict_date(lifeInfo.date) +
                    `- I graduated at ${string_school}. My mark at ${string_grade} was ${string_mark}%. <br>`;
                displayType("notification_overlay", "block");
                breakfn = 1;
            }
        }
        //Task 6: Education system
        if (lifeInfo.education.status == 1) {
            //Task 6a: Increases the days into grade by 1
            lifeInfo.education.daysIntoGrade++;
            //Task 6b: Calculates the new mark of the day based on the amount of effort put into schooling, iq, current marks and difficulty of the grade
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
        //Task 7: Determines whether the player will die naturally today. If so, end the game. Chances will get higher and higher based on the DSB of player.
        let death_x = Math.random();
        if (Math.pow(10, lifeInfo.dsb * 0.0001) >= 10000000 * death_x) {
            breakfn = 2;
            lifeInfo.status = 2;
            console.log("Dead at " + lifeInfo.age.years + " years " + lifeInfo.age.days + " days due to a death_x of " + death_x.toString());
            lifeInfo.diary = lifeInfo.diary + convert_dict_date(lifeInfo.date) + diaryReplace(database.diaryEntries.death);
            playAudio("death");
            displayType("death_overlay", "block");
            $("#death_died").html(
                `${lifeInfo.name.first} ${lifeInfo.name.last} has died on ${convert_dict_date(lifeInfo.date)} due to natural causes.`
            );
            switch (lifeInfo.gender) {
                case "m":
                    $("#death_age").html("He was at an age of " + lifeInfo.age.years + " years " + lifeInfo.age.days + " days.");
                    break;
                case "f":
                    $("#death_age").html("She was at an age of " + lifeInfo.age.years + " years " + lifeInfo.age.days + " days.");
                    break;
            }
        }
        //Task 8: Updates information throughout the HTML
        $("#main_control_currentDate").html(convert_dict_date(lifeInfo.date));
        $("#main_info_age").html("Age: " + lifeInfo.age.years + " years " + lifeInfo.age.days + " days");
        $("#main_info_balance").html("Balance: " + lifeInfo.balance.toLocaleString("en-AU", {style: "currency", currency: "AUD"}));
        $("#main_info_netWorth").html("Net Worth: " + lifeInfo.netWorth.toLocaleString("en-AU", {style: "currency", currency: "AUD"}));
        $("#main_diary_p").html(lifeInfo.diary);
        //Task 9: Wait a period of time before advancing to the next day.
        wait(1000 * Math.pow(10, -0.03 * $("#main_control_speed").val()) - 1);
    }
}

//Segment M14: This function tells the program what to do when the start and pause buttons are pressed
var breakfn = 1;
function timestart() {
    if (breakfn == 1) {
        breakfn = 0;
    }
    for (let i = 0; i < 50000; i++) {
        setTimeout(function () {
            progress();
        }, 0);
    }
}
function timepause() {
    breakfn = 1;
}

//Segment M15: This function ends the life of the current player without saving
function endLife() {
    window.location.href = "../home.html";
}

//Segment M16: This function changes the text on the inside of the save life div
displayType("save_overlay", "block");
for (let i = 1; i <= 10; i++) {
    if (JSON.parse(localStorage.getItem("currentInfo"))[i].status == 1) {
        if (JSON.parse(localStorage.getItem("currentInfo"))[i].version == "0.3 beta") {
            $(`#save_div_${i}`).innerHTML =
                `Life ${i}: ` +
                JSON.parse(localStorage.getItem("currentInfo"))[i].name.first +
                " " +
                JSON.parse(localStorage.getItem("currentInfo"))[i].name.last;
        } else {
            $(`#save_div_${i}`).html("Incompatible Life Stored");
        }
    }
}

//Segment M17: This function changes the text on the inside of the preserve life div
function preserveLife() {
    displayType("preserve_overlay", "block");
    for (let i = 1; i <= 30; i++) {
        if (JSON.parse(localStorage.getItem("pastInfo"))[i].status == 2) {
            if (JSON.parse(localStorage.getItem("pastInfo"))[i].version == "0.3 beta") {
                $(`#preserve_div_${i}`).innerHTML =
                    `Life ${i}: ` +
                    JSON.parse(localStorage.getItem("currentInfo"))[i].name.first +
                    " " +
                    JSON.parse(localStorage.getItem("pastInfo"))[i].name.last;
            } else {
                $(`#preserve_div_${i}`).html("Incompatible Life Stored");
            }
        }
    }
}

//Segment M18: This function saves the life into the continue lives tab
function save_life(lifeNo) {
    lifeInfo.lifeNo = lifeNo;
    localStorage.setItem("lifeTransfer", JSON.stringify(lifeInfo));
    window.location.href = "../home.html";
}

//Segment M19: This function saves the life into the pasts lives tab
function preserve_life(lifeNo) {
    lifeInfo.lifeNo = lifeNo;
    localStorage.setItem("lifeTransfer", JSON.stringify(lifeInfo));
    window.location.href = "../home.html";
}

//Segment M20: Following code makes final adjustments to page
displayType("save_overlay", "none");
$("#main_diary_h1").fitText(20);
$("#main_info_h1").fitText(8);
$("#main_control_currentDate").fitText(6);
$(".main_info_p").fitText(20);
