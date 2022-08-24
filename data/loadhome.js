//Segment H1: Sets default local storage values if not already set
console.log(localStorage.getItem("firstlaunch"));
if (localStorage.getItem("firstlaunch") == null) {
	//Segment H1a: Sets current and past life data to empty values
	for (let i = 1; i <= 10; i++) {
		let xmldata = ""
		for (let j = 0; j < database_life_variables.length; j++) {
			xmldata = xmldata + "<" + database_life_variables[j] + ">" + "</" + database_life_variables[j] + "> \n"
		}
		localStorage.setItem(`current_${i}`, xmldata)
	}
	for (let i = 1; i <= 30; i++) {
		let xmldata = ""
		for (let j = 0; j < database_life_variables.length; j++) {
			xmldata = xmldata + "<" + database_life_variables[j] + ">" + "</" + database_life_variables[j] + "> \n"
		}
		localStorage.setItem(`past_${i}`, xmldata)
	}
	//Segment H1b: Sets transfer value
	let xmldata = ""
	for (let i = 0; i < database_life_variables.length; i++) {
		xmldata = xmldata + "<" + database_life_variables[i] + ">" + "</" + database_life_variables[i] + "> \n"
	}
	localStorage.setItem("transfer", xmldata)
	//Segment H1c: Sets firefox status values 
	if(navigator.userAgent.indexOf("Firefox") != -1) {
		localStorage.setItem("current_status", "00000000000");
		localStorage.setItem("past_status", "0000000000000000000000000000000");
	}
	//Segment H1d: Sets default settings
	localStorage.setItem("settings_volume", 100);
	localStorage.setItem("settings_theme", 1);
	localStorage.setItem("settings_gamespeed", 1);
	console.log("All Local Storage set to default values");
}

//Segment H2: Sets first launch variable to 1, then checks if local storage work
localStorage.setItem("firstlaunch", 1)
if (localStorage.getItem("firstlaunch") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment H3: This segment defines liferead() and lifewrite(), which is used to read and write data into the XML formatted local storages (current life, past life and transfer).
function lsread(tag, type, lifeno) {
	let startreplace = "<" + tag + ">"
	let endreplace = "</" + tag + ">"
	if (type == "current") {
		var array = localStorage.getItem("current_" + lifeno.toString()).replace(startreplace, "{}").replace(endreplace,"{}").split("{}")
	}
	else if (type == "past") {
		var array = localStorage.getItem("past_" + lifeno.toString()).replace(startreplace, "{}").replace(endreplace,"{}").split("{}")
	}
	else if (type == "transfer") {
		var array = localStorage.getItem("transfer").replace(startreplace, "{}").replace(endreplace,"{}").split("{}")
	}
	return array[1]
}
function lswrite(tag, type, lifeno, input) {
	let startreplace = "<" + tag + ">"
	let endreplace = "</" + tag + ">"
	if (type == "current") {
		var output1 = "current_" + lifeno.toString
		var array = localStorage.getItem("current_" + lifeno.toString()).replace(startreplace, "{}").replace(endreplace,"{}").split("{}")
	}
	else if (type == "past") {
		var output1 = "current_" + lifeno.toString
		var array = localStorage.getItem("past_" + lifeno.toString()).replace(startreplace, "{}").replace(endreplace,"{}").split("{}")
	}
	else if (type == "transfer") {
		var output1 = "transfer"
		var array = localStorage.getItem("transfer").replace(startreplace, "{}").replace(endreplace,"{}").split("{}")
	}
	array[1] = input
	let output2 = array[0] + startreplace + array[1] + endreplace + array[2]
	localStorage.setItem(output1, output2)
}

//Segment H4: Download from main.html
//Segment H4a: Local Storage Transfer
if (lsread("status", "transfer", 0) == 1) {
	for (let i = 1; i <= database_life_variables.length; i++) {
		lswrite(database_life_variables[i], "current", lsread("lifeno", "transfer", 0), lsread(database_life_variables[i], "transfer", lifeno))
	}
	lswrite("status", "transfer", 0, 0)
	lswrite("lifeno", "transfer", 0, "")
}
else if (lsread("status", "transfer", 0) == 2) {
	for (let i = 1; i <= database_life_variables.length; i++) {
		lswrite(database_life_variables[i], "past", lsread("lifeno", "transfer", 0), lsread(database_life_variables[i], "transfer", lifeno))
	}
	lswrite("status", "transfer", 0, 0)
	lswrite("lifeno", "transfer", 0, "")
}
//Segment H4b: Firefox Cookie Transfer
if(navigator.userAgent.indexOf("Firefox") != -1) {
	if (Cookies.get("firefox_transfer") == 1) {
		for (let i = 1; i <= database_localstorage_names.length; i++) {
			localStorage.setItem(database_localstorage_names[i], Cookies.get(database_localstorage_names[i]))
		}
		Cookies.set("firefox_transfer", 0)
		console.log("Cookie transfer successful")
	}
}
function cookie_transfer() {
	if(navigator.userAgent.indexOf("Firefox") != -1) {
		console.log("Commenced cookie transfer")
		Cookies.set("firefox_transfer", 1)
		for (let i = 1; i <= database_localstorage_names.length; i++) {
			Cookies.set(database_localstorage_names[i], localStorage.getItem(database_localstorage_names[i]))
		}
	}
}

//Segment H5: This function changes the text in continue life section according to profile.js
for (let i = 1; i <= 10; i++) {
	if (lsread("status", "current", i) == 1) {
		document.getElementById(`continuelife_savefile${i}_name`).innerHTML = lsread("name_first", "current", i) + " " + lsread("name_last", "current", i);
		document.getElementById(`continuelife_savefile${i}_age`).innerHTML = "Age: " + lsread("age_years", "current", i);
		document.getElementById(`continuelife_savefile${i}_date`).innerHTML = "Date: " + lsread("date", "current", i);
	}
}

//Segment H6: This function changes the text in the past lives section according to profile.js
for (let i = 1; i <= 30; i++) {
	if (lsread("status", "past", i) == 1) {
		document.getElementById(`pastlives_save${i}_name`).innerHTML = lsread("name", "past", i);
		document.getElementById(`pastlives_save${i}_age`).innerHTML = "Age: " + lsread("age", "past", i);
		document.getElementById(`pastlives_save${i}_date`).innerHTML = "Date: " + lsread("date", "past", i);
		document.getElementById(`pastlives_save${i}_wealth`).innerHTML = "Net Worth: $" + lsread("wealth", "past", i);
		document.getElementById(`pastlives_save${i}_career`).innerHTML = "Career: " + database_careers[lsread("career", "past", i)];
	}
}

//Segment H7: This function changes the settings according to profile.js
document.getElementById("settings_volume").value = localStorage.getItem("settings_volume");
if (parseInt(localStorage.getItem("gamespeed")) == 1) {
	document.getElementById("settings_gamespeed1").checked = true;
}
else if (parseInt(localStorage.getItem("gamespeed")) == 2) {
	document.getElementById("settings_gamespeed2").checked = true;
}
else {
	document.getElementById("settings_gamespeed3").checked = true;
}

//Segment H8: This function changes the theme depending on which one has been chosen by profile.js
function switch_theme() {
	for (let i = 1; i <= database_theme_names.length - 1; i++) {
		if (parseInt(localStorage.getItem("settings_theme")) == i) {
			document.getElementById("home_body").style.backgroundImage = `url('data/wallpapers/${database_theme_names[i]}')`;
			document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}
switch_theme()

//Segment H9: This function creates temporary variables that can later be changed
var volume_temp = parseInt(localStorage.getItem("settings_volume"));
var theme_temp = parseInt(localStorage.getItem("settings_theme"));
var gamespeed_temp = parseInt(localStorage.getItem("settings_gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;
var life_no_temp = 0;

//Segment H10: Below are functions turns on overlays on button press
//Segment H10a: This function turns on the new life overlay when the new life button has been pressed
function newlife_overlay_on() {
	document.getElementById("newlife_overlay").style.display = "block";
}
//Segment H10b: This function turns off the new life overlay when the close button has been pressed
function newlife_overlay_off() {
	document.getElementById("newlife_overlay").style.display = "none";
}
//Segment H10c: This function turns on the continue life overlay when the continue life button has been pressed
function continuelife_overlay_on() {
	document.getElementById("continuelife_overlay").style.display = "block";
}
//Segment H10d: This function turns off the continue life overlay when the close button has been pressed
function continuelife_overlay_off() {
	document.getElementById("continuelife_overlay").style.display = "none";
}
//Segment H10e: This function turns on the past lives overlay when the past lives button has been pressed
function pastlives_overlay_on() {
	document.getElementById("pastlives_overlay").style.display = "block";
}
//Segment H10f: This function turns off the past lives overlay when the close button has been pressed
function pastlives_overlay_off() {
	document.getElementById("pastlives_overlay").style.display = "none";
}
//Segment H10g: This function turns on the settings overlay when the past lives button has been pressed
function settings_overlay_on() {
	document.getElementById("settings_overlay").style.display = "block";
}
//Segment H10h: This function turns off the settings overlay when the close button has been pressed
function settings_overlay_off() {
	document.getElementById("settings_overlay").style.display = "none";
}
//Segment H10i: This function turns on the credits overlay when the past lives button has been pressed
function credits_overlay_on() {
	document.getElementById("credits_overlay").style.display = "block";
}
//Segment H10j: This function turns off the credits overlay when the close button has been pressed
function credits_overlay_off() {
	document.getElementById("credits_overlay").style.display = "none";
}
//Segment H10k: This function turns off the secondary new live overlay when the close button or the no button has been pressed
function newlife2_overlay_off() {
	document.getElementById("newlife2_overlay").style.display = "none";
}
//Segment H10l: This function turns off the secondary continue live overlay when the close button or the no button has been pressed
function continuelife2_overlay_off() {
	document.getElementById("continuelife2_overlay").style.display = "none";
}
//Segment H10m: This function turns off the secondary continue live overlay when the close button or the no button has been pressed
function pastlives2_overlay_off() {
	document.getElementById("pastlives2_overlay").style.display = "none";
}
//Segment H10n: This function turns off the secondary settings overlay when the close button or the no button has been pressed
function settings2_overlay_off() {
	document.getElementById("settings2_overlay").style.display = "none";
}

//Segment H11: This function sets the default date of #newlife_dob to the current day
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

//Segment H12: This function changes the text on the secondary overlay according to which life has been chosen
function continueFn(life_no) {
	life_no_temp = life_no
	if (lsread("status", "current", life_no) == 1) {
		document.getElementById("continuelife2_h1").innerHTML = "Continue Life " + life_no.toString() + "?";
		document.getElementById("continuelife2_p").innerHTML = "Would you like to continue the life of <strong>" + lsread("name_first", "current", life_no) + " " + lsread("name_last", "current", life_no) + "</strong>, aged <strong>" + lsread("name_last", "age_years", life_no) + "</strong>, from <strong>" + lsread("date", "current", life_no) + "</strong>?";
		document.getElementById("continuelife2_overlay").style.display = "block";
	}
}
function pastFn(life_no) {
	if (localStorage.getItem("past_status").split(",")[life_no] == 1) {
		document.getElementById("pastlives2_overlay").style.display = "block";
		document.getElementById("pastlives2_h1").innerHTML = lsread("name", "past", life_no) + "'s diary"
		document.getElementById("pastlives2_p").innerHTML = lsread("diary", "past", life_no)
	}
}

//Segment H13: This function loads the game onto the main tab if life is continued
function continuelife() {
	for (let i = 0; i < database_life_variables.length; i++) {
		lswrite(database_life_variables[i], "transfer", 0, lsread(database_life_variables[i], "current", lifeno))
	}
	localStorage.setItem("death", "0");
	cookie_transfer()
	window.location.href = "data/main.html"
}

//Segment H14: This function changes the text on the secondary overlay according to the settings
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

//Segment H15: This function changes the value of the settings theme button
function settings_theme() {
	if (theme_temp == database_theme_names.length - 1) {
		theme_temp = 1
	}
	else {
		theme_temp = theme_temp + 1
	}
	for (let i = 1; i <= database_theme_names.length - 1; i++) {
		if (theme_temp == i) {
			document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}

//Segment H16: This function saves all changes made in the settings overlay to profile.js
function settings_save() {
	localStorage.setItem("settings_volume", volume_temp);
	localStorage.setItem("settings_theme", theme_temp);
	localStorage.setItem("settings_gamespeed", gamespeed_temp);
	switch_theme()
	settings2_overlay_off()
}

//Segment H17: This function activates when user tries to start a life
function newlife_sure() {
	//Segment H17a: Invalid First Name
	if (document.getElementById("newlife_firstname").value.length == 0) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid First Name!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a first name. Do you really want your character to live their life without a name? Imagine how much they'll get bullied!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	//Segment H17b: Invalid Surname
	else if (document.getElementById("newlife_surname").value.length == 0) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid Surname!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a surname. You can't just have someone with a first name but no last name. Imagine your full name being John. That would be awkward wouldn't it?"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	//Segment H17c: Invalid Gender
	else if (document.getElementById("newlife_gender_male").checked == false && document.getElementById("newlife_gender_female").checked == false) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid Gender!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a gender. I know some people don't really like to identify them as either Male or Female but you got to be born either of the two!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	//Segment H17d: Invalid Date
	else if (document.getElementById("newlife_dob").value.toString().length == 0) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid Date!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a date of birth. I haven't heard of anyone who was never born, and just exists. Maybe you're one but Life Simulator could only simulate lives of mortals!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	//Segment H17e: Curly Brackets in name
	else if (document.getElementById("newlife_firstname").value.match(/{|}|<|>/) || document.getElementById("newlife_surname").value.match(/{|}|<|>/)) {
		document.getElementById("newlife2_h1").innerHTML = "Invalid Name!"
		document.getElementById("newlife2_p").innerHTML = "I mean... I won't judge your naming skills (which are clearly horrible), but because of the way Life Simulator is coded, you can't include any curly or angular brackets in your name. You can include other brackets in your name (such as the normal and square ones), but like come on... why not just have a normal name... like Tom... or Hannah... or something?"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	//Segment H17f: All is valid
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

//Segment H18: This function activates when user is sure they want to start their life
function createlife() {
	lswrite("status", "transfer", 0, 1)
	lswrite("age_days", "transfer", 0, 0)
	lswrite("age_years", "transfer", 0, 0)
	lswrite("birthday", "transfer", 0, changeDMY(newdate_temp))
	lswrite("career_current", "transfer", 0, 0)
	lswrite("career_longest", "transfer", 0, 0)
	lswrite("date", "transfer", 0, changeDMY(newdate_temp))
	lswrite("dsb", "transfer", 0, 0)
	lswrite("education", "transfer", 0, 0)
	lswrite("gender", "transfer", 0, newgender_temp)
	lswrite("name_first", "transfer", 0, newfirstname_temp)
	lswrite("name_last", "transfer", 0, newsurname_temp)
	lswrite("networth", "transfer", 0, 0)
	lswrite("diary", "transfer", 0, "Click the play button on the bottom right corner to start your life!")
	localStorage.setItem("death", "0")
	cookie_transfer()
	window.location.href = "data/main.html"
}