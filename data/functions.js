//Function 1: These functions converts unix format to readable date or time 
function toYMD(inputUnix) {
	var unix = new Date(parseInt(inputUnix) * 86400000);
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = year.toString() + "/" + month.toString() + "/" + day.toString();
	return DMY;
}
function changeYMD(inputUnix) {
	var unix = new Date(inputUnix)
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = year.toString() + "/" + month.toString() + "/" + day.toString();
	return DMY;
}
function toDMY(inputUnix) {
	var unix = new Date(parseInt(inputUnix) * 86400000);
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = ("0" + day.toString()).slice(-2) + "/" + ("0" + month.toString()).slice(-2) + "/" + year.toString();
	return DMY;
}
function changeDMY(inputUnix) {
	var unix = new Date(inputUnix)
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = ("0" + day.toString()).slice(-2) + "/" + ("0" + month.toString()).slice(-2) + "/" + year.toString();
	return DMY;
}
function toUnix(inputDate) {
	var unix = Date.parse(inputDate.split("/")[2] + "/" + inputDate.split("/")[1] + "/" + inputDate.split("/")[0])
	return Math.floor(unix / 86400000)
}

//Function 2: switch_theme() - Switches the background of the webpage and on the settings button
function switch_theme() {
	for (let i = 1; i <= database_theme_names.length - 1; i++) {
		if (parseInt(localStorage.getItem("settings_theme")) == i) {
			if (document.getElementById("home_body") != null){
				document.getElementById("home_body").style.backgroundImage = `url('data/wallpapers/${database_theme_names[i]}')`;
			}
			else if (document.getElementById("main_body") != null){
				document.getElementById("main_body").style.backgroundImage = `url('data/wallpapers/${database_theme_names[i]}')`;
			}
			document.getElementById("settings_theme").style.backgroundImage = `url('data/wallpapers/previews/${database_theme_names[i]}')`;
		}
	}
}

//Function 3: This function saves all changes made in the settings overlay to the local storage
function settings_save() {
	localStorage.setItem("settings_volume", volume_temp);
	localStorage.setItem("settings_theme", theme_temp);
	localStorage.setItem("settings_gamespeed", gamespeed_temp);
	switch_theme()
	settings2_overlay_off()
}

//Function 4: overlay() - Turns the overlays either on or off
function overlay(overlay_name, display_type) {
	document.getElementById(overlay_name).style.display = display_type;
	console.log(overlay_name + display_type)
}

//Function 5: progress() - Forwards the game by one day, and determines what happens during that day. Instead of dividing this into subsegments, this segment will be divided into tasks. This version (0.3.0) will perform 8 tasks for each iteration, and will be labelled as such. Future versions may perform more and more tasks per iteration. Not all tasks may be performed in an iteration. 
function progress() {
	if (breakfn == 0) {
		//Task 1: Upon starting the game, player's life begins, log birth into diary. Only performed during first day of player's life.
		if (localStorage.getItem("active_dsb") == 0) {
			localStorage.setItem("active_diary", localStorage.getItem("active_birthday") + database_diary_born);
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
		//Task 5: Determines whether the player will die naturally today. If so, end the game. Chances will get higher and higher based on the DSB of player.
		var death_x = Math.random()
		if (Math.pow(10, ((localStorage.getItem("active_dsb"))) * 0.0001) >= 10000000 * death_x) {
			breakfn = 2
			console.log("Dead at " + localStorage.getItem("active_age_years") + " years " + localStorage.getItem("active_age_days") + " days due to a death_x of " + death_x.toString())
			localStorage.setItem("death", "1")
			localStorage.setItem("active_diary", localStorage.getItem("active_diary") + localStorage.getItem("active_date") + lsr(database_diary_death))
			document.getElementById("main_audio_death").volume = localStorage.getItem("settings_volume") / 100
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
		//Task 6: Updates information throughout the HTML
		document.getElementById("main_control_currentdate").innerHTML = localStorage.getItem("active_date")
		document.getElementById("main_info_age").innerHTML = "Age: " + localStorage.getItem("active_age_years") + " years " + localStorage.getItem("active_age_days") + " days"
		document.getElementById("main_diary_p").innerHTML = localStorage.getItem("active_diary")
		//Task 7: Wait a period of time before advancing to the next day.
		wait(1000 * (Math.pow(10, (-0.03 * document.getElementById("main_control_speed").value))) - 1)
	}
}