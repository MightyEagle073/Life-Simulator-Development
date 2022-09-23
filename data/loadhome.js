//Segment H1: Checks if user is using an unsupported browser
if (navigator.userAgent.indexOf("Firefox") != -1) {
    displayType("notSupported_overlay", "block");
}

localStorage.setItem("test", 1);
if (localStorage.getItem("test") != 1) {
    displayType("notSupported_overlay", "block");
}
localStorage.removeItem("test");

//Segment H2: Sets local storage values to default values if not already set
if (!localStorage.getItem("firstLaunch")) {
    //Segment H2a: Sets default local storage values except for current and past life
    localStorage.setItem("settings", JSON.stringify(database.settings));
    //Segment H2b: Sets current and past life local storage values
    let current_temp = {};
    for (let i = 1; i <= 10; i++) {
        // TODO Change 10 to a database variable (40%)
        current_temp[i] = database.lifeInformation;
    }
    localStorage.setItem("currentInfo", JSON.stringify(current_temp));
    let past_temp = {};
    for (let i = 1; i <= 30; i++) {
        // TODO Change 30 to a database variable (40%)
        past_temp[i] = database.lifeInformation;
    }
    localStorage.setItem("pastInfo", JSON.stringify(past_temp));
    console.log("All Local Storage set to default values");
    localStorage.setItem("firstLaunch", 1);
}

//Segment H4: Transfers any information over from main.html
if (localStorage.getItem("lifeTransfer")) {
    let info = JSON.parse(localStorage.getItem("lifeTransfer"));
    if (info.status == 1) {
        let newInfo = JSON.parse(localStorage.getItem("currentInfo"));
        newInfo[info.lifeNo] = info;
        localStorage.setItem("currentInfo", JSON.stringify(newInfo));
    } else if (info.status == 2) {
        let newInfo = JSON.parse(localStorage.getItem("pastInfo"));
        newInfo[info.lifeNo] = info;
        localStorage.setItem("pastInfo", JSON.stringify(newInfo));
    }
    localStorage.removeItem("lifeTransfer");
}

//Segment H5: This function changes the text in continue life section according to profile.js
var currentInfo = JSON.parse(localStorage.getItem("currentInfo"));
for (let i = 1; i <= 10; i++) {
    if (currentInfo[i].status == 1) {
        if (currentInfo[i].version == "0.3 beta") {
            $(`#continueLife_saveFile${i}_name`).html(`${currentInfo[i].name.first} ${currentInfo[i].name.last}`);
            $(`#continueLife_saveFile${i}_age`).html(`Age: ${currentInfo[i].age.years}`);
            $(`#continueLife_saveFile${i}_date`).html(`Date: ${convert_dict_date(currentInfo[i].date)}`);
        } else {
            $(`#continueLife_saveFile${i}_name`).html("Incompatible!");
            $(`#continueLife_saveFile${i}_date`).html(`An life from version ${currentInfo[i].version} is stored here.`);
        }
    }
}

//Segment H6: This function changes the text in the past lives section according to profile.js
var pastInfo = JSON.parse(localStorage.getItem("pastInfo"));
for (let i = 1; i <= 30; i++) {
    if (pastInfo[i].status == 2) {
        if (pastInfo[i].version == "0.3 beta") {
            $(`#pastLives_save${i}_name`).html(`${pastInfo[i].name.first} ${pastInfo[i].name.last}`);
            $(`#pastLives_save${i}_age`).html(`Age: ${pastInfo[i].age.years}`);
            $(`#pastLives_save${i}_date`).html(`Lifespan: ${convert_dict_date(pastInfo[i].birthday)} - ${convert_dict_date(pastInfo[i].date)}`);
            $(`#pastLives_save${i}_wealth`).html(`Net Worth: ${pastInfo[i].netWorth.toLocaleString("en-AU", {style: "currency", currency: "AUD"})}`);
            $(`#pastLives_save${i}_career`).html(`Career: ${pastInfo[i].career.longest}`);
        } else {
            $(`#pastLives_save${i}_name`).html("Incompatible!");
            $(`#pastLives_save${i}_date`).html(`An life from version ${pastInfo[i].version} is stored here.`);
        }
    }
}

//Segment H7: This function changes the settings according to setting local storages
settings_initialise(); //Defined in functions.js

//Segment H9: This function variables that are transferred throughout functions
var {volume: volume_temp, theme: theme_temp, gameSpeed: gameSpeed_temp} = JSON.parse(localStorage.getItem("settings"));
var newFirstName_temp = "";
var newSurname_temp = "";
var newGender_temp = "";
var newDate_temp = 0;
var lifeNo_temp = 0;

//Segment H11: This function sets the default date of #newLife_dob to the current day
$(document).ready(function () {
    let now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    let today = now.getFullYear() + "-" + month + "-" + day;
    $("#newLife_dob").val(today);
});

//Segment H12: This function changes the text on the secondary overlay according to which life has been chosen
function continueFn(lifeNo) {
    lifeNo_temp = lifeNo;
    if (currentInfo[lifeNo].status == 1 && currentInfo[lifeNo].version == "0.3 beta") {
        $("#continueLife2_h1").html(`Continue Life ${lifeNo.toString()}?`);
        $("#continueLife2_p").html(
            `Would you like to continue the life of 
            <strong>${currentInfo[lifeNo].name.first} ${currentInfo[lifeNo].name.last}</strong>, 
            aged <strong>${currentInfo[lifeNo].age.years}</strong>, 
            from <strong>${convert_dict_date(currentInfo[lifeNo].date)}</strong>?`
        );
        displayType("continueLife2_overlay", "block");
    }
}

function pastFn(lifeNo) {
    let pastLife = JSON.parse(localStorage.getItem("pastInfo"))[lifeNo];
    if (pastLife.status == 2 && pastLife.version == "0.3 beta") {
        displayType("pastLives2_overlay", "block");
        $("#pastLives2_h1").html(pastLife.name.first + " " + pastLife.name.last + "'s diary");
        $("#pastLives2_p").html(pastLife.diary.toString());
    }
}

//Segment H13: This function loads the game onto the main tab
function continueLife() {
    localStorage.setItem("lifeTransfer", JSON.stringify(JSON.parse(localStorage.getItem("currentInfo"))[lifeNo_temp]));
    window.location.href = "data/main.html";
}

//Segment H14: This function changes the text on the secondary overlay according to the settings
function settings_sure() {
    displayType("settings2_overlay", "block");
    volume_temp = $("#settings_volume").val();
    if ($("#settings_gameSpeed1").prop("checked")) {
        gameSpeed_temp = 1;
    } else if ($("#settings_gameSpeed2").prop("checked")) {
        gameSpeed_temp = 2;
    } else {
        gameSpeed_temp = 3;
    }
}

//Segment H15: This function changes the value of the settings theme button
function settings_theme() {
    if (theme_temp == database.themeNames.length - 1) {
        theme_temp = 1;
    } else {
        theme_temp = theme_temp + 1;
    }
    $("#settings_theme").css("backgroundImage", `url('data/wallpapers/previews/${database.themeNames[i]}')`);
}

//Segment H17: This function activates when user tries to start a life
function newLife_sure() {
    //Segment H17a: Invalid First Name
    if ($("#newLife_firstName").val().length == 0) {
        $("#newLife2_h1").html("Invalid First Name!");
        $("#newLife2_p").html(
            "Please enter a first name. Do you really want your character to live their life without a name? Imagine how much they'll get bullied!"
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    //Segment H17b: Invalid Surname
    else if ($("#newLife_surname").val().length == 0) {
        $("#newLife2_h1").html("Invalid Surname!");
        $("#newLife2_p").html(
            `Please enter a surname. You can't just have someone with a first name but no last name. Imagine your your birth certificate with just "John". That would be awkward wouldn't it?`
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    //Segment H17c: Invalid Gender
    else if ($("#newLife_gender_male").prop("checked") == false && $("#newLife_gender_female").prop("checked") == false) {
        $("#newLife2_h1").html("Invalid Gender!");
        $("#newLife2_p").html(
            "Please enter a gender. I know some people don't really like to identify them as either Male or Female but you got to be born either of the two!"
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    //Segment H17d: Invalid Date
    else if ($("#newLife_dob").val().toString().length == 0) {
        $("#newLife2_h1").html("Invalid Date!");
        $("#newLife2_p").html(
            "Please enter a date of birth. I haven't heard of anyone who was never born, and just exists. Maybe you're one but Life Simulator could only simulate lives of mortals!"
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    //Segment H17e: All is valid
    else {
        newFirstName_temp = $("#newLife_firstName").val();
        newSurname_temp = $("#newLife_surname").val();
        if ($("#newLife_gender_male").prop("checked")) {
            newGender_temp = "m";
        } else if ($("#newLife_gender_female").prop("checked")) {
            newGender_temp = "f";
        }
        newDate_temp = $("#newLife_dob").val();
        displayType("newLife2_yes", "block");
        displayType("newLife2_no", "block");
        $("#newLife2_h1").html("Start Life?");
        $("#newLife2_p").html(
            `Would you like to start the life of 
            <strong>${newFirstName_temp} ${newSurname_temp}</strong>, 
            starting from <strong>${convert_calendar_date(newDate_temp)}</strong>?`
        );
        displayType("newLife2_overlay", "block");
    }
}

//Segment H18: This function activates when user is sure they want to start their life
function createlife() {
    let info = database.lifeInformation;
    info.status = 1;
    info.name.first = newFirstName_temp;
    info.name.last = newSurname_temp;
    info.date = info.birthday = convert_calendar_dict(newDate_temp);
    info.gender = newGender_temp;
    let iqX = Math.random();
    if (iqX >= 0.5) {
        info.iq = Math.round(8 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
    } else {
        iqX = 1 - iqX;
        info.iq = Math.round(-5 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
    }
    localStorage.setItem("lifeTransfer", JSON.stringify(info));
    window.location.href = "data/main.html";
}

//Segment H19: Following code makes final adjustments to page
$("#home_version").fitText(40);
