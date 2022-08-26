//Theme Names
const database_theme_names = [
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
	"12_train.jpg"
]

//Life information
const database_life_information = [
	//Status: 0 = Not born yet, 1 = Alive, 2 = Dead
	"status", //Integer
	//Life information	
	"age_days", //Integer
	"age_years", //Integer from 0-365
	"balance", //
	"career_current",
	"career_longest",
	"birthday",
	"date",
	"gender",
	"name_first",
	"name_last",
	"net_worth",
]

//Careers
const database_careers = ["Unemployed", "Business Worker", "Teacher", "Pilot", "Driver", "Engineer"];
const database_career_levels = [
	["Unemployed"],
	[null, "Business", "Reporter", "Office Assistant", "Supervisor", "Associate Manager", "Manager", "Senior Manager", "President", "Chief Executive Officer"],
	[null, "Teacher", "Substitute Teacher", "High School Teacher", "Head Teacher", "Professor", "Head Professor", "Master Professor"],
	[null, "Crop Duster", "Charter Pilot", "Flight Instructor", "Regional First Officer", "Regional Captain", "Narrow Body First Officer", "Narrow Body Captain", "Wide Body First Officer", "Wide Body Captain", "Jumob Jet First Officer", "Jumbo Jet Captain"],
	[null, "Delivery Driver", "Taxi Driver", "Courier Driver", "Surrogate Driver", "Chauffeur", "VIP Chauffeur", "Limousine Driver"],
	[null, "Assistant Engineer", "Junior Engineer", "Senior Engineer", "Engineering Team Leader", "Engineering General Manager", "Deputy Engineering Chief", "Engineering Chief"],
]



//Diary entries - Make sure the quote begins with " - " and ends with " <br>". Replace variables with curly brackets. Make sure there are the same number of open curly brackets as closing curly brackets, otherwise you're gonna break the code!
const database_diary_born = " - I have been brought into this world. <br>"
const database_diary_death = " - I died due to natural causes. I was aged {active_age_years} years and {active_age_days} days when I died. <br>"



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
		//Status: 0 = Doesn't Exist, 1 = Alive, 2 = Dead
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
		dsb: 0, //Integer
		gender: "m", //String, either "m" or "f", changed when life is created
		name: {
			first: "John", //String, changed when life is created
			last: "Smith", //String, changed when life is created
		},
		net_worth: 0.0, //Float >= 0
	},
	//Diary Entries
	diary_entries: {
		born: " - I have been brought into this world. <br>",
		death: " - I died due to natural causes. I was aged {active_age_years} years and {active_age_days} days when I died. <br>",
	}
}