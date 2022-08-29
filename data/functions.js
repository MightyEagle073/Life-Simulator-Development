//Function 1: These functions converts various date formats
//Function 1a: dict_to_date() - Converts library of dates into readable date or time
function dict_to_date(input) {
	let year = input["year"].toString()
	let month = input["month"].toString()
	let day = input["day"].toString()
	return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year
}
//Function 1b: calendar_to_date() - Converts the calendar input in the new life overlay to readable date or time
function calendar_to_date(input) {
	let unix = new Date(input)
	let year = unix.getFullYear().toString();
	let month = (unix.getMonth() + 1).toString();
	let day = unix.getDate().toString();
	return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year
}
//Function 1c: calendar_to_dict() - Converts the calendar input into library of dates
function calendar_to_dict(input) {
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

//Function 2: date_progress() - Adds a specified amount of days to the input date
function date_add(input, days) {
	unix_a = new Date(input["year"] + "/" + input["month"] + "/" + input["day"])
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

//Function 3: These functions convert various multi dimension objects into code
//Function 1a: MMDDcode() - Converts library of dates into MMDD code
function mmddcode(input) {
	return input["month"] * 100 + input["day"]
}
//Function 3b: YDDDcode() - Converts years and days of age into code
function ydddcode(input) {
	return input["years"] * 1000 + input["days"]
}

//Function 4: switch_theme() - Switches the background of the webpage and on the settings button
function switch_theme() {
	for (let i = 1; i <= database["theme_names"].length - 1; i++) {
		if (parseInt(localStorage.getItem("settings_theme")) == i) {
			if (document.getElementById("home_body") != null) {
				document.getElementById("home_body").style.backgroundImage = `url('data/wallpapers/${database["theme_names"][i]}')`;
				document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database["theme_names"][i]}')`;
			}
			else if (document.getElementById("main_body") != null) {
				document.getElementById("main_body").style.backgroundImage = `url('wallpapers/${database["theme_names"][i]}')`;
				document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database["theme_names"][i]}')`;
			}
		}
	}
}

//Function 5: settings_initialise() - Changes all the values of the settings according to local storage
function settings_initialise() {
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
	switch_theme()
}


//Function 6: settings_save() - Saves all changes made in the settings overlay to the local storage
function settings_save() {
	localStorage.setItem("settings_volume", volume_temp);
	localStorage.setItem("settings_theme", theme_temp);
	localStorage.setItem("settings_gamespeed", gamespeed_temp);
	switch_theme()
	overlay("settings2_overlay", "none")
}

//Function 7: overlay() - Turns the overlays either on or off
function overlay(overlay_name, display_type) {
	document.getElementById(overlay_name).style.display = display_type;
}