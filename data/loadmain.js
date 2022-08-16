//Checks if cookies work
Cookies.set("test", 1)
if (Cookies.get("test") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Checks if life actually exists
if (Cookies.get("active_dsb") == null || Cookies.get("death") == 1) {
	document.getElementById("notstarted_overlay").style.display = "block";
}

//This function changes the theme depending on which one has been chosen by profile.js
function switch_theme() {
	for (let i = 1; i <= 12; i++) {
		if (parseInt(Cookies.get("theme")) == i) {
			document.getElementById("main_body").style.backgroundImage = `url('wallpapers/${database_theme_names[i]}')`;
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}
switch_theme()

//This function changes the life information
document.getElementById("main_diary_h1").innerHTML = Cookies.get("active_firstname") + " " + Cookies.get("active_surname") + "'s Diary"
document.getElementById("main_info_age").innerHTML = "Age: " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days"
switch (Cookies.get("active_gender")) {
	case "m":
		document.getElementById("main_info_gender").innerHTML = "Gender: Male"
		break;
	case "f":
		document.getElementById("main_info_gender").innerHTML = "Gender: Female"
		break;
	default:
		document.getElementById("main_info_gender").innerHTML = "Gender: Error! You might want to restart your game."
}
document.getElementById("main_info_birthday").innerHTML = "Birthday:" + " " + Cookies.get("active_birthday")
document.getElementById("main_control_currentdate").innerHTML = Cookies.get("active_date")
document.getElementById("main_control_speed").value = 0

// This function turns on the education overlay when the education button on the action bar has been pressed
function education_overlay_on() {
	document.getElementById("education_overlay").style.display = "block";
}
// This function turns off the education overlay when the close button has been pressed
function education_overlay_off() {
	document.getElementById("education_overlay").style.display = "none";
}
// This function turns on the secondary education overlay when the view past results button has been pressed
function education_overlay_on() {
	document.getElementById("education2_overlay").style.display = "block";
}
// This function turns off the secondary education overlay when the blose button has been pressed
function education_overlay_off() {
	document.getElementById("education2_overlay").style.display = "none";
}
// This function turns on the end life overlay when the end life button has been pressed
function end_overlay_on() {
	document.getElementById("end_overlay").style.display = "block";
}
// This function turns off the end life overlay when the close button has been pressed
function end_overlay_off() {
	document.getElementById("end_overlay").style.display = "none";
}
// This function turns on the preserve life overlay when the preserve life button has been pressed
function preserve_overlay_on() {
	document.getElementById("preserve_overlay").style.display = "block";
}
// This function turns off the preserve life overlay when the close button has been pressed
function preserve_overlay_off() {
	document.getElementById("preserve_overlay").style.display = "none";
}
//This function turns on the save overlay when the save button on the action bar has been pressed
function save_overlay_on() {
	document.getElementById("save_overlay").style.display = "block";
}
// This function turns off the save overlay when the close button has been pressed
function save_overlay_off() {
	document.getElementById("save_overlay").style.display = "none";
}
//This function turns on the settings overlay when the settings button on the action bar has been pressed
function settings_overlay_on() {
	document.getElementById("settings_overlay").style.display = "block";
}
// This function turns off the settings overlay when the close button has been pressed
function settings_overlay_off() {
	document.getElementById("settings_overlay").style.display = "none";
}
// This function turns off the secondary settings overlay when the close button or the no button has been pressed
function settings2_overlay_off() {
	document.getElementById("settings2_overlay").style.display = "none";
}

//This function creates temporary variables that can later be changed
var volume_temp = parseInt(Cookies.get("volume"));
var theme_temp = parseInt(Cookies.get("theme"));
var gamespeed_temp = parseInt(Cookies.get("gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;

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
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database_theme_names[i]}')`;
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

//This function adds the wait function, which tells the program to hold for a given amount of milliseconds
function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}

//This function forwards the game by one day, and determines what happens during that day. This version (0.3.0) will perform 8 tasks for each iteration, and will be labelled as such. Future versions may perform more and more tasks per iteration. Not all tasks may be performed in an iteration.
function progress() {
	if (breakfn == 0) {
		//Task 1: Upon starting the game, player's life begins, log birth into diary. Only performed during first day of player's life.
		if (Cookies.get("active_dsb") == 0) {
			document.getElementById("main_diary_p").innerHTML = Cookies.get("active_birthday") + " - I have been brought into this world. <br>";
		}
		//Task 2: Advances time by one day
		Cookies.set("active_date", (toDMY(toUnix(Cookies.get("active_date")) + 2)))
		//Task 3: Player gets older by one day. If the month and day of the current day and the month and day of the character's birthday mathes, the age goes up by 1. Else, the days goes up by 1.
		if (Cookies.get("active_date").split("/").slice(0, 2).join("/") == Cookies.get("active_birthday").split("/").slice(0, 2).join("/")) {
			Cookies.set("active_age_years", (parseInt(Cookies.get("active_age_years")) + 1))
			Cookies.set("active_age_days", 0)
		}
		else {
			Cookies.set("active_age_days", (parseInt(Cookies.get("active_age_days")) + 1))
		}
		//Task 4: Active days since birth goes up by one. DSB is never displayed to the player.
		Cookies.set("active_dsb", (parseInt(Cookies.get("active_dsb")) + 1))
		//Task 5: Current date in the control tab (bottom right) advances by one day.
		document.getElementById("main_control_currentdate").innerHTML = Cookies.get("active_date")
		//Task 6: Player's age is changed to the new age (which is now one day older)
		document.getElementById("main_info_age").innerHTML = "Age: " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days"
		//Task 7: Determines whether the player will die naturally today. If so, end the game. Chances will get higher and higher based on the DSB of player.
		var death_x = Math.random()
		if (Math.pow(10, ((Cookies.get("active_dsb"))) * 0.0001) >= 10000000 * death_x) {
			breakfn = 2
			console.log("Dead at " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days due to a death_x of " + death_x.toString())
			Cookies.set("death", "1")
			document.getElementById("main_diary_p").innerHTML = document.getElementById("main_diary_p").innerHTML + Cookies.get("active_date") + " - I died due to natural causes. I was aged " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days when I died. <br>"
			document.getElementById("main_audio_death").volume = Cookies.get("volume") / 100
			document.getElementById("main_audio_death").play()
			document.getElementById("death_overlay").style.display = "block";
			document.getElementById("death_died").innerHTML = Cookies.get("active_firstname") + " " + Cookies.get("active_surname") + " has died on " + Cookies.get("active_date") + " due to natural causes."
			switch (Cookies.get("active_gender")) {
				case "m":
					document.getElementById("death_age").innerHTML = "He was at an age of " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days."
					break;
				case "f":
					document.getElementById("death_age").innerHTML = "She was at an age of " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days."
					break;
			}
		}
		//Task 8: Wait a period of time before advancing to the next day.
		wait(1000 * (Math.pow(10, (-0.03 * document.getElementById("main_control_speed").value))) - 1)
	}
}
//This function tells the program what to do when the start and pause buttons are pressed
var iteration = 0
if (Cookies.get("death") == 0) {
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

//This function ends the life of the current player without saving
function endlife() {
	window.location.href = "../home.html"
}

//This function changes the text on the inside of the save life div
document.getElementById("save_overlay").style.display = "block";
for (let i = 1; i <= 10; i++) {
	if (Cookies.get("current_status").split(",")[i] == 1) {
		document.getElementById(`save_div_${i}`).innerHTML = `Life ${i}: ` + Cookies.get("current_firstname").split(",")[i] + " " + Cookies.get("current_surname").split(",")[i];
	}
}

//This function changes the text on the inside of the preserve life div
function preserve() {
	document.getElementById("preserve_overlay").style.display = "block";
	for (let i = 1; i <= 30; i++) {
		if (Cookies.get("past_status").split(",")[i] == 1) {
			document.getElementById(`preserve_div_${i}`).innerHTML = `Life ${i}: ` + Cookies.get("past_name").split(",")[i];
		}
	}
}

//This function saves the life into the continue lives tab
function save_life(life_no) {
	Cookies.set("current_status", (Cookies.get("current_status").split(",").splice(0, life_no) + ",1," + Cookies.get("current_status").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_firstname", (Cookies.get("current_firstname").split(",").splice(0, life_no) + "," + Cookies.get("active_firstname") + "," + Cookies.get("current_firstname").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_surname", (Cookies.get("current_surname").split(",").splice(0, life_no) + "," + Cookies.get("active_surname") + "," + Cookies.get("current_surname").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_gender", (Cookies.get("current_gender").split(",").splice(0, life_no) + "," + Cookies.get("active_gender") + "," + Cookies.get("current_gender").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_date", (Cookies.get("current_date").split(",").splice(0, life_no) + "," + Cookies.get("active_date") + "," + Cookies.get("current_date").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_age_years", (Cookies.get("current_age_years").split(",").splice(0, life_no) + "," + Cookies.get("active_age_years") + "," + Cookies.get("current_age_years").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_age_days", (Cookies.get("current_age_days").split(",").splice(0, life_no) + "," + Cookies.get("active_age_days") + "," + Cookies.get("current_age_days").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_birthday", (Cookies.get("current_birthday").split(",").splice(0, life_no) + "," + Cookies.get("active_birthday") + "," + Cookies.get("current_birthday").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_date", (Cookies.get("current_date").split(",").splice(0, life_no) + "," + Cookies.get("active_date") + "," + Cookies.get("current_date").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_dsb", (Cookies.get("current_dsb").split(",").splice(0, life_no) + "," + Cookies.get("active_dsb") + "," + Cookies.get("current_dsb").split(",").splice(life_no + 1)).split(","))
	window.location.href = "../home.html"
}

//This function saves the life into the pasts lives tab
function preserve_life(life_no) {
	Cookies.set("past_status", (Cookies.get("past_status").split(",").splice(0, life_no) + ",1," + Cookies.get("past_status").split(",").splice(life_no + 1)).split(","))
	Cookies.set("past_name", (Cookies.get("past_name").split(",").splice(0, life_no) + "," + Cookies.get("active_firstname") + " " + Cookies.get("active_surname") + "," + Cookies.get("past_name").split(",").splice(life_no + 1)).split(","))
	Cookies.set("past_age", (Cookies.get("past_age").split(",").splice(0, life_no) + "," + Cookies.get("active_age_years") + "," + Cookies.get("past_age").split(",").splice(life_no + 1)).split(","))
	Cookies.set("past_date", (Cookies.get("past_date").split(",").splice(0, life_no) + "," + Cookies.get("active_date") + "," + Cookies.get("past_date").split(",").splice(life_no + 1)).split(","))
	window.location.href = "../home.html"
}

//Following code makes final adjustments to page
save_overlay_off();