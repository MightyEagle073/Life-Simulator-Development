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
		version: "0.3 beta",
		status: 0, //Integer from 0-2, changed to 1 when life is created
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
		education: {
			level: 0,
			grade: 0,
			school: 0,
			marks: 50,
			effort: 50,
		},
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
	education: {
		//List of Schools
		schools: {
			primary: [
				null,
				"Auburn North Public School",
				"Blacktown South Public School",
				"Campsie Public School",
				"Chatswood Public School",
				"Harbord Public School",
				"Hurstville South Public School",
				"Leumeah Public School",
				"Liverpool Public School", 
				"Malabar Public School",
				"Mona Vale Public School",
				"Padstow Park Public School",
				"Parramatta Public School",
				"Pennant Hills Public School",
				"Penrith Public School",
				"Randwick Public School",
				"Richmond Public School",
				"Ryde Public School",
				"St Johns Park Public School",
				"Sutherland Public School",
				"Westmead Public School",
			],
			secondary: [
				null,
				"Blakehurst High School",
				"Canley Vale High School",
				"Carlingford High School",
				"Castle Hill High School",
				"Casula High School",
				"Concord High School",
				"Elizabeth Macarthur High School",
				"Killara High School",
				"Killarney Heights High School",
				"Kingsgrove High School",
				"Kingswood High School",
				"Kirrawee High School",
				"Leumeah High School",
				"Menai High School",
				"Pittwater High School",
				"Prairiewood High School",
				"Rooty Hill High School",
				"Sir Joseph Banks High School",
				"South Sydney High School",
				"Turramurra High School",
			]
		},
		//List of Grade Names
		grades: {
			primary: {
				names: [
					null,
					"Year 1",
					"Year 2",
					"Year 3",
					"Year 4",
					"Year 5",
					"Year 6",
				]
			},
			secondary: {
				names: [
					null,
					"Year 7",
					"Year 8",
					"Year 9",
					"Year 10",
					"Year 11",
					"Year 12",
				]
			}
		}
	}
}