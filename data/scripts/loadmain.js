// This script is used to load main.html, and is run after all the html elements 
// of main.html has been initialised.

// Segment M1: Checks if user is using an unsupported brower
if (navigator.userAgent.indexOf("Firefox") != -1) {
    displayType("notSupported_overlay", "block");
}

// Segment M2: Initialises life and settings
if (localStorage.getItem("lifeTransfer")) {
    var lifeInfo = JSON.parse(localStorage.getItem("lifeTransfer"));
} else {
    window.location.href = "../home.html";
}
settings_initialise();

// Segment M3: This segment changes the life information on the diary (top left) 
// and information (top right) tabs
let launch_balance = lifeInfo.balance.toLocaleString("en-AU", {style: "currency", currency: "AUD"})
let launch_netWorth = lifeInfo.netWorth.toLocaleString("en-AU", {style: "currency", currency: "AUD"})
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
$("#main_info_balance").html(`Balance: ${launch_balance}`);
$("#main_info_netWorth").html(`Net Worth: ${launch_netWorth}
`);
$("#main_info_birthday").html("Birthday:" + " " + convert_dict_date(lifeInfo.birthday));
$("#main_control_currentDate").html(convert_dict_date(lifeInfo.date));
$("#main_control_speed").val(0);

//Segment M4: This function creates temporary variables that can later be changed
let settingsJson = JSON.parse(localStorage.getItem("settings"));
var volume_temp = settingsJson.volume;
var theme_temp = settingsJson.theme;
var gameSpeed_temp = settingsJson.gameSpeed;
var breakfn = 1;

//Segment M5: This function changes the text on the inside of the save life tab
for (let i = 1; i <= 10; i++) {
    let currentInfo = JSON.parse(localStorage.getItem("currentInfo"))[i];
    if (currentInfo.status == 1) {
        if (currentInfo.version == "0.3 beta") {
            $(`#save_div_${i}`).html(`Life ${i}: ${currentInfo.name.first} ${currentInfo.name.last}`);
        } else {
            $(`#save_div_${i}`).html("Incompatible Life Stored");
        }
    }
}

//Segment M6: This function changes the text on the inside of the preserve life tab
for (let i = 1; i <= 30; i++) {
    let pastInfo = JSON.parse(localStorage.getItem("pastInfo"))[i];
    if (pastInfo.status == 2) {
        if (pastInfo.version == "0.3 beta") {
            $(`#preserve_div_${i}`).html(`Life ${i}: ${pastInfo.name.first} ${pastInfo.name.last}`);
        } else {
            $(`#preserve_div_${i}`).html("Incompatible Life Stored");
        }
    }
}

//Segment M7: Following code makes final adjustments to page
$("#main_diary_h1").fitText(20);
$("#main_info_h1").fitText(8);
$("#main_control_currentDate").fitText(6);
$(".main_info_p").fitText(20);
