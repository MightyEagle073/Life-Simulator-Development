//Sets settings to default values if not already set
if (Cookies.get("volume") == null){
	Cookies.set("volume",100);
}
if (Cookies.get("theme") == null){
	Cookies.set("theme",1);
}
if (Cookies.get("gamespeed") == null){
	Cookies.set("gamespeed",1);
}
//Sets profile values to default values if not already set
console.log(Cookies.get("firstlaunch"));
if (Cookies.get("firstlaunch") == null){
	Cookies.set("current_status","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_firstname","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_surname","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_gender","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_date","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_birthday","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_age_years","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_age_days","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("current_dsb","0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_status","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_name","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_age","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_date","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_wealth","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	Cookies.set("past_career","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	console.log("You just got slapped in the face");
}

//Sets first launch variable to 1, thne checks if cookies work
Cookies.set("firstlaunch" , 1)
if (Cookies.get("firstlaunch") != 1){
	document.getElementById("notsupported_overlay").style.display = "block";
}

//This function changes the text in continue life section according to profile.js
if (Cookies.get("current_status").split(",")[1] == 1){
	document.getElementById("continuelife_savefile1_name").innerHTML = Cookies.get("current_firstname").split(",")[1] + " "+ Cookies.get("current_surname").split(",")[1];
	document.getElementById("continuelife_savefile1_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[1];
	document.getElementById("continuelife_savefile1_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[1];
}
if (Cookies.get("current_status").split(",")[2] == 1){
	document.getElementById("continuelife_savefile2_name").innerHTML = Cookies.get("current_firstname").split(",")[2] + " "+ Cookies.get("current_surname").split(",")[2];
	document.getElementById("continuelife_savefile2_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[2];
	document.getElementById("continuelife_savefile2_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[2];
}
if (Cookies.get("current_status").split(",")[3] == 1){
	document.getElementById("continuelife_savefile3_name").innerHTML = Cookies.get("current_firstname").split(",")[3] + " "+ Cookies.get("current_surname").split(",")[3];
	document.getElementById("continuelife_savefile3_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[3];
	document.getElementById("continuelife_savefile3_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[3];
}
if (Cookies.get("current_status").split(",")[4] == 1){
	document.getElementById("continuelife_savefile4_name").innerHTML = Cookies.get("current_firstname").split(",")[4] + " "+ Cookies.get("current_surname").split(",")[4];
	document.getElementById("continuelife_savefile4_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[4];
	document.getElementById("continuelife_savefile4_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[4];
}
if (Cookies.get("current_status").split(",")[5] == 1){
	document.getElementById("continuelife_savefile5_name").innerHTML = Cookies.get("current_firstname").split(",")[5] + " "+ Cookies.get("current_surname").split(",")[5];
	document.getElementById("continuelife_savefile5_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[5];
	document.getElementById("continuelife_savefile5_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[5];
}
if (Cookies.get("current_status").split(",")[6] == 1){
	document.getElementById("continuelife_savefile6_name").innerHTML = Cookies.get("current_firstname").split(",")[6] + " "+ Cookies.get("current_surname").split(",")[6];
	document.getElementById("continuelife_savefile6_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[6];
	document.getElementById("continuelife_savefile6_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[6];
}
if (Cookies.get("current_status").split(",")[7] == 1){
	document.getElementById("continuelife_savefile7_name").innerHTML = Cookies.get("current_firstname").split(",")[7] + " "+ Cookies.get("current_surname").split(",")[7];
	document.getElementById("continuelife_savefile7_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[7];
	document.getElementById("continuelife_savefile7_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[7];
}
if (Cookies.get("current_status").split(",")[8] == 1){
	document.getElementById("continuelife_savefile8_name").innerHTML = Cookies.get("current_firstname").split(",")[8] + " "+ Cookies.get("current_surname").split(",")[8];
	document.getElementById("continuelife_savefile8_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[8];
	document.getElementById("continuelife_savefile8_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[8];
}
if (Cookies.get("current_status").split(",")[9] == 1){
	document.getElementById("continuelife_savefile9_name").innerHTML = Cookies.get("current_firstname").split(",")[9] + " "+ Cookies.get("current_surname").split(",")[9];
	document.getElementById("continuelife_savefile9_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[9];
	document.getElementById("continuelife_savefile9_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[9];
}
if (Cookies.get("current_status").split(",")[10] == 1){
	document.getElementById("continuelife_savefile10_name").innerHTML = Cookies.get("current_firstname").split(",")[10] + " "+ Cookies.get("current_surname").split(",")[10];
	document.getElementById("continuelife_savefile10_age").innerHTML = "Age: "+ Cookies.get("current_age_years").split(",")[10];
	document.getElementById("continuelife_savefile10_date").innerHTML = "Date: "+ Cookies.get("current_date").split(",")[10];
}
//This function changes the text in the past lives section according to profile.js
if (Cookies.get("past_status").split(",")[1] == 1){
	document.getElementById("pastlives_save1_name").innerHTML = Cookies.get("past_name").split(",")[1];
	document.getElementById("pastlives_save1_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[1];
	document.getElementById("pastlives_save1_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[1];
	document.getElementById("pastlives_save1_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[1];
	document.getElementById("pastlives_save1_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[1]];
}
if (Cookies.get("past_status").split(",")[2] == 1){
	document.getElementById("pastlives_save2_name").innerHTML = Cookies.get("past_name").split(",")[2];
	document.getElementById("pastlives_save2_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[2];
	document.getElementById("pastlives_save2_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[2];
	document.getElementById("pastlives_save2_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[2];
	document.getElementById("pastlives_save2_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[2]];
}
if (Cookies.get("past_status").split(",")[3] == 1){
	document.getElementById("pastlives_save3_name").innerHTML = Cookies.get("past_name").split(",")[3];
	document.getElementById("pastlives_save3_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[3];
	document.getElementById("pastlives_save3_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[3];
	document.getElementById("pastlives_save3_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[3];
	document.getElementById("pastlives_save3_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[3]];
}
if (Cookies.get("past_status").split(",")[4] == 1){
	document.getElementById("pastlives_save4_name").innerHTML = Cookies.get("past_name").split(",")[4];
	document.getElementById("pastlives_save4_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[4];
	document.getElementById("pastlives_save4_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[4];
	document.getElementById("pastlives_save4_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[4];
	document.getElementById("pastlives_save4_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[4]];
}
if (Cookies.get("past_status").split(",")[5] == 1){
	document.getElementById("pastlives_save5_name").innerHTML = Cookies.get("past_name").split(",")[5];
	document.getElementById("pastlives_save5_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[5];
	document.getElementById("pastlives_save5_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[5];
	document.getElementById("pastlives_save5_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[5];
	document.getElementById("pastlives_save5_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[5]];
}
if (Cookies.get("past_status").split(",")[6] == 1){
	document.getElementById("pastlives_save6_name").innerHTML = Cookies.get("past_name").split(",")[6];
	document.getElementById("pastlives_save6_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[6];
	document.getElementById("pastlives_save6_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[6];
	document.getElementById("pastlives_save6_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[6];
	document.getElementById("pastlives_save6_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[6]];
}
if (Cookies.get("past_status").split(",")[7] == 1){
	document.getElementById("pastlives_save7_name").innerHTML = Cookies.get("past_name").split(",")[7];
	document.getElementById("pastlives_save7_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[7];
	document.getElementById("pastlives_save7_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[7];
	document.getElementById("pastlives_save7_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[7];
	document.getElementById("pastlives_save7_career").innerHTML = "Career: " + database_careers[Cookies.get("past_caree").split(",")[7]];
}
if (Cookies.get("past_status").split(",")[8] == 1){
	document.getElementById("pastlives_save8_name").innerHTML = Cookies.get("past_name").split(",")[8];
	document.getElementById("pastlives_save8_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[8];
	document.getElementById("pastlives_save8_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[8];
	document.getElementById("pastlives_save8_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[8];
	document.getElementById("pastlives_save8_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[8]];
}
if (Cookies.get("past_status").split(",")[9] == 1){
	document.getElementById("pastlives_save9_name").innerHTML = Cookies.get("past_name").split(",")[9];
	document.getElementById("pastlives_save9_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[9];
	document.getElementById("pastlives_save9_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[9];
	document.getElementById("pastlives_save9_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[9];
	document.getElementById("pastlives_save9_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[9]];
}
if (Cookies.get("past_status").split(",")[10] == 1){
	document.getElementById("pastlives_save10_name").innerHTML = Cookies.get("past_name").split(",")[10];
	document.getElementById("pastlives_save10_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[10];
	document.getElementById("pastlives_save10_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[10];
	document.getElementById("pastlives_save10_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[10];
	document.getElementById("pastlives_save10_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[10]];
}
if (Cookies.get("past_status").split(",")[11] == 1){
	document.getElementById("pastlives_save11_name").innerHTML = Cookies.get("past_name").split(",")[11];
	document.getElementById("pastlives_save11_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[11];
	document.getElementById("pastlives_save11_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[11];
	document.getElementById("pastlives_save11_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[11];
	document.getElementById("pastlives_save11_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[11]];
}
if (Cookies.get("past_status").split(",")[12] == 1){
	document.getElementById("pastlives_save12_name").innerHTML = Cookies.get("past_name").split(",")[12];
	document.getElementById("pastlives_save12_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[12];
	document.getElementById("pastlives_save12_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[12];
	document.getElementById("pastlives_save12_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[12];
	document.getElementById("pastlives_save12_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[12]];
}
if (Cookies.get("past_status").split(",")[13] == 1){
	document.getElementById("pastlives_save13_name").innerHTML = Cookies.get("past_name").split(",")[13];
	document.getElementById("pastlives_save13_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[13];
	document.getElementById("pastlives_save13_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[13];
	document.getElementById("pastlives_save13_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[13];
	document.getElementById("pastlives_save13_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[13]];
}
if (Cookies.get("past_status").split(",")[14] == 1){
	document.getElementById("pastlives_save14_name").innerHTML = Cookies.get("past_name").split(",")[14];
	document.getElementById("pastlives_save14_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[14];
	document.getElementById("pastlives_save14_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[14];
	document.getElementById("pastlives_save14_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[14];
	document.getElementById("pastlives_save14_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[14]];
}
if (Cookies.get("past_status").split(",")[15] == 1){
	document.getElementById("pastlives_save15_name").innerHTML = Cookies.get("past_name").split(",")[15];
	document.getElementById("pastlives_save15_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[15];
	document.getElementById("pastlives_save15_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[15];
	document.getElementById("pastlives_save15_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[15];
	document.getElementById("pastlives_save15_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[15]];
}
if (Cookies.get("past_status").split(",")[16] == 1){
	document.getElementById("pastlives_save16_name").innerHTML = Cookies.get("past_name").split(",")[16];
	document.getElementById("pastlives_save16_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[16];
	document.getElementById("pastlives_save16_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[16];
	document.getElementById("pastlives_save16_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[16];
	document.getElementById("pastlives_save16_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[16]];
}
if (Cookies.get("past_status").split(",")[17] == 1){
	document.getElementById("pastlives_save17_name").innerHTML = Cookies.get("past_name").split(",")[17];
	document.getElementById("pastlives_save17_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[17];
	document.getElementById("pastlives_save17_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[17];
	document.getElementById("pastlives_save17_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[17];
	document.getElementById("pastlives_save17_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[17]];
}
if (Cookies.get("past_status").split(",")[18] == 1){
	document.getElementById("pastlives_save18_name").innerHTML = Cookies.get("past_name").split(",")[18];
	document.getElementById("pastlives_save18_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[18];
	document.getElementById("pastlives_save18_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[18];
	document.getElementById("pastlives_save18_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[18];
	document.getElementById("pastlives_save18_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[18]];
}
if (Cookies.get("past_status").split(",")[19] == 1){
	document.getElementById("pastlives_save19_name").innerHTML = Cookies.get("past_name").split(",")[19];
	document.getElementById("pastlives_save19_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[19];
	document.getElementById("pastlives_save19_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[19];
	document.getElementById("pastlives_save19_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[19];
	document.getElementById("pastlives_save19_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[19]];
}
if (Cookies.get("past_status").split(",")[20] == 1){
	document.getElementById("pastlives_save20_name").innerHTML = Cookies.get("past_name").split(",")[20];
	document.getElementById("pastlives_save20_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[20];
	document.getElementById("pastlives_save20_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[20];
	document.getElementById("pastlives_save20_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[20];
	document.getElementById("pastlives_save20_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[20]];
}
if (Cookies.get("past_status").split(",")[21] == 1){
	document.getElementById("pastlives_save21_name").innerHTML = Cookies.get("past_name").split(",")[21];
	document.getElementById("pastlives_save21_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[21];
	document.getElementById("pastlives_save21_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[21];
	document.getElementById("pastlives_save21_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[21];
	document.getElementById("pastlives_save21_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[21]];
}
if (Cookies.get("past_status").split(",")[22] == 1){
	document.getElementById("pastlives_save22_name").innerHTML = Cookies.get("past_name").split(",")[22];
	document.getElementById("pastlives_save22_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[22];
	document.getElementById("pastlives_save22_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[22];
	document.getElementById("pastlives_save22_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[22];
	document.getElementById("pastlives_save22_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[22]];
}
if (Cookies.get("past_status").split(",")[23] == 1){
	document.getElementById("pastlives_save23_name").innerHTML = Cookies.get("past_name").split(",")[23];
	document.getElementById("pastlives_save23_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[23];
	document.getElementById("pastlives_save23_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[23];
	document.getElementById("pastlives_save23_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[23];
	document.getElementById("pastlives_save23_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[23]];
}
if (Cookies.get("past_status").split(",")[24] == 1){
	document.getElementById("pastlives_save24_name").innerHTML = Cookies.get("past_name").split(",")[24];
	document.getElementById("pastlives_save24_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[24];
	document.getElementById("pastlives_save24_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[24];
	document.getElementById("pastlives_save24_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[24];
	document.getElementById("pastlives_save24_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[24]];
}
if (Cookies.get("past_status").split(",")[25] == 1){
	document.getElementById("pastlives_save25_name").innerHTML = Cookies.get("past_name").split(",")[25];
	document.getElementById("pastlives_save25_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[25];
	document.getElementById("pastlives_save25_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[25];
	document.getElementById("pastlives_save25_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[25];
	document.getElementById("pastlives_save25_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[25]];
}
if (Cookies.get("past_status").split(",")[26] == 1){
	document.getElementById("pastlives_save26_name").innerHTML = Cookies.get("past_name").split(",")[26];
	document.getElementById("pastlives_save26_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[26];
	document.getElementById("pastlives_save26_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[26];
	document.getElementById("pastlives_save26_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[26];
	document.getElementById("pastlives_save26_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[26]];
}
if (Cookies.get("past_status").split(",")[27] == 1){
	document.getElementById("pastlives_save27_name").innerHTML = Cookies.get("past_name").split(",")[27];
	document.getElementById("pastlives_save27_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[27];
	document.getElementById("pastlives_save27_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[27];
	document.getElementById("pastlives_save27_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[27];
	document.getElementById("pastlives_save27_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[27]];
}
if (Cookies.get("past_status").split(",")[28] == 1){
	document.getElementById("pastlives_save28_name").innerHTML = Cookies.get("past_name").split(",")[28];
	document.getElementById("pastlives_save28_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[28];
	document.getElementById("pastlives_save28_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[28];
	document.getElementById("pastlives_save28_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[28];
	document.getElementById("pastlives_save28_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[28]];
}
if (Cookies.get("past_status").split(",")[29] == 1){
	document.getElementById("pastlives_save29_name").innerHTML = Cookies.get("past_name").split(",")[29];
	document.getElementById("pastlives_save29_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[29];
	document.getElementById("pastlives_save29_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[29];
	document.getElementById("pastlives_save29_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[29];
	document.getElementById("pastlives_save29_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[29]];
}
if (Cookies.get("past_status").split(",")[30] == 1){
	document.getElementById("pastlives_save30_name").innerHTML = Cookies.get("past_name").split(",")[30];
	document.getElementById("pastlives_save30_age").innerHTML = "Age: " + Cookies.get("past_age").split(",")[30];
	document.getElementById("pastlives_save30_date").innerHTML = "Date: " + Cookies.get("past_date").split(",")[30];
	document.getElementById("pastlives_save30_wealth").innerHTML = "Net Worth: $" + Cookies.get("past_wealth").split(",")[30];
	document.getElementById("pastlives_save30_career").innerHTML = "Career: " + database_careers[Cookies.get("past_career").split(",")[30]];
}
//This function changes the settings according to profile.js
document.getElementById("settings_volume").value = Cookies.get("volume");
if (parseInt(Cookies.get("gamespeed")) == 1){
	document.getElementById("settings_gamespeed1").checked = true;
}
else if (parseInt(Cookies.get("gamespeed")) == 2){
	document.getElementById("settings_gamespeed2").checked = true;
}
else{
	document.getElementById("settings_gamespeed3").checked = true;
}
//This function changes the theme depending on which one has been chosen by profile.js
function switch_theme(){
	switch(parseInt(Cookies.get("theme"))){
	case 1:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/1_sunset.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/1_sunset.jpg')";
		break;
	case 2:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/2_forest.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/2_forest.jpg')";
		break;
	case 3:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/3_cityscape.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/3_cityscape.jpg')";
		break;
	case 4:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/4_rainy.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/4_rainy.jpg')";
		break;
	case 5:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/5_blocks.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/5_blocks.jpg')";
		break;
	case 6:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/6_paint.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/6_paint.jpg')";
		break;
	case 7:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/7_moon.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/7_moon.jpg')";
		break;
	case 8:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/8_waterfall.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/8_waterfall.jpg')";
		break;
	case 9:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/9_hexagon.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/9_hexagon.jpg')";
		break;
	case 10:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/10_road.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/10_road.jpg')";
		break;
	case 11:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/11_valley.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/11_valley.jpg')";
		break;
	case 12:
		document.getElementById("home_body").style.backgroundImage = "url('data/wallpapers/12_train.jpg')";
		document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/12_train.jpg')";
		break;
	}
}
switch_theme()

//This function creates temporary variables that can later be changed
var volume_temp = parseInt(Cookies.get("volume"));
var theme_temp = parseInt(Cookies.get("theme"));
var gamespeed_temp = parseInt(Cookies.get("gamespeed"));
var newfirstname_temp = "Atkin";
var newsurname_temp = "Jasons";
var newgender_temp = "male";
var newdate_temp = 14434;
var life_no_temp = 0;

// This function turns on the new life overlay when the new life button has been pressed
function newlife_overlay_on() {
	document.getElementById("newlife_overlay").style.display = "block";
}
// This function turns off the new life overlay when the close button has been pressed
function newlife_overlay_off() {
	document.getElementById("newlife_overlay").style.display = "none";
}
// This function turns on the continue life overlay when the continue life button has been pressed
function continuelife_overlay_on() {
	document.getElementById("continuelife_overlay").style.display = "block";
}
// This function turns off the continue life overlay when the close button has been pressed
function continuelife_overlay_off() {
	document.getElementById("continuelife_overlay").style.display = "none";
}
//This function turns on the past lives overlay when the past lives button has been pressed
function pastlives_overlay_on() {
	document.getElementById("pastlives_overlay").style.display = "block";
}
// This function turns off the past lives overlay when the close button has been pressed
function pastlives_overlay_off() {
	document.getElementById("pastlives_overlay").style.display = "none";
}
//This function turns on the settings overlay when the past lives button has been pressed
function settings_overlay_on() {
	document.getElementById("settings_overlay").style.display = "block";
}
// This function turns off the settings overlay when the close button has been pressed
function settings_overlay_off() {
	document.getElementById("settings_overlay").style.display = "none";
}
//This function turns on the credits overlay when the past lives button has been pressed
function credits_overlay_on() {
	document.getElementById("credits_overlay").style.display = "block";
}
// This function turns off the credits overlay when the close button has been pressed
function credits_overlay_off() {
	document.getElementById("credits_overlay").style.display = "none";
}
// This function turns off the secondary new live overlay when the close button or the no button has been pressed
function newlife2_overlay_off() {
	document.getElementById("newlife2_overlay").style.display = "none";
}
// This function turns off the secondary continue live overlay when the close button or the no button has been pressed
function continuelife2_overlay_off() {
	document.getElementById("continuelife2_overlay").style.display = "none";
}
// This function turns off the secondary settings overlay when the close button or the no button has been pressed
function settings2_overlay_off() {
	document.getElementById("settings2_overlay").style.display = "none";
}
//This function sets the default date of #newlife_dob to the current day
$(document).ready( function() {
var now = new Date();
var month = (now.getMonth() + 1);               
var day = now.getDate();
if (month < 10) 
	month = "0" + month;
if (day < 10) 
	day = "0" + day;
var today = now.getFullYear() + '-' + month + '-' + day;
$('#newlife_dob').val(today);
});

//This function changes the text on the secondary overlay according to which life has been chosen
function continueFn(life_no) {
	life_no_temp = life_no
	if (Cookies.get("current_status").split(",")[life_no] == 1){
		document.getElementById("continuelife2_h1").innerHTML = "Continue Life " + life_no.toString() + "?";
		document.getElementById("continuelife2_p").innerHTML = "Would you like to continue the life of <strong>" + Cookies.get("current_firstname").split(",")[life_no] + " " + Cookies.get("current_surname").split(",")[life_no] + "</strong>, aged <strong>" + 	Cookies.get("current_age_years").split(",")[life_no] + "</strong>, from <strong>" + Cookies.get("current_date").split(",")[life_no] + "</strong>?";
		document.getElementById("continuelife2_overlay").style.display = "block";
	}
}

//This function loads the game onto the main tab
function continuelife() {
	Cookies.set("active_firstname" , Cookies.get("current_firstname").split(",")[life_no_temp]);
	Cookies.set("active_surname" , Cookies.get("current_surname").split(",")[life_no_temp]);
	Cookies.set("active_gender" , Cookies.get("current_gender").split(",")[life_no_temp]);
	Cookies.set("active_date" , Cookies.get("current_date").split(",")[life_no_temp]);
	Cookies.set("active_birthday" , Cookies.get("current_birthday").split(",")[life_no_temp]);
	Cookies.set("active_age_years" , Cookies.get("current_age_years").split(",")[life_no_temp]);
	Cookies.set("active_age_days" , Cookies.get("current_age_days").split(",")[life_no_temp]);
	Cookies.set("active_dsb" , Cookies.get("current_dsb").split(",")[life_no_temp]);
	Cookies.set("death", "0");
	window.location.href = "data/main.html"
}

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
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/1_sunset.jpg')";
			break;
		case 2:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/2_forest.jpg')";
			break;
		case 3:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/3_cityscape.jpg')";
			break;
		case 4:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/4_rainy.jpg')";
			break;
		case 5:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/5_blocks.jpg')";
			break;
		case 6:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/6_paint.jpg')";
			break;
		case 7:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/7_moon.jpg')";
			break;
		case 8:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/8_waterfall.jpg')";
			break;
		case 9:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/9_hexagon.jpg')";
			break;
		case 10:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/10_road.jpg')";
			break;
		case 11:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/11_valley.jpg')";
			break;
		case 12:
			document.getElementById("settings_theme").style.backgroundImage = "url('data/wallpapers/previews/12_train.jpg')";
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
function newlife_sure(){
	if (document.getElementById("newlife_firstname").value.length == 0){
		document.getElementById("newlife2_h1").innerHTML = "Invalid First Name!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a first name. Do you really want your character to live their life without a name? Imagine how much they'll get bullied!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else if (document.getElementById("newlife_surname").value.length == 0){
		document.getElementById("newlife2_h1").innerHTML = "Invalid Surname!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a surname. You can't just have someone with a first name but no last name. Imagine your full name being John. That would be awkward wouldn't it?"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else if (document.getElementById("newlife_gender_male").checked == false && document.getElementById("newlife_gender_female").checked == false){
		document.getElementById("newlife2_h1").innerHTML = "Invalid Gender!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a gender. I know some people don't really like to identify them as either Male or Female but you got to be born either of the two!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else if (document.getElementById("newlife_dob").value.toString().length == 0){
		document.getElementById("newlife2_h1").innerHTML = "Invalid Date!"
		document.getElementById("newlife2_p").innerHTML = "Please enter a date of birth. I haven't heard of anyone who was never born, and just exists. Maybe you're one but Life Simulator could only simulate lives of mortals!"
		document.getElementById("newlife2_yes").style.display = "none";
		document.getElementById("newlife2_no").style.display = "none";
		document.getElementById("newlife2_overlay").style.display = "block";
	}
	else {
		newfirstname_temp = document.getElementById("newlife_firstname").value;
		newsurname_temp = document.getElementById("newlife_surname").value;
		if (document.getElementById("newlife_gender_male").checked){
			newgender_temp = "m";
		}
		else if (document.getElementById("newlife_gender_female").checked){
			newgender_temp = "f";
		}
		newdate_temp = document.getElementById("newlife_dob").value;
		document.getElementById("newlife2_yes").style.display = "block";
		document.getElementById("newlife2_no").style.display = "block";
		document.getElementById("newlife2_h1").innerHTML = "Start Life?"
		document.getElementById("newlife2_p").innerHTML = "Would you like to start the life of <strong>" + newfirstname_temp + " " + newsurname_temp + "</strong>, starting from <strong>" + changeDMY(newdate_temp) + "</strong>?"
		document.getElementById("newlife2_overlay").style.display = "block";
	}
}
function createlife(){
	Cookies.set("active_firstname" , newfirstname_temp);
	Cookies.set("active_surname" , newsurname_temp);
	Cookies.set("active_gender" , newgender_temp);
	Cookies.set("active_date" , changeDMY(newdate_temp));
	Cookies.set("active_birthday" , changeDMY(newdate_temp));
	Cookies.set("active_age_years" , "0");
	Cookies.set("active_age_days" , "0");
	Cookies.set("active_dsb" , "0")
	Cookies.set("death", "0")
}