//Segment M1: Checks if user is using an unsupported brower
if (navigator.userAgent.indexOf("Firefox") != -1) {
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Segment M3: Initialises Life
if (localStorage.getItem("life_transfer") != null) {
	var life_info = JSON.parse(localStorage.getItem("life_transfer"))
	var diaryreplace_array = []
	localStorage.removeItem("life_transfer")
}
else {
	document.getElementById("notstarted_overlay").style.display = "block";
}

//Segment M4: This function changes the settings according to setting local storages
settings_initialise()

//Segment M5: This segment changes the life information on the diary (top left) and information (top right) tabs
document.getElementById("main_diary_h1").innerHTML = life_info["name"]["first"] + " " + life_info["name"]["last"] + "'s Diary"
document.getElementById("main_info_age").innerHTML = "Age: " + life_info["age"]["years"] + " years " + life_info["age"]["days"] + " days"
switch (life_info["gender"]) {
	case "m":
		document.getElementById("main_info_gender").innerHTML = "Gender: Male"
		break;
	case "f":
		document.getElementById("main_info_gender").innerHTML = "Gender: Female"
		break;
	default:
		document.getElementById("main_info_gender").innerHTML = "Gender: Error! You might want to restart your game."
}
document.getElementById("main_info_birthday").innerHTML = "Birthday:" + " " + dict_to_date(life_info["birthday"])
document.getElementById("main_control_currentdate").innerHTML = dict_to_date(life_info["birthday"])
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
			document.getElementById("settings_theme").style.backgroundImage = `url('wallpapers/previews/${database["theme_names"][i]}')`;
		}
	}
}

//Segment M10: These functions are related to education
//Segment M10a: This function determines what the text should be below the education slider
function education_effort_update() {
	if (life_info["education"]["effort"] == 0) {
		document.getElementById("education_effort_level").innerHTML = `${life_info["education"]["effort"]}%: What is school?`
		document.getElementById("education_effort_warning").innerHTML = `WARNING: Putting no effort into studying might get you expelled from the school!`
	}
	else if (life_info["education"]["effort"] >= 1 && life_info["education"]["effort"] <= 20) {
		document.getElementById("education_effort_level").innerHTML = `${life_info["education"]["effort"]}%: Slacking off`
		document.getElementById("education_effort_warning").innerHTML = ""
	}
	else if (life_info["education"]["effort"] >= 21 && life_info["education"]["effort"] <= 40) {
		document.getElementById("education_effort_level").innerHTML = `${life_info["education"]["effort"]}%: Doing bare minimums`
		document.getElementById("education_effort_warning").innerHTML = ""
	}
	else if (life_info["education"]["effort"] >= 41 && life_info["education"]["effort"] <= 60) {
		document.getElementById("education_effort_level").innerHTML = `${life_info["education"]["effort"]}%: Occasional studying`
		document.getElementById("education_effort_warning").innerHTML = ""
	}
	else if (life_info["education"]["effort"] >= 61 && life_info["education"]["effort"] <= 80) {
		document.getElementById("education_effort_level").innerHTML = `${life_info["education"]["effort"]}%: Absorbing the content`
		document.getElementById("education_effort_warning").innerHTML = ""
	}
	else if (life_info["education"]["effort"] >= 81 && life_info["education"]["effort"] <= 99) {
		document.getElementById("education_effort_level").innerHTML = `${life_info["education"]["effort"]}%: Nose to the grindstone`
		document.getElementById("education_effort_warning").innerHTML = ""
	}
	else if (life_info["education"]["effort"] == 100) {
		document.getElementById("education_effort_level").innerHTML = `${life_info["education"]["effort"]}%: STRIVING FOR SUCCESS`
		document.getElementById("education_effort_warning").innerHTML = `WARNING: Putting this much effort into studying is extremely stressful and might cause depression!`
	}
}

//Segment M10b: This function updates all information in the education overlay once the education button has been pressed
function education_open() {
	overlay("education_overlay", "block")
	if (life_info["education"]["level"] != 0) {
		document.getElementById("education_school").innerHTML = `School: ${database["education"]["schools"][database["education"]["levels"][life_info["education"]["level"]]][life_info["education"]["school"]]}`
		document.getElementById("education_grade").innerHTML = `Grade: ${database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["names"][life_info["education"]["grade"]]}`
		document.getElementById("education_marks").innerHTML = `Marks: ${Math.floor([life_info["education"]["marks"]])}%`
		document.getElementById("education_effort_input").removeAttribute("disabled")
		document.getElementById("education_effort_input").value = life_info["education"]["effort"]
	}
	education_effort_update()
}

//Segment M10c: This function updates the text below the slider upon detecting a change in the slider value
function education_effort_save() {
	life_info["education"]["effort"] = document.getElementById("education_effort_input").value
	education_effort_update()
}

//Segment M11: This function adds the wait function, which tells the program to hold for a given amount of milliseconds
function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}

//Segment M12: This segment defines diaryreplace(), which replaces the curly brackets inside the quote, defined in the database, with a variable.
function diaryreplace(input) {
	let array_a = input.split(/{|}/)
	for (let i = 1; i < array_a.length; i += 2) {
		let array_b = array_a[i].split(",")
		switch (array_b.length) {
			case 1:
				array_a[i] = life_info[array_b[0]]
				break;
			case 2:
				array_a[i] = life_info[array_b[0]][array_b[1]]
				break;
			case 3:
				array_a[i] = life_info[array_b[0]][array_b[1]][array_b[2]]
				break;
			case 4:
				array_a[i] = life_info[array_b[0]][array_b[1]][array_b[2]][array_b[3]]
				break;
		}
	}
	output = array_a.join("")
	return output
}

//Segment M13: This segment defines progress(), which forwards the game by one day, and determines what happens during that day. Instead of dividing this into subsegments, this segment will be divided into tasks. This version (0.3.0) will perform 9 tasks for each iteration, and will be labelled as such. Future versions may perform more and more tasks per iteration. Not all tasks may be performed in an iteration. 
function progress() {
	if (breakfn == 0) {
		//Task 1: Upon starting the game, player's life begins, log birth into diary. Only performed during first day of player's life.
		if (life_info["dsb"] == 0) {
			life_info["diary"] = dict_to_date(life_info["date"]) + database["diary_entries"]["born"]
		}
		//Task 2: Advances time by one day
		life_info["date"] = date_add(life_info["date"], 1)
		//Task 3: Player gets older by one day. If the month and day of the current day and the month and day of the character's birthday matches, the age goes up by 1. Else, the days goes up by 1.
		if (mmddcode(life_info["date"]) == mmddcode(life_info["birthday"])) {
			life_info["age"]["years"]++
			life_info["age"]["days"] = 0
		}
		else {
			life_info["age"]["days"]++
		}
		//Task 4: Active days since birth goes up by one. DSB is never displayed to the player.
		life_info["dsb"]++
		//Task 5: Education milestones (starting or graduating)
		if ("Education Milestones" != 0) {
			//Task 5a: Starting primary school
			if (
				ydddcode(life_info["age"]) >= database["education"]["enrolment_age"] &&
				mmddcode(life_info["date"]) == database["education"]["grades"]["primary"]["start_date"][1] &&
				life_info["education"]["level"] == 0
			) {
				life_info["education"]["level"] = 1
				life_info["education"]["grade"] = 1
				life_info["education"]["school"] = Math.floor(Math.random() * 20 + 1)
				life_info["education"]["status"] = 1
				document.getElementById("notification_h1").style.display = "none"
				document.getElementById("notification_h2").style.display = "block"
				document.getElementById("notification_h3").style.display = "none"
				document.getElementById("notification_p_1").style.display = "block"
				document.getElementById("notification_p_2").style.display = "block"
				let string_newSchool = database["education"]["schools"]["primary"][life_info["education"]["school"]]
				let string_newGrade = database["education"]["grades"]["primary"]["names"][life_info["education"]["grade"]]
				document.getElementById("notification_h2").innerHTML = "Welcome to school!"
				document.getElementById("notification_p_1").innerHTML = `Your parents have enrolled you into ${string_newSchool}, where you will be starting ${string_newGrade} from today.`
				document.getElementById("notification_p_2").innerHTML = "Study hard, get good grades and have a bright future!"
				life_info["diary"] = life_info["diary"] + dict_to_date(life_info["date"]) + `- I started my first day of school at ${string_newSchool}, where I started ${string_newGrade}. <br>`
				overlay('notification_overlay', 'block')
				breakfn = 1
			}
			//Task 5b: Starting a new grade
			else if (
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]] != null &&
				mmddcode(life_info["date"]) == database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["start_date"][parseInt([life_info["education"]["grade"]]) + 1] &&
				life_info["education"]["level"] != 0 &&
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["names"][parseInt([life_info["education"]["grade"]]) + 1] != null
			) {
				life_info["education"]["grade"] ++
				life_info["education"]["status"] = 1
				if (localStorage.getItem("settings_gamespeed") <= 2) {
					document.getElementById("notification_h1").style.display = "none"
					document.getElementById("notification_h2").style.display = "block"
					document.getElementById("notification_h3").style.display = "none"
					document.getElementById("notification_p_1").style.display = "block"
					document.getElementById("notification_p_2").style.display = "block"
					let string_newGrade = database
						["education"]
						["grades"]
						[database["education"]["levels"][life_info["education"]["level"]]]
						["names"]
						[life_info["education"]["grade"]]
					document.getElementById("notification_h2").innerHTML = `Back to school!`
					document.getElementById("notification_p_1").innerHTML = `Holidays are over, as you will start ${string_newGrade} from today.`
					document.getElementById("notification_p_2").innerHTML = "Study harder, as content will get harder!"
					life_info["diary"] = life_info["diary"] + dict_to_date(life_info["date"]) + `- I started ${string_newGrade}. <br>`
					overlay('notification_overlay', 'block')
					breakfn = 1
				}
			}
			//Task 5c: Starting a new school
			else if (
				database["education"]["grades"][database["education"]["levels"][parseInt(life_info["education"]["level"]) + 1]] != null &&
				mmddcode(life_info["date"]) == database["education"]["grades"][database["education"]["levels"][parseInt(life_info["education"]["level"]) + 1]]["start_date"][1] &&
				life_info["education"]["level"] != 0 &&
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["names"][parseInt([life_info["education"]["grade"]]) + 1] == null &&
				database["education"]["grades"][database["education"]["levels"][parseInt(life_info["education"]["level"]) + 1]] != null
			) {
				life_info["education"]["level"] ++
				life_info["education"]["grade"] = 1
				life_info["education"]["school"] = Math.floor(Math.random() * 20 + 1)
				life_info["education"]["status"] = 1
				document.getElementById("notification_h1").style.display = "none"
				document.getElementById("notification_h2").style.display = "block"
				document.getElementById("notification_h3").style.display = "none"
				document.getElementById("notification_p_1").style.display = "block"
				document.getElementById("notification_p_2").style.display = "block"
				let string_newSchool = database
					["education"]
					["schools"]
					[database["education"]["levels"][life_info["education"]["level"]]]
					[life_info["education"]["school"]]
				let string_newGrade = database
					["education"]
					["grades"]
					[database["education"]["levels"][life_info["education"]["level"]]]
					["names"]
					[life_info["education"]["grade"]]
				document.getElementById("notification_h2").innerHTML = `Time for a new school!`
				document.getElementById("notification_p_1").innerHTML = `Today you start a brand new school at ${string_newSchool}, where you will be starting ${string_newGrade} from today.`
				document.getElementById("notification_p_2").innerHTML = "Time to make some new friends!"
				life_info["diary"] = life_info["diary"] + dict_to_date(life_info["date"]) + `- I was enrolled into a new school at ${string_newSchool}, where I started ${string_newGrade}. <br>`
				overlay('notification_overlay', 'block')
				breakfn = 1
			}
			//Task 5d: Graduating a grade
			else if (
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]] != null &&
				mmddcode(life_info["date"]) == database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["end_date"][life_info["education"]["grade"]] &&
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["names"][parseInt([life_info["education"]["grade"]]) + 1] != null &&
				life_info["education"]["daysIntoGrade"] > 180
			) {
				life_info["education"]["status"] = 2
				life_info["education"]["daysIntoGrade"] = 0
				if (localStorage.getItem("settings_gamespeed") <= 2) {
					document.getElementById("notification_h1").style.display = "none"
					document.getElementById("notification_h2").style.display = "block"
					document.getElementById("notification_h3").style.display = "none"
					document.getElementById("notification_p_1").style.display = "block"
					document.getElementById("notification_p_2").style.display = "block"
					let string_mark = Math.floor(life_info["education"]["marks"])
					let string_grade = database
						["education"]
						["grades"]
						[database["education"]["levels"][life_info["education"]["level"]]]
						["names"]
						[life_info["education"]["grade"]]
					let string_nextGrade = database
						["education"]
						["grades"]
						[database["education"]["levels"][life_info["education"]["level"]]]
						["names"]
						[parseInt(life_info["education"]["grade"]) + 1]
					let start_date = database
						["education"]
						["grades"]
						[database["education"]["levels"][life_info["education"]["level"]]]
						["start_date"]
						[parseInt(life_info["education"]["grade"]) + 1]
					let string_startDate = dict_to_date(date_next(life_info["date"], start_date))
					document.getElementById("notification_h2").innerHTML = `That's a wrap!`
					document.getElementById("notification_p_1").innerHTML = `You have completed ${string_grade} with a mark of ${string_mark}%.`
					document.getElementById("notification_p_2").innerHTML = `Start ${string_nextGrade} on ${string_startDate}.`
					life_info["diary"] = life_info["diary"] + dict_to_date(life_info["date"]) + `- I finished ${string_grade} with a mark of ${string_mark}%. <br>`
					overlay('notification_overlay', 'block')
					breakfn = 1
				}
			}
			//Task 5e: Graduating a level
			else if (
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]] != null &&
				mmddcode(life_info["date"]) == database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["end_date"][life_info["education"]["grade"]] &&
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["names"][parseInt([life_info["education"]["grade"]]) + 1] == null &&
				database["education"]["grades"][database["education"]["levels"][parseInt(life_info["education"]["level"]) + 1]] != null &&
				life_info["education"]["daysIntoGrade"] > 180
			) {
				life_info["education"]["status"] = 2
				life_info["education"]["daysIntoGrade"] = 0
				document.getElementById("notification_h1").style.display = "none"
				document.getElementById("notification_h2").style.display = "block"
				document.getElementById("notification_h3").style.display = "none"
				document.getElementById("notification_p_1").style.display = "block"
				document.getElementById("notification_p_2").style.display = "block"
				document.getElementById("main_audio_education_graduation_level").volume = localStorage.getItem("settings_volume") / 100
				document.getElementById("main_audio_education_graduation_level").play()
				let string_mark = Math.floor(life_info["education"]["marks"])
				let string_grade = database
					["education"]
					["grades"]
					[database["education"]["levels"][life_info["education"]["level"]]]
					["names"]
					[life_info["education"]["grade"]]
				let string_school = database
					["education"]
					["schools"]
					[database["education"]["levels"][life_info["education"]["level"]]]
					[life_info["education"]["school"]]
				let string_nextGrade = database
					["education"]
					["grades"]
					[database["education"]["levels"][parseInt(life_info["education"]["level"]) + 1]]
					["names"]
					[1]
				let start_date = database
					["education"]
					["grades"]
					[database["education"]["levels"][parseInt(life_info["education"]["level"]) + 1]]
					["start_date"]
					[1]
				let string_startDate = dict_to_date(date_next(life_info["date"], start_date))
				document.getElementById("notification_h2").innerHTML = `Farewell, old friends!`
				document.getElementById("notification_p_1").innerHTML = `You have graduated at ${string_school}! Your mark at ${string_grade} was ${string_mark}%.`
				document.getElementById("notification_p_2").innerHTML = `You will be enrolled into a new school on ${string_startDate}, where you'll be starting ${string_nextGrade}.`
				life_info["diary"] = life_info["diary"] + dict_to_date(life_info["date"]) + `- I graduated at ${string_school}. My mark at ${string_grade} was ${string_mark}%. <br>`
				overlay('notification_overlay', 'block')
				breakfn = 1
			}
			//Task 5f: Graduating school
			else if (
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]] != null &&
				mmddcode(life_info["date"]) == database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["end_date"][life_info["education"]["grade"]] &&
				database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["names"][parseInt([life_info["education"]["grade"]]) + 1] == null &&
				database["education"]["grades"][database["education"]["levels"][parseInt(life_info["education"]["level"]) + 1]] == null &&
				life_info["education"]["status"] == 1 &&
				life_info["education"]["daysIntoGrade"] > 180
			) {
				life_info["education"]["status"] = 3
				document.getElementById("notification_h1").style.display = "none"
				document.getElementById("notification_h2").style.display = "block"
				document.getElementById("notification_h3").style.display = "none"
				document.getElementById("notification_p_1").style.display = "block"
				document.getElementById("notification_p_2").style.display = "block"
				document.getElementById("main_audio_education_graduation_school").volume = localStorage.getItem("settings_volume") / 100
				document.getElementById("main_audio_education_graduation_school").play()
				let string_mark = Math.floor(life_info["education"]["marks"])
				let string_grade = database
					["education"]
					["grades"]
					[database["education"]["levels"][life_info["education"]["level"]]]
					["names"]
					[life_info["education"]["grade"]]
				let string_school = database
					["education"]
					["schools"]
					[database["education"]["levels"][life_info["education"]["level"]]]
					[life_info["education"]["school"]]
				document.getElementById("notification_h2").innerHTML = `Onwards!`
				document.getElementById("notification_p_1").innerHTML = `You have graduated at ${string_school}! Your mark at ${string_grade} was ${string_mark}%.`
				document.getElementById("notification_p_2").innerHTML = `With that, your schooling career is finished. Time to find a job!`
				life_info["diary"] = life_info["diary"] + dict_to_date(life_info["date"]) + `- I graduated at ${string_school}. My mark at ${string_grade} was ${string_mark}%. <br>`
				overlay('notification_overlay', 'block')
				breakfn = 1
			}
		}
		//Task 6: Education system
		if (life_info["education"]["status"] == 1) {
			//Task 6a: Increases the days into grade by 1
			life_info["education"]["daysIntoGrade"]++
			//Task 6b: Calculates the new mark of the day based on the amount of effort put into schooling, iq, current marks and difficulty of the grade
			let newMark_effort = life_info["education"]["effort"]
			let newMark_iq = life_info["iq"]
			let newMark_mark = life_info["education"]["marks"]
			let newMark_difficulty = database["education"]["grades"][database["education"]["levels"][life_info["education"]["level"]]]["difficulty"][parseInt([life_info["education"]["grade"]])]
			let newMark_workDone = (5 + Math.pow(newMark_effort, 0.8)) * newMark_iq * (100 - newMark_mark) / 1000000
			let newMark_workLoad = (1 + Math.pow(newMark_difficulty, 0.6)) / 200
			let markAdded = newMark_workDone - newMark_workLoad
			if (life_info["education"]["marks"] >= 1 || markAdded > 0) {
				life_info["education"]["marks"] += markAdded
			}
		}
		//Task 7: Determines whether the player will die naturally today. If so, end the game. Chances will get higher and higher based on the DSB of player.
		let death_x = Math.random()
		if (Math.pow(10, (life_info["dsb"]) * 0.0001) >= 10000000 * death_x) {
			breakfn = 2
			life_info["status"] = 2
			console.log("Dead at " + life_info["age"]["years"] + " years " + life_info["age"]["days"] + " days due to a death_x of " + death_x.toString())
			life_info["diary"] = life_info["diary"] + dict_to_date(life_info["date"]) + diaryreplace(database["diary_entries"]["death"])
			document.getElementById("main_audio_death").volume = localStorage.getItem("settings_volume") / 100
			document.getElementById("main_audio_death").play()
			document.getElementById("death_overlay").style.display = "block";
			document.getElementById("death_died").innerHTML = life_info["name"]["first"] + " " + life_info["name"]["last"] + " has died on " + dict_to_date(life_info["date"]) + " due to natural causes."
			switch (life_info["gender"]) {
				case "m":
					document.getElementById("death_age").innerHTML = "He was at an age of " + life_info["age"]["years"] + " years " + life_info["age"]["days"] + " days."
					break;
				case "f":
					document.getElementById("death_age").innerHTML = "She was at an age of " + life_info["age"]["years"] + " years " + life_info["age"]["days"] + " days."
					break;
			}
		}
		//Task 8: Updates information throughout the HTML
		document.getElementById("main_control_currentdate").innerHTML = dict_to_date(life_info["date"])
		document.getElementById("main_info_age").innerHTML = "Age: " + life_info["age"]["years"] + " years " + life_info["age"]["days"] + " days"
		document.getElementById("main_diary_p").innerHTML = life_info["diary"]
		//Task 9: Wait a period of time before advancing to the next day.
		wait(1000 * (Math.pow(10, (-0.03 * document.getElementById("main_control_speed").value))) - 1)
	}
}

//Segment M14: This function tells the program what to do when the start and pause buttons are pressed
var breakfn = 1
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
	window.location.href = "../home.html"
}

//Segment M16: This function changes the text on the inside of the save life div
document.getElementById("save_overlay").style.display = "block";
for (let i = 1; i <= 10; i++) {
	if (JSON.parse(localStorage.getItem("current_info"))[i]["status"] == 1) {
		if (JSON.parse(localStorage.getItem("current_info"))[i]["version"] == "0.3 beta") {
			document.getElementById(`save_div_${i}`).innerHTML = `Life ${i}: ` + JSON.parse(localStorage.getItem("current_info"))[i]["name"]["first"] + " " + JSON.parse(localStorage.getItem("current_info"))[i]["name"]["last"];
		}
		else {
			document.getElementById(`save_div_${i}`).innerHTML = "Incompatible Life Stored"
		}
	}
}

//Segment M17: This function changes the text on the inside of the preserve life div
function preserve() {
	document.getElementById("preserve_overlay").style.display = "block";
	for (let i = 1; i <= 30; i++) {
		if (JSON.parse(localStorage.getItem("past_info"))[i]["status"] == 2) {
			if (JSON.parse(localStorage.getItem("past_info"))[i]["version"] == "0.3 beta") {
				document.getElementById(`preserve_div_${i}`).innerHTML = `Life ${i}: ` + JSON.parse(localStorage.getItem("current_info"))[i]["name"]["first"] + " " + JSON.parse(localStorage.getItem("past_info"))[i]["name"]["last"];
			}
			else {
				document.getElementById(`preserve_div_${i}`).innerHTML = "Incompatible Life Stored"
			}
		}
	}
}

//Segment M18: This function saves the life into the continue lives tab
function save_life(life_no) {
	life_info["life_no"] = life_no
	localStorage.setItem("life_transfer", JSON.stringify(life_info))
	window.location.href = "../home.html"
}

//Segment M19: This function saves the life into the pasts lives tab
function preserve_life(life_no) {
	life_info["life_no"] = life_no
	localStorage.setItem("life_transfer", JSON.stringify(life_info))
	window.location.href = "../home.html"
}

//Segment M20: Following code makes final adjustments to page
overlay("save_overlay", "none");