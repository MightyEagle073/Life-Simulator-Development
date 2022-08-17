//Segment M1: Checks if cookies work
localStorage.setItem("test", 1)
if (localStorage.getItem("test") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment M2: Checks if life actually exists
if (localStorage.getItem("active_dsb") == null || localStorage.getItem("death") == 1) {
	document.getElementById("notstarted_overlay").style.display = "block";
}

//Segment M3: This function changes the theme depending on which one has been chosen by profile.js
function switch_theme() {
	for (let i = 1; i <= 12; i++) {
		if (parseInt(localStorage.getItem("theme")) == i) {
			document.getElementById("main_body").style.backgroundImage = `url('wallpapers/${database_theme_names[i]}')`;
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}
switch_theme()

//Segment M4: This segment changes the life information on the diary (top left) and information (top right) tabs
document.getElementById("main_diary_h1").innerHTML = localStorage.getItem("active_firstname") + " " + localStorage.getItem("active_surname") + "'s Diary"
document.getElementById("main_info_age").innerHTML = "Age: " + localStorage.getItem("active_age_years") + " years " + localStorage.getItem("active_age_days") + " days"
switch (localStorage.getItem("active_gender")) {
	case "m":
		document.getElementById("main_info_gender").innerHTML = "Gender: Male"
		break;
	case "f":
		document.getElementById("main_info_gender").innerHTML = "Gender: Female"
		break;
	default:
		document.getElementById("main_info_gender").innerHTML = "Gender: Error! You might want to restart your game."
}
document.getElementById("main_info_birthday").innerHTML = "Birthday:" + " " + localStorage.getItem("active_birthday")
document.getElementById("main_control_currentdate").innerHTML = localStorage.getItem("active_date")
document.getElementById("main_control_speed").value = 0

//Segment M5: Below are functions turns on overlays on button press
//Segment M5a: This function turns on the education overlay when the education button on the action bar has been pressed
function education_overlay_on() {
	document.getElementById("education_overlay").style.display = "block";
}
//Segment M5b: This function turns off the education overlay when the close button has been pressed
function education_overlay_off() {
	document.getElementById("education_overlay").style.display = "none";
}
//Segment M5c: This function turns on the secondary education overlay when the view past results button has been pressed
function education_overlay_on() {
	document.getElementById("education2_overlay").style.display = "block";
}
//Segment M5d: This function turns off the secondary education overlay when the blose button has been pressed
function education_overlay_off() {
	document.getElementById("education2_overlay").style.display = "none";
}
//Segment M53: This function turns on the end life overlay when the end life button has been pressed
function end_overlay_on() {
	document.getElementById("end_overlay").style.display = "block";
}
//Segment M5f: This function turns off the end life overlay when the close button has been pressed
function end_overlay_off() {
	document.getElementById("end_overlay").style.display = "none";
}
//Segment M5g: This function turns on the preserve life overlay when the preserve life button has been pressed
function preserve_overlay_on() {
	document.getElementById("preserve_overlay").style.display = "block";
}
//Segment M5h: This function turns off the preserve life overlay when the close button has been pressed
function preserve_overlay_off() {
	document.getElementById("preserve_overlay").style.display = "none";
}
//Segment M5i: This function turns on the save overlay when the save button on the action bar has been pressed
function save_overlay_on() {
	document.getElementById("save_overlay").style.display = "block";
}
//Segment M5j: This function turns off the save overlay when the close button has been pressed
function save_overlay_off() {
	document.getElementById("save_overlay").style.display = "none";
}
//Segment M5k: This function turns on the settings overlay when the settings button on the action bar has been pressed
function settings_overlay_on() {
	document.getElementById("settings_overlay").style.display = "block";
}
//Segment M5l: This function turns off the settings overlay when the close button has been pressed
function settings_overlay_off() {
	document.getElementById("settings_overlay").style.display = "none";
}
//Segment M5m: This function turns off the secondary settings overlay when the close button or the no button has been pressed
function settings2_overlay_off() {
	document.getElementById("settings2_overlay").style.display = "none";
}

//Segment M6: This function creates temporary variables that can later be changed
var volume_temp = parseInt(localStorage.getItem("volume"));
var theme_temp = parseInt(localStorage.getItem("theme"));
var gamespeed_temp = parseInt(localStorage.getItem("gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;

//Segment M7: This function changes the text on the secondary overlay according to the settings
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

//Segment M8: This function changes the value of the settings theme button
function settings_theme() {
	if (theme_temp == 12) {
		theme_temp = 1
	}
	else {
		theme_temp = theme_temp + 1
	}
	for (let i = 1; i <= 12; i++) {
		if (theme_temp == i) {
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}

//Segment M9: This function saves all changes made in the settings overlay to profile.js
function settings_save() {
	localStorage.setItem("volume", volume_temp);
	localStorage.setItem("theme", theme_temp);
	localStorage.setItem("gamespeed", gamespeed_temp);
	switch_theme()
	settings2_overlay_off()
}

//Segment M10: This function adds the wait function, which tells the program to hold for a given amount of milliseconds
function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}

//Segment M11: This segment defines lsr(), which stands for Local Storage Replace. This basically replaces the curly brackets inside the quote, defined in the database, with a local storage variable.
function lsr(input) {
	let array = input.split(/{|}/)
	for (let i = 1; i < array.length; i += 2) {
		array[i] = localStorage.getItem(array[i])
	}
	output = array.join("")
	return output
}

//Segment M11: This segment defines progress(), which forwards the game by one day, and determines what happens during that day. Instead of dividing this into subsegments, this segment will be divided into tasks. This version (0.3.0) will perform 8 tasks for each iteration, and will be labelled as such. Future versions may perform more and more tasks per iteration. Not all tasks may be performed in an iteration. 
function progress() {
	if (breakfn == 0) {
		//Task 1: Upon starting the game, player's life begins, log birth into diary. Only performed during first day of player's life.
		if (localStorage.getItem("active_dsb") == 0) {
			document.getElementById("main_diary_p").innerHTML = localStorage.getItem("active_birthday") + database_diary_born + "<br>";
		}
		//Task 2: Advances time by one day
		localStorage.setItem("active_date", (toDMY(toUnix(localStorage.getItem("active_date")) + 2)))
		//Task 3: Player gets older by one day. If the month and day of the current day and the month and day of the character's birthday matches, the age goes up by 1. Else, the days goes up by 1.
		if (localStorage.getItem("active_date").split("/").slice(0, 2).join("/") == localStorage.getItem("active_birthday").split("/").slice(0, 2).join("/")) {
			localStorage.setItem("active_age_years", (parseInt(localStorage.getItem("active_age_years")) + 1))
			localStorage.setItem("active_age_days", 0)
		}
		else {
			localStorage.setItem("active_age_days", (parseInt(localStorage.getItem("active_age_days")) + 1))
		}
		//Task 4: Active days since birth goes up by one. DSB is never displayed to the player.
		localStorage.setItem("active_dsb", (parseInt(localStorage.getItem("active_dsb")) + 1))
		//Task 5: Current date in the control tab (bottom right) advances by one day.
		document.getElementById("main_control_currentdate").innerHTML = localStorage.getItem("active_date")
		//Task 6: Player's age is changed to the new age (which is now one day older)
		document.getElementById("main_info_age").innerHTML = "Age: " + localStorage.getItem("active_age_years") + " years " + localStorage.getItem("active_age_days") + " days"
		//Task 7: Determines whether the player will die naturally today. If so, end the game. Chances will get higher and higher based on the DSB of player.
		var death_x = Math.random()
		if (Math.pow(10, ((localStorage.getItem("active_dsb"))) * 0.0001) >= 10000000 * death_x) {
			breakfn = 2
			console.log("Dead at " + localStorage.getItem("active_age_years") + " years " + localStorage.getItem("active_age_days") + " days due to a death_x of " + death_x.toString())
			localStorage.setItem("death", "1")
			document.getElementById("main_diary_p").innerHTML = document.getElementById("main_diary_p").innerHTML + localStorage.getItem("active_date") + lsr(database_diary_death)
			document.getElementById("main_audio_death").volume = localStorage.getItem("volume") / 100
			document.getElementById("main_audio_death").play()
			document.getElementById("death_overlay").style.display = "block";
			document.getElementById("death_died").innerHTML = localStorage.getItem("active_firstname") + " " + localStorage.getItem("active_surname") + " has died on " + localStorage.getItem("active_date") + " due to natural causes."
			switch (localStorage.getItem("active_gender")) {
				case "m":
					document.getElementById("death_age").innerHTML = "He was at an age of " + localStorage.getItem("active_age_years") + " years " + localStorage.getItem("active_age_days") + " days."
					break;
				case "f":
					document.getElementById("death_age").innerHTML = "She was at an age of " + localStorage.getItem("active_age_years") + " years " + localStorage.getItem("active_age_days") + " days."
					break;
			}
		}
		//Task 8: Wait a period of time before advancing to the next day.
		wait(1000 * (Math.pow(10, (-0.03 * document.getElementById("main_control_speed").value))) - 1)
	}
}

//Segment M12: This function tells the program what to do when the start and pause buttons are pressed
var iteration = 0
if (localStorage.getItem("death") == 0) {
	var breakfn = 1
}
function timestart() {
	if (breakfn == 1) {
		breakfn = 0
	}
	for (iteration = 0; iteration < 50000; iteration++) {
		setTimeout(function () { progress() }, 0);
	}
}
function timepause() {
	breakfn = 1;
}

//Segment M13: This function ends the life of the current player without saving
function endlife() {
	window.location.href = "../home.html"
}

//Segment M14: This function changes the text on the inside of the save life div
document.getElementById("save_overlay").style.display = "block";
for (let i = 1; i <= 10; i++) {
	if (localStorage.getItem("current_status").split(",")[i] == 1) {
		document.getElementById(`save_div_${i}`).innerHTML = `Life ${i}: ` + localStorage.getItem("current_firstname").split(",")[i] + " " + localStorage.getItem("current_surname").split(",")[i];
	}
}

//Segment M15: This function changes the text on the inside of the preserve life div
function preserve() {
	document.getElementById("preserve_overlay").style.display = "block";
	for (let i = 1; i <= 30; i++) {
		if (localStorage.getItem("past_status").split(",")[i] == 1) {
			document.getElementById(`preserve_div_${i}`).innerHTML = `Life ${i}: ` + localStorage.getItem("past_name").split(",")[i];
		}
	}
}

//Segment M16: This function saves the life into the continue lives tab
function save_life(life_no) {
	localStorage.setItem("current_status", (localStorage.getItem("current_status").split(",").splice(0, life_no) + ",1," + localStorage.getItem("current_status").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_firstname", (localStorage.getItem("current_firstname").split(",").splice(0, life_no) + "," + localStorage.getItem("active_firstname") + "," + localStorage.getItem("current_firstname").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_surname", (localStorage.getItem("current_surname").split(",").splice(0, life_no) + "," + localStorage.getItem("active_surname") + "," + localStorage.getItem("current_surname").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_gender", (localStorage.getItem("current_gender").split(",").splice(0, life_no) + "," + localStorage.getItem("active_gender") + "," + localStorage.getItem("current_gender").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_date", (localStorage.getItem("current_date").split(",").splice(0, life_no) + "," + localStorage.getItem("active_date") + "," + localStorage.getItem("current_date").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_age_years", (localStorage.getItem("current_age_years").split(",").splice(0, life_no) + "," + localStorage.getItem("active_age_years") + "," + localStorage.getItem("current_age_years").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_age_days", (localStorage.getItem("current_age_days").split(",").splice(0, life_no) + "," + localStorage.getItem("active_age_days") + "," + localStorage.getItem("current_age_days").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_birthday", (localStorage.getItem("current_birthday").split(",").splice(0, life_no) + "," + localStorage.getItem("active_birthday") + "," + localStorage.getItem("current_birthday").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_date", (localStorage.getItem("current_date").split(",").splice(0, life_no) + "," + localStorage.getItem("active_date") + "," + localStorage.getItem("current_date").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("current_dsb", (localStorage.getItem("current_dsb").split(",").splice(0, life_no) + "," + localStorage.getItem("active_dsb") + "," + localStorage.getItem("current_dsb").split(",").splice(life_no + 1)).split(","))
	window.location.href = "../home.html"
}

//Segment M17: This function saves the life into the pasts lives tab
function preserve_life(life_no) {
	localStorage.setItem("past_status", (localStorage.getItem("past_status").split(",").splice(0, life_no) + ",1," + localStorage.getItem("past_status").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("past_name", (localStorage.getItem("past_name").split(",").splice(0, life_no) + "," + localStorage.getItem("active_firstname") + " " + localStorage.getItem("active_surname") + "," + localStorage.getItem("past_name").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("past_age", (localStorage.getItem("past_age").split(",").splice(0, life_no) + "," + localStorage.getItem("active_age_years") + "," + localStorage.getItem("past_age").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("past_date", (localStorage.getItem("past_date").split(",").splice(0, life_no) + "," + localStorage.getItem("active_date") + "," + localStorage.getItem("past_date").split(",").splice(life_no + 1)).split(","))
	window.location.href = "../home.html"
}

//Segment M18: Following code makes final adjustments to page
save_overlay_off();