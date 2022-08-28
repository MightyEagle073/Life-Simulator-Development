const database = {
	//Theme Names
	theme_names: [
		null,
		"1_sunset.jpg",
		"2_forest.jpg",
		"3_cityscape.jpg",
		"4_rainy.jpg",
		"5_blocks.jpg",
		"6_paint.jpg",
		"7_moon.jpg",
		"8_waterfall.jpg",
		"9_hexagon.jpg",
		"10_road.jpg",
		"11_valley.jpg",
		"12_train.jpg",
	],
	//Default Life Information - Life information before the life is first created
	life_information: {
		//Crucial information for running, never shown to the player 
		//Status: 0 = Doesn't Exist, 1 = Alive, 2 = Dead
		status: 0, //Integer from 0-2, changed to 1 when life is created
		version: "0.3 beta",
		//Life Information
		age: {
			years: 0, // Integer >= 0
			days: 0, // Integer from 0-31
		},
		balance: 0.0, // Float >= 0
		birthday: {
			year: 1970, //Integer >= 0, changed when life is created
			month: 1, //Integer from 0-12, changed when life is created
			day: 1, //Integer from 0-31, changed when life is created
		},
		career: {
			current: {
				job: [], //Array of integers >= 0
				level: [], //Array of integers > 0
			},
			longest: 0, //Integer >= 0
		},
		date: {
			year: 1970, //Integer >= 0, changed when life is created
			month: 1, //Integer from 0-12, changed when life is created
			day: 1, //Integer from 0-31, changed when life is created
		},
		diary: "Click the play button on the bottom right corner to start your life!", //String
		dsb: 0, //Integer, never shown to the player
		gender: "m", //String, either "m" or "f", changed when life is created
		name: {
			first: "John", //String, changed when life is created
			last: "Smith", //String, changed when life is created
		},
		net_worth: 0.0, //Float >= 0
		//Life number - To be used when transferring
		life_no: 0
	},
	//Diary Entries
	diary_entries: {
		born: " - I have been brought into this world. <br>",
		death: " - I died due to natural causes. I was aged {age,years} years and {age,days} days when I died. <br>",
	},
	//Firefox Local Storage Transfers
	transfer: [
		"settings_volume",
		"settings_theme",
		"settings_gamespeed",
		"current_info",
		"past_info",
		"life_transfer",
	],
}