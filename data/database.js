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

//Life Variables
const database_life_variables = [
	//Status (0 = Empty, 1 = Alive and 2 = Dead)
	"status",
	//Common variables (Usually short)
	"age_days",
	"age_years",
	"birthday",
	"career_current",
	"career_longest",
	"date",
	"dsb",
	"education",
	"gender",
	"name_first",
	"name_last",
	"networth",
	//Diary (Longest of the bunch)
	"diary",
	//Life Number (Only for transferring use)
	"lifeno"
]

//Local Storage Items to be transferred by Firefox
const database_localstorage_names = [
	null,
	"firstlaunch",
	"transfer",
	"current_status",
	"past_status",
	"death",
	"settings_gamespeed",
	"settings_theme",
	"settings_volume"
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