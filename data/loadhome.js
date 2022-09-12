//Segment H1: Checks if user is using an unsupported brower
if (navigator.userAgent.indexOf("Firefox") != -1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment H2: Sets local storage values to default values if not already set
if (localStorage.getItem("firstLaunch") == null) {
	//Segment H1a: Sets default local storage values except for current and past life
	localStorage.setItem("settings_volume", 100);
	localStorage.setItem("settings_theme", 1);
	localStorage.setItem("settings_gameSpeed", 1);
	//Segment H1b: Sets current and past life local storage values
	let current_temp = {}
	for (let i = 1; i <= 10; i++) {
		current_temp[i] = database.lifeInformation
	}
	localStorage.setItem("currentInfo", JSON.stringify(current_temp))
	let past_temp = {}
	for (let i = 1; i <= 30; i++) {
		past_temp[i] = database.lifeInformation
	}
	localStorage.setItem("pastInfo", JSON.stringify(past_temp))
	console.log("All Local Storage set to default values");
}

//Segment H3: Sets first launch variable to 1, then checks if local storage work
localStorage.setItem("firstLaunch", 1)
if (localStorage.getItem("firstLaunch") != 1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment H4: Transfers any information over from main.html
if (localStorage.getItem("lifeTransfer") != null) {
	let info = JSON.parse(localStorage.getItem("lifeTransfer"))
	if (info.status == 1) {
		let newInfo = JSON.parse(localStorage.getItem("currentInfo"))
		newInfo[info.lifeNo] = info
		localStorage.setItem("currentInfo", JSON.stringify(newInfo))
	}
	else if (info.status == 2) {
		let newInfo = JSON.parse(localStorage.getItem("pastInfo"))
		newInfo[info.lifeNo] = info
		localStorage.setItem("pastInfo", JSON.stringify(newInfo))
	}
	localStorage.removeItem("lifeTransfer")
}

//Segment H5: This function changes the text in continue life section according to profile.js
for (let i = 1; i <= 10; i++) {
	if (JSON.parse(localStorage.getItem("currentInfo"))[i].status == 1) {
		if (JSON.parse(localStorage.getItem("currentInfo"))[i].version == "0.3 beta") {
			document.getElementById(`continueLife_saveFile${i}_name`).innerHTML = JSON.parse(localStorage.getItem("currentInfo"))[i].name.first + " " + JSON.parse(localStorage.getItem("currentInfo"))[i].name.last;
			document.getElementById(`continueLife_saveFile${i}_age`).innerHTML = "Age: " + JSON.parse(localStorage.getItem("currentInfo"))[i].age.years;
			document.getElementById(`continueLife_saveFile${i}_date`).innerHTML = "Date: " + convert_dict_date(JSON.parse(localStorage.getItem("currentInfo"))[i].date);
		}
		else {
			document.getElementById(`continueLife_saveFile${i}_name`).innerHTML = "Incompatible!"
			document.getElementById(`continueLife_saveFile${i}_date`).innerHTML = `An life from version ${JSON.parse(localStorage.getItem("currentInfo"))[i].version} is stored here.`;
		}

	}
}

//Segment H6: This function changes the text in the past lives section according to profile.js
for (let i = 1; i <= 30; i++) {
	if (JSON.parse(localStorage.getItem("pastInfo"))[i].status == 2) {

		if (JSON.parse(localStorage.getItem("pastInfo"))[i].version == "0.3 beta") {
			document.getElementById(`pastLives_save${i}_name`).innerHTML = JSON.parse(localStorage.getItem("pastInfo"))[i].name.first + " " + JSON.parse(localStorage.getItem("pastInfo"))[i].name.last;
			document.getElementById(`pastLives_save${i}_age`).innerHTML = "Age: " + JSON.parse(localStorage.getItem("pastInfo"))[i].age.years;
			document.getElementById(`pastLives_save${i}_date`).innerHTML = "Lifespan: " + convert_dict_date(JSON.parse(localStorage.getItem("pastInfo"))[i].birthday) + " - " + convert_dict_date(JSON.parse(localStorage.getItem("pastInfo"))[i].date);
			document.getElementById(`pastLives_save${i}_wealth`).innerHTML = "Net Worth: $" + JSON.parse(localStorage.getItem("pastInfo"))[i].netWorth;
			document.getElementById(`pastLives_save${i}_career`).innerHTML = "Career: " + JSON.parse(localStorage.getItem("pastInfo"))[i].career.longest;
		}
		else {
			document.getElementById(`pastLives_save${i}_name`).innerHTML = "Incompatible!"
			document.getElementById(`pastLives_save${i}_date`).innerHTML = `An life from version ${JSON.parse(localStorage.getItem("pastInfo"))[i].version} is stored here.`;
		}
	}
}

//Segment H7: This function changes the settings according to setting local storages
settings_initialise() //Defined in functions.js

//Segment H9: This function creates temporary variables that can later be changed
var volume_temp = parseInt(localStorage.getItem("settings_volume"));
var theme_temp = parseInt(localStorage.getItem("settings_theme"));
var gameSpeed_temp = parseInt(localStorage.getItem("settings_gameSpeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;
var lifeNo_temp = 0;

//Segment H11: This function sets the default date of #newLife_dob to the current day
$(document).ready(function () {
	var now = new Date();
	var month = (now.getMonth() + 1);
	var day = now.getDate();
	if (month < 10)
		month = "0" + month;
	if (day < 10)
		day = "0" + day;
	var today = now.getFullYear() + '-' + month + '-' + day;
	$('#newLife_dob').val(today);
});

//Segment H12: This function changes the text on the secondary overlay according to which life has been chosen
function continueFn(lifeNo) {
	lifeNo_temp = lifeNo
	if (JSON.parse(localStorage.getItem("currentInfo"))[lifeNo].status == 1 && JSON.parse(localStorage.getItem("currentInfo"))[lifeNo].version == "0.3 beta") {
		document.getElementById("continueLife2_h1").innerHTML = "Continue Life " + lifeNo.toString() + "?";
		document.getElementById("continueLife2_p").innerHTML = "Would you like to continue the life of <strong>" + JSON.parse(localStorage.getItem("currentInfo"))[lifeNo].name.first + " " + JSON.parse(localStorage.getItem("currentInfo"))[lifeNo].name.last + "</strong>, aged <strong>" + JSON.parse(localStorage.getItem("currentInfo"))[lifeNo].age.years + "</strong>, from <strong>" + convert_dict_date(JSON.parse(localStorage.getItem("currentInfo"))[lifeNo].date) + "</strong>?";
		document.getElementById("continueLife2_overlay").style.display = "block";
	}
}
function pastFn(lifeNo) {
	if (JSON.parse(localStorage.getItem("pastInfo"))[lifeNo].status == 2 && JSON.parse(localStorage.getItem("currentInfo"))[lifeNo].version == "0.3 beta") {
		document.getElementById("pastLives2_overlay").style.display = "block";
		document.getElementById("pastLives2_h1").innerHTML = JSON.parse(localStorage.getItem("pastInfo"))[lifeNo].name.first + " " + JSON.parse(localStorage.getItem("pastInfo"))[lifeNo].name.last + "'s diary"
		document.getElementById("pastLives2_p").innerHTML = JSON.parse(localStorage.getItem("pastInfo"))[lifeNo].diary
	}
}

//Segment H13: This function loads the game onto the main tab
function continueLife() {
	localStorage.setItem("lifeTransfer", JSON.stringify(JSON.parse(localStorage.getItem("currentInfo"))[lifeNo_temp]))
	window.location.href = "data/main.html"
}

//Segment H14: This function changes the text on the secondary overlay according to the settings
function settings_sure() {
	document.getElementById("settings2_overlay").style.display = "block";
	volume_temp = document.getElementById("settings_volume").value;
	if (document.getElementById("settings_gameSpeed1").checked) {
		gameSpeed_temp = 1;
	}
	else if (document.getElementById("settings_gameSpeed2").checked) {
		gameSpeed_temp = 2;
	}
	else {
		gameSpeed_temp = 3;
	}
}

//Segment H15: This function changes the value of the settings theme button
function settings_theme() {
	if (theme_temp == database.themeNames.length - 1) {
		theme_temp = 1
	}
	else {
		theme_temp = theme_temp + 1
	}
	for (let i = 1; i <= database.themeNames.length - 1; i++) {
		if (theme_temp == i) {
			document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database.themeNames[i]}')`;
		}
	}
}

//Segment H17: This function activates when user tries to start a life
function newLife_sure() {
	//Segment H17a: Invalid First Name
	if (document.getElementById("newLife_firstname").value.length == 0) {
		document.getElementById("newLife2_h1").innerHTML = "Invalid First Name!"
		document.getElementById("newLife2_p").innerHTML = "Please enter a first name. Do you really want your character to live their life without a name? Imagine how much they'll get bullied!"
		document.getElementById("newLife2_yes").style.display = "none";
		document.getElementById("newLife2_no").style.display = "none";
		document.getElementById("newLife2_overlay").style.display = "block";
	}
	//Segment H17b: Invalid Surname
	else if (document.getElementById("newLife_surname").value.length == 0) {
		document.getElementById("newLife2_h1").innerHTML = "Invalid Surname!"
		document.getElementById("newLife2_p").innerHTML = "Please enter a surname. You can't just have someone with a first name but no last name. Imagine your full name being John. That would be awkward wouldn't it?"
		document.getElementById("newLife2_yes").style.display = "none";
		document.getElementById("newLife2_no").style.display = "none";
		document.getElementById("newLife2_overlay").style.display = "block";
	}
	//Segment H17c: Invalid Gender
	else if (document.getElementById("newLife_gender_male").checked == false && document.getElementById("newLife_gender_female").checked == false) {
		document.getElementById("newLife2_h1").innerHTML = "Invalid Gender!"
		document.getElementById("newLife2_p").innerHTML = "Please enter a gender. I know some people don't really like to identify them as either Male or Female but you got to be born either of the two!"
		document.getElementById("newLife2_yes").style.display = "none";
		document.getElementById("newLife2_no").style.display = "none";
		document.getElementById("newLife2_overlay").style.display = "block";
	}
	//Segment H17d: Invalid Date
	else if (document.getElementById("newLife_dob").value.toString().length == 0) {
		document.getElementById("newLife2_h1").innerHTML = "Invalid Date!"
		document.getElementById("newLife2_p").innerHTML = "Please enter a date of birth. I haven't heard of anyone who was never born, and just exists. Maybe you're one but Life Simulator could only simulate lives of mortals!"
		document.getElementById("newLife2_yes").style.display = "none";
		document.getElementById("newLife2_no").style.display = "none";
		document.getElementById("newLife2_overlay").style.display = "block";
	}
	//Segment H17e: All is valid
	else {
		newfirstname_temp = document.getElementById("newLife_firstname").value;
		newsurname_temp = document.getElementById("newLife_surname").value;
		if (document.getElementById("newLife_gender_male").checked) {
			newgender_temp = "m";
		}
		else if (document.getElementById("newLife_gender_female").checked) {
			newgender_temp = "f";
		}
		newdate_temp = document.getElementById("newLife_dob").value;
		document.getElementById("newLife2_yes").style.display = "block";
		document.getElementById("newLife2_no").style.display = "block";
		document.getElementById("newLife2_h1").innerHTML = "Start Life?"
		document.getElementById("newLife2_p").innerHTML = "Would you like to start the life of <strong>" + newfirstname_temp + " " + newsurname_temp + "</strong>, starting from <strong>" + convert_calendar_date(newdate_temp) + "</strong>?"
		document.getElementById("newLife2_overlay").style.display = "block";
	}
}

//Segment H18: This function activates when user is sure they want to start their life
function createlife() {
	let info = database.lifeInformation
	info.status = 1
	info.name.first = newfirstname_temp
	info.name.last = newsurname_temp
	info.date = info.birthday = convert_calendar_dict(newdate_temp)
	info.gender = newgender_temp
    let iqX = Math.random()
    if (iqX >= 0.5) {
        info.iq = (Math.round(8 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100))
    }
    else {
        iqX = 1 - iqX
        info.iq = (Math.round(-5 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100))
    }
	localStorage.setItem("lifeTransfer", JSON.stringify(info))
	window.location.href = "data/main.html"
}