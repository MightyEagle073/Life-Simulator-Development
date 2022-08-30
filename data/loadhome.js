//Segment H1: Checks if user is using an unsupported brower
if (navigator.userAgent.indexOf("Firefox") != -1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment H2: Sets local storage values to default values if not already set
if (localStorage.getItem("firstlaunch") == null) {
	//Segment H1a: Sets default local storage values except for current and past life
	localStorage.setItem("settings_volume", 100);
	localStorage.setItem("settings_theme", 1);
	localStorage.setItem("settings_gamespeed", 1);
	//Segment H1b: Sets current and past life local storage values
	let current_temp = {}
	for (let i = 1; i <= 10; i++) {
		current_temp[i] = database["life_information"]
	}
	localStorage.setItem("current_info", JSON.stringify(current_temp))
	let past_temp = {}
	for (let i = 1; i <= 30; i++) {
		past_temp[i] = database["life_information"]
	}
	localStorage.setItem("past_info", JSON.stringify(past_temp))
	console.log("All Local Storage set to default values");
}

//Segment H3: Sets first launch variable to 1, then checks if local storage work
localStorage.setItem("firstlaunch", 1)
if (localStorage.getItem("firstlaunch") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment H4: Transfers any information over from main.html
if (localStorage.getItem("life_transfer") != null) {
	let info = JSON.parse(localStorage.getItem("life_transfer"))
	if (info["status"] == 1) {
		let info_new = JSON.parse(localStorage.getItem("current_info"))
		info_new[info["life_no"]] = info
		localStorage.setItem("current_info", JSON.stringify(info_new))
	}
	else if (info["status"] == 2) {
		let info_new = JSON.parse(localStorage.getItem("past_info"))
		info_new[info["life_no"]] = info
		localStorage.setItem("past_info", JSON.stringify(info_new))
	}
	localStorage.removeItem("life_transfer")
}

//Segment H5: This function changes the text in continue life section according to profile.js
for (let i = 1; i <= 10; i++) {
	if (JSON.parse(localStorage.getItem("current_info"))[i]["status"] == 1) {
		if (JSON.parse(localStorage.getItem("current_info"))[i]["version"] == "0.3 beta") {
			document.getElementById(`continuelife_savefile${i}_name`).innerHTML = JSON.parse(localStorage.getItem("current_info"))[i]["name"]["first"] + " " + JSON.parse(localStorage.getItem("current_info"))[i]["name"]["last"];
			document.getElementById(`continuelife_savefile${i}_age`).innerHTML = "Age: " + JSON.parse(localStorage.getItem("current_info"))[i]["age"]["years"];
			document.getElementById(`continuelife_savefile${i}_date`).innerHTML = "Date: " + dict_to_date(JSON.parse(localStorage.getItem("current_info"))[i]["date"]);
		}
		else {
			document.getElementById(`continuelife_savefile${i}_name`).innerHTML = "Incompatible!"
			document.getElementById(`continuelife_savefile${i}_date`).innerHTML = `An life from version ${JSON.parse(localStorage.getItem("current_info"))[i]["version"]} is stored here.`;
		}

	}
}

//Segment H6: This function changes the text in the past lives section according to profile.js
for (let i = 1; i <= 30; i++) {
	if (JSON.parse(localStorage.getItem("past_info"))[i]["status"] == 2) {

		if (JSON.parse(localStorage.getItem("past_info"))[i]["version"] == "0.3 beta") {
			document.getElementById(`pastlives_save${i}_name`).innerHTML = JSON.parse(localStorage.getItem("past_info"))[i]["name"]["first"] + " " + JSON.parse(localStorage.getItem("past_info"))[i]["name"]["last"];
			document.getElementById(`pastlives_save${i}_age`).innerHTML = "Age: " + JSON.parse(localStorage.getItem("past_info"))[i]["age"]["years"];
			document.getElementById(`pastlives_save${i}_date`).innerHTML = "Lifespan: " + dict_to_date(JSON.parse(localStorage.getItem("past_info"))[i]["birthday"]) + " - " + dict_to_date(JSON.parse(localStorage.getItem("past_info"))[i]["date"]);
			document.getElementById(`pastlives_save${i}_wealth`).innerHTML = "Net Worth: $" + JSON.parse(localStorage.getItem("past_info"))[i]["net_worth"];
			document.getElementById(`pastlives_save${i}_career`).innerHTML = "Career: " + JSON.parse(localStorage.getItem("past_info"))[i]["career"]["longest"];
		}
		else {
			document.getElementById(`pastlives_save${i}_name`).innerHTML = "Incompatible!"
			document.getElementById(`pastlives_save${i}_date`).innerHTML = `An life from version ${JSON.parse(localStorage.getItem("past_info"))[i]["version"]} is stored here.`;
		}
	}
}

//Segment H7: This function changes the settings according to setting local storages
settings_initialise() //Defined in functions.js

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
	if (JSON.parse(localStorage.getItem("current_info"))[life_no]["status"] == 1 && JSON.parse(localStorage.getItem("current_info"))[life_no]["version"] == "0.3 beta") {
		document.getElementById("continuelife2_h1").innerHTML = "Continue Life " + life_no.toString() + "?";
		document.getElementById("continuelife2_p").innerHTML = "Would you like to continue the life of <strong>" + JSON.parse(localStorage.getItem("current_info"))[life_no]["name"]["first"] + " " + JSON.parse(localStorage.getItem("current_info"))[life_no]["name"]["last"] + "</strong>, aged <strong>" + JSON.parse(localStorage.getItem("current_info"))[life_no]["age"]["years"] + "</strong>, from <strong>" + dict_to_date(JSON.parse(localStorage.getItem("current_info"))[life_no]["date"]) + "</strong>?";
		document.getElementById("continuelife2_overlay").style.display = "block";
	}
}
function pastFn(life_no) {
	if (JSON.parse(localStorage.getItem("past_info"))[life_no]["status"] == 2 && JSON.parse(localStorage.getItem("current_info"))[life_no]["version"] == "0.3 beta") {
		document.getElementById("pastlives2_overlay").style.display = "block";
		document.getElementById("pastlives2_h1").innerHTML = JSON.parse(localStorage.getItem("past_info"))[life_no]["name"]["first"] + " " + JSON.parse(localStorage.getItem("past_info"))[life_no]["name"]["last"] + "'s diary"
		document.getElementById("pastlives2_p").innerHTML = JSON.parse(localStorage.getItem("past_info"))[life_no]["diary"]
	}
}

//Segment H13: This function loads the game onto the main tab
function continuelife() {
	localStorage.setItem("life_transfer", JSON.stringify(JSON.parse(localStorage.getItem("current_info"))[life_no_temp]))
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
	if (theme_temp == database["theme_names"].length - 1) {
		theme_temp = 1
	}
	else {
		theme_temp = theme_temp + 1
	}
	for (let i = 1; i <= database["theme_names"].length - 1; i++) {
		if (theme_temp == i) {
			document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database["theme_names"][i]}')`;
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
		document.getElementById("newlife2_p").innerHTML = "Would you like to start the life of <strong>" + newfirstname_temp + " " + newsurname_temp + "</strong>, starting from <strong>" + calendar_to_date(newdate_temp) + "</strong>?"
		document.getElementById("newlife2_overlay").style.display = "block";
	}
}

//Segment H18: This function activates when user is sure they want to start their life
function createlife() {
	let info = database["life_information"]
	info["status"] = 1
	info["name"]["first"] = newfirstname_temp
	info["name"]["last"] = newsurname_temp
	info["date"] = info["birthday"] = calendar_to_dict(newdate_temp)
	info["gender"] = newgender_temp
	localStorage.setItem("life_transfer", JSON.stringify(info))
	window.location.href = "data/main.html"
}