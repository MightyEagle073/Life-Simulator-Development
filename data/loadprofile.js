//Sets settings to default values if not already set
if (Cookies.get("volume") == null) {
	Cookies.set("volume", 100);
}
if (Cookies.get("theme") == null) {
	Cookies.set("theme", 1);
}
if (Cookies.get("gamespeed") == null) {
	Cookies.set("gamespeed", 1);
}

//Sets profile values to default values if not already set
console.log(Cookies.get("firstlaunch"));
if (Cookies.get("firstlaunch") == null) {
	Cookies.set("current_status", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_firstname", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_surname", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_gender", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_date", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_birthday", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_age_years", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_age_days", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_dsb", "0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_status", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_name", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_age", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_date", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_wealth", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_career", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	console.log("All cookies set to default values");
}

//Sets first launch variable to 1, then checks if cookies work
Cookies.set("firstlaunch", 1)
if (Cookies.get("firstlaunch") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//This function changes the text in continue life section according to profile.js
for (let i = 1; i <= 10; i++) {
	if (Cookies.get("current_status").split(",")[i] == 1) {
		document.getElementById(`continuelife_savefile${i}_name`).innerHTML = Cookies.get("current_firstname").split(",")[i] + " " + Cookies.get("current_surname").split(",")[i];
		document.getElementById(`continuelife_savefile${i}_age`).innerHTML = "Age: " + Cookies.get("current_age_years").split(",")[i];
		document.getElementById(`continuelife_savefile${i}_date`).innerHTML = "Date: " + Cookies.get("current_date").split(",")[i];
	}
}

// //This function changes the text in the past lives section according to profile.js
for (let i = 1; i <= 30; i++) {
	if (Cookies.get("past_status").split(",")[i] == 1) {
		document.getElementById(`pastlives_save${i}_name`).innerHTML = Cookies.get("past_name").split(",")[i];
		document.getElementById(`pastlives_save${i}_age`).innerHTML = "Age: " + Cookies.get("past_age").split(",")[i];
		document.getElementById(`pastlives_save${i}_date`).innerHTML = "Date: " + Cookies.get("past_date").split(",")[i];
		document.getElementById(`pastlives_save${i}_wealth`).innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[i];
		document.getElementById(`pastlives_save${i}_career`).innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[i]];
	}
}

//This function changes the settings according to profile.js
document.getElementById("settings_volume").value = Cookies.get("volume");
if (parseInt(Cookies.get("gamespeed")) == 1) {
	document.getElementById("settings_gamespeed1").checked = true;
}
else if (parseInt(Cookies.get("gamespeed")) == 2) {
	document.getElementById("settings_gamespeed2").checked = true;
}
else {
	document.getElementById("settings_gamespeed3").checked = true;
}

//This function changes the theme depending on which one has been chosen by profile.js
function switch_theme() {
	for (let i = 1; i <= 12; i++) {
		if (parseInt(Cookies.get("theme")) == i) {
			document.getElementById("home_body").style.backgroundImage = `url('data/wallpapers/${database_theme_names[i]}')`;
			document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}
switch_theme()

//This function creates temporary variables that can later be changed
var volume_temp = parseInt(Cookies.get("volume"));
var theme_temp = parseInt(Cookies.get("theme"));
var gamespeed_temp = parseInt(Cookies.get("gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;
var life_no_temp = 0;

// Below are functions turns on overlays on button press
// This function turns on the new life overlay when the new life button has been pressed
function newlife_overlay_on() {
	document.getElementById("newlife_overlay").style.display = "block";
}
// This function turns off the new life overlay when the close button has been pressed
function newlife_overlay_off() {
	document.getElementById("newlife_overlay").style.display = "none";
}
// This function turns on the continue life overlay when the continue life button has been pressed
function continuelife_overlay_on() {
	document.getElementById("continuelife_overlay").style.display = "block";
}
// This function turns off the continue life overlay when the close button has been pressed
function continuelife_overlay_off() {
	document.getElementById("continuelife_overlay").style.display = "none";
}
//This function turns on the past lives overlay when the past lives button has been pressed
function pastlives_overlay_on() {
	document.getElementById("pastlives_overlay").style.display = "block";
}
// This function turns off the past lives overlay when the close button has been pressed
function pastlives_overlay_off() {
	document.getElementById("pastlives_overlay").style.display = "none";
}
//This function turns on the settings overlay when the past lives button has been pressed
function settings_overlay_on() {
	document.getElementById("settings_overlay").style.display = "block";
}
// This function turns off the settings overlay when the close button has been pressed
function settings_overlay_off() {
	document.getElementById("settings_overlay").style.display = "none";
}
//This function turns on the credits overlay when the past lives button has been pressed
function credits_overlay_on() {
	document.getElementById("credits_overlay").style.display = "block";
}
// This function turns off the credits overlay when the close button has been pressed
function credits_overlay_off() {
	document.getElementById("credits_overlay").style.display = "none";
}
// This function turns off the secondary new live overlay when the close button or the no button has been pressed
function newlife2_overlay_off() {
	document.getElementById("newlife2_overlay").style.display = "none";
}
// This function turns off the secondary continue live overlay when the close button or the no button has been pressed
function continuelife2_overlay_off() {
	document.getElementById("continuelife2_overlay").style.display = "none";
}
// This function turns off the secondary settings overlay when the close button or the no button has been pressed
function settings2_overlay_off() {
	document.getElementById("settings2_overlay").style.display = "none";
}

//This function sets the default date of #newlife_dob to the current day
$(document).ready(function () {
	var now = new Date();
	var month = (now.getMonth() + 1);
	var day = now.getDate();
	if (month < 10)
		month = "0" + month;
	if (day < 10)
		day = "0" + day;
	var today = now.getFullYear() + '-' + month + '-' + day;
	$('#newlife_dob').val(today);
});

//This function changes the text on the secondary overlay according to which life has been chosen
function continueFn(life_no) {
	life_no_temp = life_no
	if (Cookies.get("current_status").split(",")[life_no] == 1) {
		document.getElementById("continuelife2_h1").innerHTML = "Continue Life " + life_no.toString() + "?";
		document.getElementById("continuelife2_p").innerHTML = "Would you like to continue the life of <strong>" + Cookies.get("current_firstname").split(",")[life_no] + " " + Cookies.get("current_surname").split(",")[life_no] + "</strong>, aged <strong>" + Cookies.get("current_age_years").split(",")[life_no] + "</strong>, from <strong>" + Cookies.get("current_date").split(",")[life_no] + "</strong>?";
		document.getElementById("continuelife2_overlay").style.display = "block";
	}
}

//This function loads the game onto the main tab
function continuelife() {
	Cookies.set("active_firstname", Cookies.get("current_firstname").split(",")[life_no_temp]);
	Cookies.set("active_surname", Cookies.get("current_surname").split(",")[life_no_temp]);
	Cookies.set("active_gender", Cookies.get("current_gender").split(",")[life_no_temp]);
	Cookies.set("active_date", Cookies.get("current_date").split(",")[life_no_temp]);
	Cookies.set("active_birthday", Cookies.get("current_birthday").split(",")[life_no_temp]);
	Cookies.set("active_age_years", Cookies.get("current_age_years").split(",")[life_no_temp]);
	Cookies.set("active_age_days", Cookies.get("current_age_days").split(",")[life_no_temp]);
	Cookies.set("active_dsb", Cookies.get("current_dsb").split(",")[life_no_temp]);
	Cookies.set("death", "0");
	window.location.href = "data/main.html"
}

//This function changes the text on the secondary overlay according to the settings
function settings_sure() {
	document.getElementById("settings2_overlay").style.display = "block";
	volume_temp = document.getElementById("settings_volume").value;
	if (document.getElementById("settings_gamespeed1").checked) {
		gamespeed_temp = 1;
	}
	else if (document.getElementById("settings_gamespeed2").checked) {
		gamespeed_temp = 2;
	}
	else {
		gamespeed_temp = 3;
	}
}

//This function changes the value of the settings theme button
function settings_theme() {
	if (theme_temp == 12) {
		theme_temp = 1
	}
	else {
		theme_temp = theme_temp + 1
	}
	for (let i = 1; i <= 12; i++) {
		if (theme_temp == i) {
			document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}

//This function saves all changes made in the settings overlay to profile.js
function settings_save() {
	Cookies.set("volume", volume_temp);
	Cookies.set("theme", theme_temp);
	Cookies.set("gamespeed", gamespeed_temp);
	switch_theme()
	settings2_overlay_off()
}

function newlife_sure() {
	if (document.getElementById("newlife_firstname").value.length == 0) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid First Name!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a first name. Do you really want your character to live their life without a name? Imagine how much they'll get bullied!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else if (document.getElementById("newlife_surname").value.length == 0) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid Surname!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a surname. You can't just have someone with a first name but no last name. Imagine your full name being John. That would be awkward wouldn't it?"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else if (document.getElementById("newlife_gender_male").checked == false && document.getElementById("newlife_gender_female").checked == false) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid Gender!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a gender. I know some people don't really like to identify them as either Male or Female but you got to be born either of the two!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else if (document.getElementById("newlife_dob").value.toString().length == 0) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid Date!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a date of birth. I haven't heard of anyone who was never born, and just exists. Maybe you're one but Life Simulator could only simulate lives of mortals!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else {
		newfirstname_temp = document.getElementById("newlife_firstname").value;
		newsurname_temp = document.getElementById("newlife_surname").value;
		if (document.getElementById("newlife_gender_male").checked) {
			newgender_temp = "m";
		}
		else if (document.getElementById("newlife_gender_female").checked) {
			newgender_temp = "f";
		}
		newdate_temp = document.getElementById("newlife_dob").value;
		document.getElementById("newlife2_yes").style.display = "block";
		document.getElementById("newlife2_no").style.display = "block";
		document.getElementById("newlife2_h1").innerHTML = "Start Life?"
		document.getElementById("newlife2_p").innerHTML = "Would you like to start the life of <strong>" + newfirstname_temp + " " + newsurname_temp + "</strong>, starting from <strong>" + changeDMY(newdate_temp) + "</strong>?"
		document.getElementById("newlife2_overlay").style.display = "block";
	}
}
function createlife() {
	Cookies.set("active_firstname", newfirstname_temp);
	Cookies.set("active_surname", newsurname_temp);
	Cookies.set("active_gender", newgender_temp);
	Cookies.set("active_date", changeDMY(newdate_temp));
	Cookies.set("active_birthday", changeDMY(newdate_temp));
	Cookies.set("active_age_years", "0");
	Cookies.set("active_age_days", "0");
	Cookies.set("active_dsb", "0")
	Cookies.set("death", "0")
}