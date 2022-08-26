//Segment M1: Checks if local storage work
localStorage.setItem("test", 1)
if (localStorage.getItem("test") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment M2: Firefox Cookie Transfer
if(navigator.userAgent.indexOf("Firefox") != -1) {
	if (Cookies.get("transfer") == 1) {
		for (let i = 1; i < database_localstorage_names.length; i++) {
			localStorage.setItem(database_localstorage_names[i], Cookies.get(database_localstorage_names[i]))
		}
		Cookies.set("transfer", 0)
		console.log("Cookie transfer successful")
	}
}
function cookie_transfer() {
	if(navigator.userAgent.indexOf("Firefox") != -1) {
		console.log("Commenced cookie transfer")
		Cookies.set("transfer", 1)
		for (let i = 1; i < database_localstorage_names.length; i++) {
			Cookies.set(database_localstorage_names[i], localStorage.getItem(database_localstorage_names[i]))
		}
	}
}

//Segment M3: Checks if life actually exists
if (localStorage.getItem("active_dsb") == null || localStorage.getItem("death") == 1) {
	document.getElementById("notstarted_overlay").style.display = "block";
}

//Segment M4: This function changes the theme depending on which one has been chosen by profile.js
function switch_theme() {
	for (let i = 1; i <= database_theme_names.length - 1; i++) {
		if (parseInt(localStorage.getItem("settings_theme")) == i) {
			document.getElementById("main_body").style.backgroundImage = `url('wallpapers/${database_theme_names[i]}')`;
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}
switch_theme()

//Segment M5: This segment changes the life information on the diary (top left) and information (top right) tabs
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

//Segment M7: This function creates temporary variables that can later be changed
var volume_temp = parseInt(localStorage.getItem("settings_volume"));
var theme_temp = parseInt(localStorage.getItem("settings_theme"));
var gamespeed_temp = parseInt(localStorage.getItem("settings_gamespeed"));

//Segment M8: This function changes the text on the secondary overlay according to the settings
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

//Segment M9: This function changes the value of the settings theme button
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

//Segment M11: This function adds the wait function, which tells the program to hold for a given amount of milliseconds
function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}

//Segment M12: This segment defines lsr(), which stands for Local Storage Replace. This basically replaces the curly brackets inside the quote, defined in the database, with a local storage variable.
function lsr(input) {
	let array = input.split(/{|}/)
	for (let i = 1; i < array.length; i += 2) {
		array[i] = localStorage.getItem(array[i])
	}
	output = array.join("")
	return output
}

//Segment M14: This function tells the program what to do when the start and pause buttons are pressed
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

//Segment M15: This function ends the life of the current player without saving
function endlife() {
	cookie_transfer()
	window.location.href = "../home.html"
}

//Segment M16: This function changes the text on the inside of the save life div
document.getElementById("save_overlay").style.display = "block";
for (let i = 1; i <= 10; i++) {
	if (localStorage.getItem("current_status").split(",")[i] == 1) {
		document.getElementById(`save_div_${i}`).innerHTML = `Life ${i}: ` + localStorage.getItem("current_firstname").split(",")[i] + " " + localStorage.getItem("current_surname").split(",")[i];
	}
}

//Segment M17: This function changes the text on the inside of the preserve life div
function preserve() {
	document.getElementById("preserve_overlay").style.display = "block";
	for (let i = 1; i <= 30; i++) {
		if (localStorage.getItem("past_status").split(",")[i] == 1) {
			document.getElementById(`preserve_div_${i}`).innerHTML = `Life ${i}: ` + localStorage.getItem("past_name").split(",")[i];
		}
	}
}

//Segment M18: This function saves the life into the continue lives tab
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
	localStorage.setItem(`current_diary_${life_no}`, localStorage.getItem("active_diary"))
	cookie_transfer()
	window.location.href = "../home.html"
}

//Segment M19: This function saves the life into the pasts lives tab
function preserve_life(life_no) {
	localStorage.setItem("past_status", (localStorage.getItem("past_status").split(",").splice(0, life_no) + ",1," + localStorage.getItem("past_status").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("past_name", (localStorage.getItem("past_name").split(",").splice(0, life_no) + "," + localStorage.getItem("active_firstname") + " " + localStorage.getItem("active_surname") + "," + localStorage.getItem("past_name").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("past_age", (localStorage.getItem("past_age").split(",").splice(0, life_no) + "," + localStorage.getItem("active_age_years") + "," + localStorage.getItem("past_age").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem("past_date", (localStorage.getItem("past_date").split(",").splice(0, life_no) + "," + localStorage.getItem("active_date") + "," + localStorage.getItem("past_date").split(",").splice(life_no + 1)).split(","))
	localStorage.setItem(`past_diary_${life_no}`, localStorage.getItem("active_diary"))
	cookie_transfer()
	window.location.href = "../home.html"
}

//Segment M20: Following code makes final adjustments to page
save_overlay_off();