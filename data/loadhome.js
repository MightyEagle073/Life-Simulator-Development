//Segment H1: Sets settings to default values if not already set
if (localStorage.getItem("settings_volume") == null) {
	localStorage.setItem("settings_volume", 100);
}
if (localStorage.getItem("settings_theme") == null) {
	localStorage.setItem("settings_theme", 1);
}
if (localStorage.getItem("settings_gamespeed") == null) {
	localStorage.setItem("settings_gamespeed", 1);
}

//Segment H1: Sets local storage values to default values if not already set
console.log(localStorage.getItem("firstlaunch"));
if (localStorage.getItem("firstlaunch") == null) {
	//Segment H1a: Sets settings values
	localStorage.setItem("settings_volume", 100);
	localStorage.setItem("settings_theme", 1);
	localStorage.setItem("settings_gamespeed", 1);
	localStorage.setItem("current_status", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_firstname", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_surname", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_gender", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_date", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_birthday", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_age_years", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_age_days", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("current_dsb", "0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("past_status", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("past_name", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("past_age", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("past_date", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("past_wealth", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	localStorage.setItem("past_career", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	//Segment H1b: Sets diary profile values
	for (let i = 1; i <= 10; i++) {
		localStorage.setItem(`current_diary_${i}`, "Empty") //Before
	}
	for (let i = 1; i <= 30; i++) {
		localStorage.setItem(`past_diary_${i}`, "Empty")
	}
	console.log("All Local Storage set to default values");
}

//Segment H3: Sets first launch variable to 1, then checks if local storage work
localStorage.setItem("firstlaunch", 1)
if (localStorage.getItem("firstlaunch") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment H4: Firefox Cookie Transfer
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

//Segment H5: This function changes the text in continue life section according to profile.js
for (let i = 1; i <= 10; i++) {
	if (localStorage.getItem("current_status").split(",")[i] == 1) {
		document.getElementById(`continuelife_savefile${i}_name`).innerHTML = localStorage.getItem("current_firstname").split(",")[i] + " " + localStorage.getItem("current_surname").split(",")[i];
		document.getElementById(`continuelife_savefile${i}_age`).innerHTML = "Age: " + localStorage.getItem("current_age_years").split(",")[i];
		document.getElementById(`continuelife_savefile${i}_date`).innerHTML = "Date: " + localStorage.getItem("current_date").split(",")[i];
	}
}

//Segment H6: This function changes the text in the past lives section according to profile.js
for (let i = 1; i <= 30; i++) {
	if (localStorage.getItem("past_status").split(",")[i] == 1) {
		document.getElementById(`pastlives_save${i}_name`).innerHTML = localStorage.getItem("past_name").split(",")[i];
		document.getElementById(`pastlives_save${i}_age`).innerHTML = "Age: " + localStorage.getItem("past_age").split(",")[i];
		document.getElementById(`pastlives_save${i}_date`).innerHTML = "Date: " + localStorage.getItem("past_date").split(",")[i];
		document.getElementById(`pastlives_save${i}_wealth`).innerHTML = "Net Worth: $" + localStorage.getItem("past_wealth").split(",")[i];
		document.getElementById(`pastlives_save${i}_career`).innerHTML = "Career: " + database_careers[localStorage.getItem("past_career").split(",")[i]];
	}
}

//Segment H7: This function changes the settings according to setting local storages
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
switch_theme() //Defined in functions.js

//Segment H9: This function creates temporary variables that can later be changed
var volume_temp = parseInt(localStorage.getItem("settings_volume"));
var theme_temp = parseInt(localStorage.getItem("settings_theme"));
var gamespeed_temp = parseInt(localStorage.getItem("settings_gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;
var life_no_temp = 0;

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
	if (localStorage.getItem("current_status").split(",")[life_no] == 1) {
		document.getElementById("continuelife2_h1").innerHTML = "Continue Life " + life_no.toString() + "?";
		document.getElementById("continuelife2_p").innerHTML = "Would you like to continue the life of <strong>" + localStorage.getItem("current_firstname").split(",")[life_no] + " " + localStorage.getItem("current_surname").split(",")[life_no] + "</strong>, aged <strong>" + localStorage.getItem("current_age_years").split(",")[life_no] + "</strong>, from <strong>" + localStorage.getItem("current_date").split(",")[life_no] + "</strong>?";
		document.getElementById("continuelife2_overlay").style.display = "block";
	}
}
function pastFn(life_no) {
	if (localStorage.getItem("past_status").split(",")[life_no] == 1) {
		document.getElementById("pastlives2_overlay").style.display = "block";
		document.getElementById("pastlives2_h1").innerHTML = localStorage.getItem(`past_name`).split(",")[life_no] + "'s diary"
		document.getElementById("pastlives2_p").innerHTML = localStorage.getItem(`past_diary_${life_no}`)
	}
}

//Segment H13: This function loads the game onto the main tab
function continuelife() {
	localStorage.setItem("active_firstname", localStorage.getItem("current_firstname").split(",")[life_no_temp]);
	localStorage.setItem("active_surname", localStorage.getItem("current_surname").split(",")[life_no_temp]);
	localStorage.setItem("active_gender", localStorage.getItem("current_gender").split(",")[life_no_temp]);
	localStorage.setItem("active_date", localStorage.getItem("current_date").split(",")[life_no_temp]);
	localStorage.setItem("active_birthday", localStorage.getItem("current_birthday").split(",")[life_no_temp]);
	localStorage.setItem("active_age_years", localStorage.getItem("current_age_years").split(",")[life_no_temp]);
	localStorage.setItem("active_age_days", localStorage.getItem("current_age_days").split(",")[life_no_temp]);
	localStorage.setItem("active_dsb", localStorage.getItem("current_dsb").split(",")[life_no_temp]);
	localStorage.setItem("active_diary", localStorage.getItem(`current_diary_${life_no_temp}`));
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
	//Segment H17e: All is valid
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
	localStorage.setItem("active_firstname", newfirstname_temp);
	localStorage.setItem("active_surname", newsurname_temp);
	localStorage.setItem("active_gender", newgender_temp);
	localStorage.setItem("active_date", changeDMY(newdate_temp));
	localStorage.setItem("active_birthday", changeDMY(newdate_temp));
	localStorage.setItem("active_age_years", "0");
	localStorage.setItem("active_age_days", "0");
	localStorage.setItem("active_dsb", "0")
	localStorage.setItem("death", "0")
	cookie_transfer()
	window.location.href = "data/main.html"
}