//Checks if cookies work
Cookies.set("test" , 1)
if (Cookies.get("test") != 1){
	document.getElementById("notsupported_overlay").style.display = "block";
}

//Checks if life actually exists
if (Cookies.get("active_dsb") == null || Cookies.get("death") == 1){
	document.getElementById("notstarted_overlay").style.display = "block";
}

//This function changes the theme depending on which one has been chosen by profile.js
function switch_theme(){
	switch(parseInt(Cookies.get("theme"))){
	case 1:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/1_sunset.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/1_sunset.jpg')";
		break;
	case 2:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/2_forest.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/2_forest.jpg')";
		break;
	case 3:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/3_cityscape.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/3_cityscape.jpg')";
		break;
	case 4:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/4_rainy.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/4_rainy.jpg')";
		break;
	case 5:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/5_blocks.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/5_blocks.jpg')";
		break;
	case 6:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/6_paint.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/6_paint.jpg')";
		break;
	case 7:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/7_moon.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/7_moon.jpg')";
		break;
	case 8:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/8_waterfall.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/8_waterfall.jpg')";
		break;
	case 9:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/9_hexagon.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/9_hexagon.jpg')";
		break;
	case 10:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/10_road.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/10_road.jpg')";
		break;
	case 11:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/11_valley.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/11_valley.jpg')";
		break;
	case 12:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/12_train.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/12_train.jpg')";
		break;
	default:
		document.getElementById("main_body").style.backgroundImage = "url('wallpapers/1_sunset.jpg')";
		break;
	}
}
switch_theme()

//This function changes the life information
document.getElementById("main_diary_h1").innerHTML = Cookies.get("active_firstname") + " " + Cookies.get("active_surname") + "'s Diary"
document.getElementById("main_info_age").innerHTML = "Age: " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days"
switch (Cookies.get("active_gender")){
	case "m":
		document.getElementById("main_info_gender").innerHTML = "Gender: Male"
		break;
	case "f":
		document.getElementById("main_info_gender").innerHTML = "Gender: Female"
		break;
	default:
		document.getElementById("main_info_gender").innerHTML = "Gender: Error! You might want to restart your game."
}
document.getElementById("main_info_birthday").innerHTML = "Birthday:" + " " + Cookies.get("active_birthday")
document.getElementById("main_control_currentdate").innerHTML = Cookies.get("active_date")
document.getElementById("main_control_speed").value = 0

// This function turns on the education overlay when the education button on the action bar has been pressed
function education_overlay_on() {
	document.getElementById("education_overlay").style.display = "block";
}
// This function turns off the education overlay when the close button has been pressed
function education_overlay_off() {
	document.getElementById("education_overlay").style.display = "none";
}
// This function turns on the secondary education overlay when the view past results button has been pressed
function education_overlay_on() {
	document.getElementById("education2_overlay").style.display = "block";
}
// This function turns off the secondary education overlay when the blose button has been pressed
function education_overlay_off() {
	document.getElementById("education2_overlay").style.display = "none";
}
// This function turns on the end life overlay when the end life button has been pressed
function end_overlay_on() {
	document.getElementById("end_overlay").style.display = "block";
}
// This function turns off the end life overlay when the close button has been pressed
function end_overlay_off() {
	document.getElementById("end_overlay").style.display = "none";
}
// This function turns on the preserve life overlay when the preserve life button has been pressed
function preserve_overlay_on() {
	document.getElementById("preserve_overlay").style.display = "block";
}
// This function turns off the preserve life overlay when the close button has been pressed
function preserve_overlay_off() {
	document.getElementById("preserve_overlay").style.display = "none";
}
//This function turns on the save overlay when the save button on the action bar has been pressed
function save_overlay_on() {
	document.getElementById("save_overlay").style.display = "block";
}
// This function turns off the save overlay when the close button has been pressed
function save_overlay_off() {
	document.getElementById("save_overlay").style.display = "none";
}
//This function turns on the settings overlay when the settings button on the action bar has been pressed
function settings_overlay_on() {
	document.getElementById("settings_overlay").style.display = "block";
}
// This function turns off the settings overlay when the close button has been pressed
function settings_overlay_off() {
	document.getElementById("settings_overlay").style.display = "none";
}
// This function turns off the secondary settings overlay when the close button or the no button has been pressed
function settings2_overlay_off() {
	document.getElementById("settings2_overlay").style.display = "none";
}

//This function creates temporary variables that can later be changed
var volume_temp = parseInt(Cookies.get("volume"));
var theme_temp = parseInt(Cookies.get("theme"));
var gamespeed_temp = parseInt(Cookies.get("gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;

//This function changes the text on the secondary overlay according to the settings
function settings_sure(){
	document.getElementById("settings2_overlay").style.display = "block";
	volume_temp = document.getElementById("settings_volume").value;
	if (document.getElementById("settings_gamespeed1").checked){
		gamespeed_temp = 1;
	}
	else if (document.getElementById("settings_gamespeed2").checked){
		gamespeed_temp = 2;
	}
	else{
		gamespeed_temp = 3;
	}
}

//This function changes the value of the settings theme button
function settings_theme(){
	if (theme_temp == 12){
		theme_temp = 1
	}
	else {
		theme_temp = theme_temp + 1
	}
	switch(theme_temp){
		case 1:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/1_sunset.jpg')";
			break;
		case 2:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/2_forest.jpg')";
			break;
		case 3:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/3_cityscape.jpg')";
			break;
		case 4:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/4_rainy.jpg')";
			break;
		case 5:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/5_blocks.jpg')";
			break;
		case 6:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/6_paint.jpg')";
			break;
		case 7:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/7_moon.jpg')";
			break;
		case 8:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/8_waterfall.jpg')";
			break;
		case 9:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/9_hexagon.jpg')";
			break;
		case 10:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/10_road.jpg')";
			break;
		case 11:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/11_valley.jpg')";
			break;
		case 12:
			document.getElementById("settings_theme").style.backgroundImage = "url('wallpapers/previews/12_train.jpg')";
			break;
	}
}

//This function saves all changes made in the settings overlay to profile.js
function settings_save(){
	Cookies.set("volume",volume_temp);
	Cookies.set("theme",theme_temp);
	Cookies.set("gamespeed",gamespeed_temp);
	switch_theme()
	settings2_overlay_off()
}

//This function adds the wait function, which tells the program to hold for a given amount of milliseconds
function wait(ms){
	var d = new Date();
	var d2 = null;
	do { d2 = new Date();}
	while(d2-d < ms);
}

//This function forwards the game by one day, and determines what happens during that day
function progress(){
	if (breakfn == 0){
		if (Cookies.get("active_dsb") == 0){
			document.getElementById("main_diary_p").innerHTML = Cookies.get("active_birthday") + " - I have been brought into this world. <br>";
		}
		Cookies.set("active_date", (toDMY(toUnix(Cookies.get("active_date")) + 2))) //Sets the active day to be one day after
		//If the month and day of the current day and the month and day of the character's birthday mathes, the age goes up by 1. Else, the days goes up by 1.
		if (Cookies.get("active_date").split("/").slice(-2).join("/") == Cookies.get("active_birthday").split("/").slice(-2).join("/")){
			Cookies.set("active_age_years", (parseInt(Cookies.get("active_age_years")) + 1))
			Cookies.set("active_age_days", 0)
		}
		else {
			Cookies.set("active_age_days", (parseInt(Cookies.get("active_age_days")) + 1))
		}
		Cookies.set("active_dsb", (parseInt(Cookies.get("active_dsb")) + 1)) //Sets the active days since birth to be one more
		document.getElementById("main_control_currentdate").innerHTML = Cookies.get("active_date")
		document.getElementById("main_info_age").innerHTML = "Age: " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days"
		//Natural Death
		var death_x = Math.random()
		if(Math.pow(10 , ((Cookies.get("active_dsb"))) * 0.0001) >= 10000000 * death_x){
			breakfn = 2
			console.log("Dead at " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days due to a death_x of " + death_x.toString())
			Cookies.set("death", "1")
			document.getElementById("main_diary_p").innerHTML = document.getElementById("main_diary_p").innerHTML + Cookies.get("active_date") + " - I died due to natural causes. I was aged " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days when I died. <br>"
			document.getElementById("main_audio_death").volume = Cookies.get("volume") / 100
			document.getElementById("main_audio_death").play()
			document.getElementById("death_overlay").style.display = "block";
			document.getElementById("death_died").innerHTML = Cookies.get("active_firstname") + " " + Cookies.get("active_surname") + " has died on " + Cookies.get("active_date") + " due to natural causes."
			switch (Cookies.get("active_gender")){
			case "m":
				document.getElementById("death_age").innerHTML = "He was at an age of " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days."
				break;
			case "f":
				document.getElementById("death_age").innerHTML = "She was at an age of " + Cookies.get("active_age_years") + " years " + Cookies.get("active_age_days") + " days."
				break;
			}
		}
		wait(1000*(Math.pow(10, (-0.03*document.getElementById("main_control_speed").value))) - 1)
	}
}
//This function tells the program what to do when the start and pause buttons are pressed
var iteration = 0
if (Cookies.get("death") == 0){
	var breakfn = 1
}
function timestart(){
	if (breakfn == 1){
		breakfn = 0
	}
	for (iteration = 0; iteration < 50000; iteration++){
		setTimeout(function(){progress()}, 0);
	}
}
function timepause(){
	breakfn = 1;
}

//This function ends the life of the current player without saving
function endlife(){
	window.location.href = "../home.html"
}

//This function changes the text on the inside of the save life div
document.getElementById("save_overlay").style.display = "block";
if(Cookies.get("current_status").split(",")[1] == 1){
	document.getElementById("save_div_1").innerHTML = "Life 1: " + Cookies.get("current_firstname").split(",")[1] + " " +  Cookies.get("current_surname").split(",")[1];
}
if(Cookies.get("current_status").split(",")[2] == 1){
	document.getElementById("save_div_2").innerHTML = "Life 2: " + Cookies.get("current_firstname").split(",")[2] + " " +  Cookies.get("current_surname").split(",")[2];
}
if(Cookies.get("current_status").split(",")[3] == 1){
	document.getElementById("save_div_3").innerHTML = "Life 3: " + Cookies.get("current_firstname").split(",")[3] + " " +  Cookies.get("current_surname").split(",")[3];
}
if(Cookies.get("current_status").split(",")[4] == 1){
	document.getElementById("save_div_4").innerHTML = "Life 4: " + Cookies.get("current_firstname").split(",")[4] + " " +  Cookies.get("current_surname").split(",")[4];
}
if(Cookies.get("current_status").split(",")[5] == 1){
	document.getElementById("save_div_5").innerHTML = "Life 5: " + Cookies.get("current_firstname").split(",")[5] + " " +  Cookies.get("current_surname").split(",")[5];
}
if(Cookies.get("current_status").split(",")[6] == 1){
	document.getElementById("save_div_6").innerHTML = "Life 6: " + Cookies.get("current_firstname").split(",")[6] + " " +  Cookies.get("current_surname").split(",")[6];
}
if(Cookies.get("current_status").split(",")[7] == 1){
	document.getElementById("save_div_7").innerHTML = "Life 7: " + Cookies.get("current_firstname").split(",")[7] + " " +  Cookies.get("current_surname").split(",")[7];
}
if(Cookies.get("current_status").split(",")[8] == 1){
	document.getElementById("save_div_8").innerHTML = "Life 8: " + Cookies.get("current_firstname").split(",")[8] + " " +  Cookies.get("current_surname").split(",")[8];
}
if(Cookies.get("current_status").split(",")[9] == 1){
	document.getElementById("save_div_9").innerHTML = "Life 9: " + Cookies.get("current_firstname").split(",")[9] + " " + Cookies.get("current_surname").split(",")[9];
}
if(Cookies.get("current_status").split(",")[10] == 1){
	document.getElementById("save_div_10").innerHTML = "Life 10: " + Cookies.get("current_firstname").split(",")[10] + " " + Cookies.get("current_surname").split(",")[10];
}

//This function changes the text on the inside of the preserve life div
function preserve(){
	document.getElementById("preserve_overlay").style.display = "block";
	if(Cookies.get("past_status").split(",")[1] == 1){
		document.getElementById("preserve_div_1").innerHTML = "Life 1: " + Cookies.get("past_name").split(",")[1];
	}
	if(Cookies.get("past_status").split(",")[2] == 1){
		document.getElementById("preserve_div_2").innerHTML = "Life 2: " + Cookies.get("past_name").split(",")[2];
	}
	if(Cookies.get("past_status").split(",")[3] == 1){
		document.getElementById("preserve_div_3").innerHTML = "Life 3: " + Cookies.get("past_name").split(",")[3];
	}
	if(Cookies.get("past_status").split(",")[4] == 1){
		document.getElementById("preserve_div_4").innerHTML = "Life 4: " + Cookies.get("past_name").split(",")[4];
	}
	if(Cookies.get("past_status").split(",")[5] == 1){
		document.getElementById("preserve_div_5").innerHTML = "Life 5: " + Cookies.get("past_name").split(",")[5];
	}
	if(Cookies.get("past_status").split(",")[6] == 1){
		document.getElementById("preserve_div_6").innerHTML = "Life 6: " + Cookies.get("past_name").split(",")[6];
	}
	if(Cookies.get("past_status").split(",")[7] == 1){
		document.getElementById("preserve_div_7").innerHTML = "Life 7: " + Cookies.get("past_name").split(",")[7];
	}
	if(Cookies.get("past_status").split(",")[8] == 1){
		document.getElementById("preserve_div_8").innerHTML = "Life 8: " + Cookies.get("past_name").split(",")[8];
	}
	if(Cookies.get("past_status").split(",")[9] == 1){
		document.getElementById("preserve_div_9").innerHTML = "Life 9: " + Cookies.get("past_name").split(",")[9];
	}
	if(Cookies.get("past_status").split(",")[10] == 1){
		document.getElementById("preserve_div_10").innerHTML = "Life 10: " + Cookies.get("past_name").split(",")[10];
	}
	if(Cookies.get("past_status").split(",")[11] == 1){
		document.getElementById("preserve_div_11").innerHTML = "Life 11: " + Cookies.get("past_name").split(",")[11];
	}
	if(Cookies.get("past_status").split(",")[12] == 1){
		document.getElementById("preserve_div_12").innerHTML = "Life 12: " + Cookies.get("past_name").split(",")[12];
	}
	if(Cookies.get("past_status").split(",")[13] == 1){
		document.getElementById("preserve_div_13").innerHTML = "Life 13: " + Cookies.get("past_name").split(",")[13];
	}
	if(Cookies.get("past_status").split(",")[14] == 1){
		document.getElementById("preserve_div_14").innerHTML = "Life 14: " + Cookies.get("past_name").split(",")[14];
	}
	if(Cookies.get("past_status").split(",")[15] == 1){
		document.getElementById("preserve_div_15").innerHTML = "Life 15: " + Cookies.get("past_name").split(",")[15];
	}
	if(Cookies.get("past_status").split(",")[16] == 1){
		document.getElementById("preserve_div_16").innerHTML = "Life 16: " + Cookies.get("past_name").split(",")[16];
	}
	if(Cookies.get("past_status").split(",")[17] == 1){
		document.getElementById("preserve_div_17").innerHTML = "Life 17: " + Cookies.get("past_name").split(",")[17];
	}
	if(Cookies.get("past_status").split(",")[18] == 1){
		document.getElementById("preserve_div_18").innerHTML = "Life 18: " + Cookies.get("past_name").split(",")[18];
	}
	if(Cookies.get("past_status").split(",")[19] == 1){
		document.getElementById("preserve_div_19").innerHTML = "Life 19: " + Cookies.get("past_name").split(",")[19];
	}
	if(Cookies.get("past_status").split(",")[20] == 1){
		document.getElementById("preserve_div_20").innerHTML = "Life 20: " + Cookies.get("past_name").split(",")[20];
	}
	if(Cookies.get("past_status").split(",")[21] == 1){
		document.getElementById("preserve_div_21").innerHTML = "Life 21: " + Cookies.get("past_name").split(",")[21];
	}
	if(Cookies.get("past_status").split(",")[22] == 1){
		document.getElementById("preserve_div_22").innerHTML = "Life 22: " + Cookies.get("past_name").split(",")[22];
	}
	if(Cookies.get("past_status").split(",")[23] == 1){
		document.getElementById("preserve_div_23").innerHTML = "Life 23: " + Cookies.get("past_name").split(",")[23];
	}
	if(Cookies.get("past_status").split(",")[24] == 1){
		document.getElementById("preserve_div_24").innerHTML = "Life 24: " + Cookies.get("past_name").split(",")[24];
	}
	if(Cookies.get("past_status").split(",")[25] == 1){
		document.getElementById("preserve_div_25").innerHTML = "Life 25: " + Cookies.get("past_name").split(",")[25];
	}
	if(Cookies.get("past_status").split(",")[26] == 1){
		document.getElementById("preserve_div_26").innerHTML = "Life 26: " + Cookies.get("past_name").split(",")[26];
	}
	if(Cookies.get("past_status").split(",")[27] == 1){
		document.getElementById("preserve_div_27").innerHTML = "Life 27: " + Cookies.get("past_name").split(",")[27];
	}
	if(Cookies.get("past_status").split(",")[28] == 1){
		document.getElementById("preserve_div_28").innerHTML = "Life 28: " + Cookies.get("past_name").split(",")[28];
	}
	if(Cookies.get("past_status").split(",")[29] == 1){
		document.getElementById("preserve_div_29").innerHTML = "Life 29: " + Cookies.get("past_name").split(",")[29];
	}
	if(Cookies.get("past_status").split(",")[30] == 1){
		document.getElementById("preserve_div_30").innerHTML = "Life 30: " + Cookies.get("past_name").split(",")[30];
	}
}

//This function saves the life into the continue lives tab
function save_life(life_no){
	Cookies.set("current_status" , (Cookies.get("current_status").split(",").splice(0,life_no) + ",1," + Cookies.get("current_status").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_firstname" , (Cookies.get("current_firstname").split(",").splice(0,life_no) + "," + Cookies.get("active_firstname") + "," + Cookies.get("current_firstname").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_surname" , (Cookies.get("current_surname").split(",").splice(0,life_no) + "," + Cookies.get("active_surname") + "," + Cookies.get("current_surname").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_gender" , (Cookies.get("current_gender").split(",").splice(0,life_no) + "," + Cookies.get("active_gender") + "," + Cookies.get("current_gender").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_date" , (Cookies.get("current_date").split(",").splice(0,life_no) + "," + Cookies.get("active_date") + "," + Cookies.get("current_date").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_age_years" , (Cookies.get("current_age_years").split(",").splice(0,life_no) + "," + Cookies.get("active_age_years") + "," + Cookies.get("current_age_years").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_age_days" , (Cookies.get("current_age_days").split(",").splice(0,life_no) + "," + Cookies.get("active_age_days") + "," + Cookies.get("current_age_days").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_birthday" , (Cookies.get("current_birthday").split(",").splice(0,life_no) + "," + Cookies.get("active_birthday") + "," + Cookies.get("current_birthday").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_date" , (Cookies.get("current_date").split(",").splice(0,life_no) + "," + Cookies.get("active_date") + "," + Cookies.get("current_date").split(",").splice(life_no + 1)).split(","))
	Cookies.set("current_dsb" , (Cookies.get("current_dsb").split(",").splice(0,life_no) + "," + Cookies.get("active_dsb") + "," + Cookies.get("current_dsb").split(",").splice(life_no + 1)).split(","))
	window.location.href = "../home.html"
}

//This function saves the life into the pasts lives tab
function preserve_life(life_no){
	Cookies.set("past_status" , (Cookies.get("past_status").split(",").splice(0,life_no) + ",1," + Cookies.get("past_status").split(",").splice(life_no + 1)).split(","))
	Cookies.set("past_name" , (Cookies.get("past_name").split(",").splice(0,life_no) + "," + Cookies.get("active_firstname") + " " + Cookies.get("active_surname") + "," + Cookies.get("past_name").split(",").splice(life_no + 1)).split(","))
	Cookies.set("past_age" , (Cookies.get("past_age").split(",").splice(0,life_no) + "," + Cookies.get("active_age_years") + "," + Cookies.get("past_age").split(",").splice(life_no + 1)).split(","))
	Cookies.set("past_date" , (Cookies.get("past_date").split(",").splice(0,life_no) + "," + Cookies.get("active_date") + "," + Cookies.get("past_date").split(",").splice(life_no + 1)).split(","))
	window.location.href = "../home.html"
}

//Following code makes final adjustments to page
save_overlay_off();