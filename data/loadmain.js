//Segment M1: Checks if local storage work
localStorage.setItem("test", 1)
if (localStorage.getItem("test") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment M2: Define Active Variables
var var_age_days = null
var var_age_years = null
var var_birthday = null
var var_career_current = null
var var_career_longest = null
var var_date = null
var var_dsb = null
var var_education = null
var var_gender = null
var var_name_first = null
var var_name_last = null
var var_net_worth = null

//Segment M3: This segment defines liferead() and lifewrite(), which is used to read and write data into the XML formatted local storages (current life, past life and transfer).
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

//Segment M4: Download from home.html
//Segment M4a: Local Storage Transfer
if (lsread("status", "transfer", 0) == 1) {
	var_age_days = lsread("age_days", "transfer", 0)
	var_age_years = lsread("age_years", "transfer", 0)
	var_birthday = lsread("birthday", "transfer", 0)
	var_career_current = lsread("career_current", "transfer", 0)
	var_career_longest = lsread("career_longest", "transfer", 0)
	var_date = lsread("date", "transfer", 0)
	var_dsb = lsread("dsb", "transfer", 0)
	var_education = lsread("education", "transfer", 0)
	var_gender = lsread("gender", "transfer", 0)
	var_name_first = lsread("name_first", "transfer", 0)
	var_name_last = lsread("name_last", "transfer", 0)
	var_net_worth = lsread("net_worth", "transfer", 0)
	lswrite("status", "transfer", 0, 0)
}
else if (lsread("status", "transfer", 0) == 2) {
	console.log("Dead life tried to transfer")
}

//Segment M4b: Firefox Cookie Transfer
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

//Segment M5: Checks if life actually exists
if (var_dsb == null || localStorage.getItem("death") == 1) {
	document.getElementById("notstarted_overlay").style.display = "block";
}

//Segment M6: This function changes the theme depending on which one has been chosen by profile.js
function switch_theme() {
	for (let i = 1; i <= database_theme_names.length - 1; i++) {
		if (parseInt(localStorage.getItem("settings_theme")) == i) {
			document.getElementById("main_body").style.backgroundImage = `url('wallpapers/${database_theme_names[i]}')`;
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}
switch_theme()

//Segment M7: This segment changes the life information on the diary (top left) and information (top right) tabs
document.getElementById("main_diary_h1").innerHTML = var_name_first + " " + var_name_last + "'s Diary"
document.getElementById("main_info_age").innerHTML = "Age: " + var_age_years + " years " + var_age_days + " days"
switch (var_gender) {
	case "m":
		document.getElementById("main_info_gender").innerHTML = "Gender: Male"
		break;
	case "f":
		document.getElementById("main_info_gender").innerHTML = "Gender: Female"
		break;
	default:
		document.getElementById("main_info_gender").innerHTML = "Gender: Error! You might want to restart your game."
}
document.getElementById("main_info_birthday").innerHTML = "Birthday:" + " " + var_birthday
document.getElementById("main_control_currentdate").innerHTML = var_date
document.getElementById("main_control_speed").value = 0
document.getElementById("main_diary_p").innerHTML = lsread("diary", "transfer", 0)


//Segment M8: Below are functions turns on overlays on button press
//Segment M8a: This function turns on the education overlay when the education button on the action bar has been pressed
function education_overlay_on() {
	document.getElementById("education_overlay").style.display = "block";
}
//Segment M8b: This function turns off the education overlay when the close button has been pressed
function education_overlay_off() {
	document.getElementById("education_overlay").style.display = "none";
}
//Segment M8c: This function turns on the secondary education overlay when the view past results button has been pressed
function education_overlay_on() {
	document.getElementById("education2_overlay").style.display = "block";
}
//Segment M8d: This function turns off the secondary education overlay when the blose button has been pressed
function education_overlay_off() {
	document.getElementById("education2_overlay").style.display = "none";
}
//Segment M8e: This function turns on the end life overlay when the end life button has been pressed
function end_overlay_on() {
	document.getElementById("end_overlay").style.display = "block";
}
//Segment M8f: This function turns off the end life overlay when the close button has been pressed
function end_overlay_off() {
	document.getElementById("end_overlay").style.display = "none";
}
//Segment M8g: This function turns on the preserve life overlay when the preserve life button has been pressed
function preserve_overlay_on() {
	document.getElementById("preserve_overlay").style.display = "block";
}
//Segment M8h: This function turns off the preserve life overlay when the close button has been pressed
function preserve_overlay_off() {
	document.getElementById("preserve_overlay").style.display = "none";
}
//Segment M8i: This function turns on the save overlay when the save button on the action bar has been pressed
function save_overlay_on() {
	document.getElementById("save_overlay").style.display = "block";
}
//Segment M8j: This function turns off the save overlay when the close button has been pressed
function save_overlay_off() {
	document.getElementById("save_overlay").style.display = "none";
}
//Segment M8k: This function turns on the settings overlay when the settings button on the action bar has been pressed
function settings_overlay_on() {
	document.getElementById("settings_overlay").style.display = "block";
}
//Segment M8l: This function turns off the settings overlay when the close button has been pressed
function settings_overlay_off() {
	document.getElementById("settings_overlay").style.display = "none";
}
//Segment M8m: This function turns off the secondary settings overlay when the close button or the no button has been pressed
function settings2_overlay_off() {
	document.getElementById("settings2_overlay").style.display = "none";
}

//Segment M9: This function creates temporary variables that can later be changed
var volume_temp = parseInt(localStorage.getItem("settings_volume"));
var theme_temp = parseInt(localStorage.getItem("settings_theme"));
var gamespeed_temp = parseInt(localStorage.getItem("settings_gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;

//Segment M10: This function changes the text on the secondary overlay according to the settings
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

//Segment M11: This function changes the value of the settings theme button
function settings_theme() {
	if (theme_temp == database_theme_names.length - 1) {
		theme_temp = 1
	}
	else {
		theme_temp = theme_temp + 1
	}
	for (let i = 1; i <= database_theme_names.length - 1; i++) {
		if (theme_temp == i) {
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}

//Segment M12: This function saves all changes made in the settings overlay to profile.js
function settings_save() {
	localStorage.setItem("settings_volume", volume_temp);
	localStorage.setItem("settings_theme", theme_temp);
	localStorage.setItem("settings_gamespeed", gamespeed_temp);
	switch_theme()
	settings2_overlay_off()
}

//Segment M13: This function adds the wait function, which tells the program to hold for a given amount of milliseconds
function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}

//Segment M14: This segment defines lsr(), which stands for Local Storage Replace. This basically replaces the curly brackets inside the quote, defined in the database, with a local storage variable.
function lsr(input) {
	let array = input.split(/{|}/)
	for (let i = 1; i < array.length; i += 2) {
		array[i] = localStorage.getItem(array[i])
	}
	output = array.join("")
	return output
}

//Segment M15: This segment defines progress(), which forwards the game by one day, and determines what happens during that day. Instead of dividing this into subsegments, this segment will be divided into tasks. This version (0.3.0) will perform 8 tasks for each iteration, and will be labelled as such. Future versions may perform more and more tasks per iteration. Not all tasks may be performed in an iteration. 
function progress() {
	if (breakfn == 0) {
		//Task 1: Upon starting the game, player's life begins, log birth into diary. Only performed during first day of player's life.
		if (var_dsb == 0) {
			document.getElementById("main_diary_p").innerHTML = var_birthday + database_diary_born;
		}
		//Task 2: Advances time by one day
		var_dsb = toDMY(toUnix(var_date) + 2)
		//Task 3: Player gets older by one day. If the month and day of the current day and the month and day of the character's birthday matches, the age goes up by 1. Else, the days goes up by 1.
		if (var_date.split("/").slice(0, 2).join("/") == var_birthday.split("/").slice(0, 2).join("/")) {
			var_age_years = parseInt(localStorage.getItem("active_age_years")) + 1
			var_age_days = 0
		}
		else {
			var_age_days = parseInt(localStorage.getItem("active_age_days")) + 1
		}
		//Task 4: Active days since birth goes up by one. DSB is never displayed to the player.
		var_dsb++
		//Task 5: Determines whether the player will die naturally today. If so, end the game. Chances will get higher and higher based on the DSB of player.
		var death_x = Math.random()
		if (Math.pow(10, var_dsb * 0.0001) >= 10000000 * death_x) {
			breakfn = 2
			console.log("Dead at " + var_age_years + " years " + var_age_days + " days due to a death_x of " + death_x.toString())
			localStorage.setItem("death", "1")
			document.getElementById("main_diary_p").innerHTML = document.getElementById("main_diary_p").innerHTML + localStorage.getItem("active_date") + lsr(database_diary_death)
			document.getElementById("main_audio_death").volume = localStorage.getItem("settings_volume") / 100
			document.getElementById("main_audio_death").play()
			document.getElementById("death_overlay").style.display = "block";
			document.getElementById("death_died").innerHTML = var_name_first + " " + var_name_last + " has died on " + var_date + " due to natural causes."
			switch (localStorage.getItem("active_gender")) {
				case "m":
					document.getElementById("death_age").innerHTML = "He was at an age of " + var_age_years + " years " + var_age_days + " days."
					break;
				case "f":
					document.getElementById("death_age").innerHTML = "She was at an age of " + var_age_years + " years " + var_age_days + " days."
					break;
			}
		}
		//Task 6: Updates information throughout the HTML
		document.getElementById("main_control_currentdate").innerHTML = var_date
		document.getElementById("main_info_age").innerHTML = "Age: " + var_age_years + " years " + var_age_days + " days"

		//Task 7: Wait a period of time before advancing to the next day.
		wait(1000 * (Math.pow(10, (-0.03 * document.getElementById("main_control_speed").value))) - 1)
	}
}

//Segment M16: This function tells the program what to do when the start and pause buttons are pressed
if (localStorage.getItem("death") == 0) {
	var breakfn = 1
}
function timestart() {
	if (breakfn == 1) {
		breakfn = 0
	}
	for (let i = 0; i < 50000; i++) {
		setTimeout(function () { progress() }, 0);
	}
}
function timepause() {
	breakfn = 1;
}

//Segment M17: This function ends the life of the current player without saving
function endlife() {
	cookie_transfer()
	window.location.href = "../home.html"
}

//Segment M18: This function changes the text on the inside of the save life div
document.getElementById("save_overlay").style.display = "block";
for (let i = 1; i <= 10; i++) {
	if (lsread("status", "current", i) == 1) {
		document.getElementById(`save_div_${i}`).innerHTML = `Life ${i}: ` + lsread("name_first", "current", i) + " " + lsread("name_last", "current", i);
	}
}

//Segment M17: This function changes the text on the inside of the preserve life div
function preserve() {
	document.getElementById("preserve_overlay").style.display = "block";
	for (let i = 1; i <= 30; i++) {
		if (lsread("status", "past", i) == 1) {
			document.getElementById(`preserve_div_${i}`).innerHTML = `Life ${i}: ` + lsread("name_first", "past", i) + " " + lsread("name_last", "past", i);
		}
	}
}

//Segment M18: This function saves the life into the continue lives tab
function save_life(life_no) {
	lswrite("status", "transfer", 0, 1)
	lswrite("age_days", "transfer", 0, var_age_days)
	lswrite("age_years", "transfer", 0, var_age_years)
	lswrite("birthday", "transfer", 0, var_birthday)
	lswrite("career_current", "transfer", 0, var_career_current)
	lswrite("career_longest", "transfer", 0, var_career_longest)
	lswrite("date", "transfer", 0, var_date)
	lswrite("dsb", "transfer", 0, var_dsb)
	lswrite("education", "transfer", 0, var_education)
	lswrite("gender", "transfer", 0, var_gender)
	lswrite("name_first", "transfer", 0, var_name_first)
	lswrite("name_last", "transfer", 0, var_name_last)
	lswrite("net_worth", "transfer", 0, var_net_worth)
	lswrite("diary", "transfer", 0, document.getElementById("main_diary_p").innerHTML)
	lswrite("lifeno", "transfer", 0, life_no)
	cookie_transfer()
	window.location.href = "../home.html"
}

//Segment M19: This function saves the life into the pasts lives tab
function preserve_life(life_no) {
	lswrite("status", "transfer", 0, 2)
	lswrite("age_days", "transfer", 0, var_age_days)
	lswrite("age_years", "transfer", 0, var_age_years)
	lswrite("birthday", "transfer", 0, var_birthday)
	lswrite("career_current", "transfer", 0, var_career_current)
	lswrite("career_longest", "transfer", 0, var_career_longest)
	lswrite("date", "transfer", 0, var_date)
	lswrite("dsb", "transfer", 0, var_dsb)
	lswrite("education", "transfer", 0, var_education)
	lswrite("gender", "transfer", 0, var_gender)
	lswrite("name_first", "transfer", 0, var_name_first)
	lswrite("name_last", "transfer", 0, var_name_last)
	lswrite("net_worth", "transfer", 0, var_net_worth)
	lswrite("diary", "transfer", 0, document.getElementById("main_diary_p").innerHTML)
	lswrite("lifeno", "transfer", 0, life_no)
	cookie_transfer()
	window.location.href = "../home.html"
}

//Segment M20: Following code makes final adjustments to page
save_overlay_off();