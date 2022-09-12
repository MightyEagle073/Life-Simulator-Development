//Function 1: These functions converts various date formats
//Function 1a: convert_dict_date() - Converts library of dates into readable date or time
function convert_dict_date(input) {
	let year = input.year.toString()
	let month = input.month.toString()
	let day = input.day.toString()
	return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year
}
//Function 1b: convert_calendar_date() - Converts the calendar input in the new life overlay to readable date or time
function convert_calendar_date(input) {
	let unix = new Date(input)
	let year = unix.getFullYear().toString();
	let month = (unix.getMonth() + 1).toString();
	let day = unix.getDate().toString();
	return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year
}
//Function 1c: convert_calendar_dict() - Converts the calendar input into library of dates
function convert_calendar_dict(input) {
	let unix = new Date(input)
	let year = unix.getFullYear();
	let month = (unix.getMonth() + 1);
	let day = unix.getDate();
	return {
		year: year,
		month: month,
		day: day,
	}
}

//Function 2: These functions convert various multi dimension objects into code
//Function 2a: code_mmdd() - Converts library of dates into MMDD code
function code_mmdd(input) {
	return input.month * 100 + input.day
}
//Function 2b: code_yddd() - Converts years and days of age into code
function code_yddd(input) {
	return input.years * 1000 + input.days
}

//Function 3: These functions calculates various date related things
//Function 3a: date_add() - Adds a specified amount of days to the input date
function date_add(input, days) {
	unix_a = new Date(input.year + "/" + input.month + "/" + input.day)
	unix_b = new Date((unix_a.getTime() + days * 86400000) + 3600000)
	let year = unix_b.getFullYear();
	let month = (unix_b.getMonth() + 1);
	let day = unix_b.getDate();
	return {
		year: year,
		month: month,
		day: day,
	}
}
//Function 3b: date_next() - Finds when the next time this date will occur, which is at least atLeast days in the future
function date_next(input, mmdd, atLeast) {
	if (atLeast = null) {
		atLeast == 0
	}
	newInput = date_add(input, atLeast)
	if (mmdd > code_mmdd(newInput)) {
		return {
			year: newInput.year,
			month: Math.floor(mmdd/100),
			day: mmdd % 100,
		}
	}
	else {
		return {
			year: newInput.year + 1,
			month: Math.floor(mmdd/100),
			day: mmdd % 100,
		}
	}
}



//Function 4: switchTheme() - Switches the background of the webpage and on the settings button
function switchTheme() {
	for (let i = 1; i <= database.themeNames.length - 1; i++) {
		if (parseInt(localStorage.getItem("settings_theme")) == i) {
			if (document.getElementById("home_body") != null) {
				document.getElementById("home_body").style.backgroundImage = `url('data/wallpapers/${database.themeNames[i]}')`;
				document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database.themeNames[i]}')`;
			}
			else if (document.getElementById("main_body") != null) {
				document.getElementById("main_body").style.backgroundImage = `url('wallpapers/${database.themeNames[i]}')`;
				document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database.themeNames[i]}')`;
			}
		}
	}
}

//Function 5: settings_initialise() - Changes all the values of the settings according to local storage
function settings_initialise() {
	document.getElementById("settings_volume").value = localStorage.getItem("settings_volume");
	if (parseInt(localStorage.getItem("gameSpeed")) == 1) {
		document.getElementById("settings_gameSpeed1").checked = true;
	}
	else if (parseInt(localStorage.getItem("gameSpeed")) == 2) {
		document.getElementById("settings_gameSpeed2").checked = true;
	}
	else {
		document.getElementById("settings_gameSpeed3").checked = true;
	}
	switchTheme()
}


//Function 6: settings_save() - Saves all changes made in the settings overlay to the local storage
function settings_save() {
	localStorage.setItem("settings_volume", volume_temp);
	localStorage.setItem("settings_theme", theme_temp);
	localStorage.setItem("settings_gameSpeed", gameSpeed_temp);
	switchTheme()
	overlay("settings2_overlay", "none")
}

//Function 7: overlay() - Turns the overlays either on or off
function overlay(overlayName, displayType) {
	document.getElementById(overlayName).style.display = displayType;
}