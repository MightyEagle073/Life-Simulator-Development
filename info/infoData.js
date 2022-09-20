// samples guides that are required to be added by Oscar
const guides = {
	Introduction:
		"Hi! Thank you so much for downloading Life Simulator and reading the user guide! My name is Oscar, also known as MightyEagle073, and I am the original designer of the very creatively-named game, Life Simulator.<br> This game originated as a school project for my Software Design and Development (SDD) class, and at the time of writing, it is currently not announced nor released to the public yet. However, this may very soon change!",
	Inspiration:
		"This project was inspired entirely by BitLife. After playing the game for myself, I have discovered a few flaws in the game that I don’t like, such as the one-year iteration system. Therefore, I have taken this as a challenge for myself and decided to recreate the game with these flaws in mind, and create Life Simulator. I chose to recreate BitLife as opposed to other games that also have flaws as it would match up with the requirements and time limitations of the assessment task I mentioned earlier.",
	"Before Start":
		"In order to start Life Simulator, you would first need to open home.html on your browser. You could do this by dragging and dropping the file into your browser, or simply by double clicking it. Do note that double clicking it may open the game in an unfavourable browser, such as Internet Explorer. To open Life Simulator in a browser you prefer, right click home.html, select “Open With…”  and click on the browser you prefer it to be opened.",
	"System Requirements":
		"Unfortunately, due to the complexity of Life Simulator, older systems and browsers may not work with Life Simulator. Any browsers based on Chrome will also not work, as Chrome does not support local cookies, required for Life Simulator to store data. For this reason, in order to run the game, we recommend that you have:<br> - Windows 7 / Mac OS X 10.8 Lion or later <br> - Version 38 or later <br> - An Intel or AMD microprocessor produced after 2012 with 2 or more cores <br> - At least 2GB of RAM <br> - At least 1GB of free storage",
	"Creating new life":
		"In order to create a new life, you must first start the game and click the New Life button.<br> After that, you will be prompted to enter information about your character, namely your first name, your surname, your gender and your date of birth.<br/> The date of birth selected will be the first day of your life, and the game continues from there. For example, if your character lives until the age of 85 and your date of birth is 11/5/2020, your character will die on 11/5/2105. After you fill in your first name, surname, gender and date of birth, you may not change it again unless you modify it in the code (not recommended).If you have filled in all of your information, you are ready to begin your journey!",
	"Continuing a life":
		"Life Simulator has a function in which you may save up to 10 lives, in case you want to continue your adventures later. In order to continue a life, you must first save a life in game. To do this, press the save button at the bottom of the window.<br> After that, choose the slot that you would like your life to be saved in. It is not recommended that you save your life into a slot that already has a person, unless that person has died, or you reached the maximum amount of lives that could be saved.<br> If you ever want to continue that life, you can find your life in the continue life section on the main menu. Click on the life you want to continue and continue your adventures of life! <br> Note: It is possible to save your life multiple times in order to turn back time. While this is possible, we highly recommend you doing that, as it defeats the whole purpose of life!",
	"Preserving a life":
		"After your life is over, it is possible to preserve your life so that it can be remembered forever. You can preserve up to 30 lives. To do this, press the preserve life button on the death tab.<br> After this, choose a slot in which you want to preserve your life into. It is not recommended that you save into a spot where there has already been a life, unless you have already preserved the maximum of 30 lives.<br> After that, your life will be preserved for eternity, and you can view some basic information about the life you just had by clicking the past lives button in the home menu. ",
	"Changing Settings":
		"You can change the settings by clicking on the Settings button on the home page or the settings icon on the main page. The settings tab will now appear.<br> Here, you may change the volume of your game (the loudness at which sound plays), the theme (the background of the game) and the game speed (the amount of times Life Simulator pauses throughout the game).<br> Click save changes to save any changes you may have done. After this, your settings will be saved onto your hard drive!",
	"Developer Guide":
		"Hello! It seems you have reached the end of the document on how to actually play the game. If you have no interest in helping me develop the game, either because you don’t know how to code, don’t have enough time, or simply just… don’t want to, the rest of this user guide is not really of much use to you… so uhhh… you can… close this document now.<br> If you are still reading this, thank you so much for expressing your interest in helping me develop this game! This section will tell you how you can help and how to start developing this game.",
	// File/Segment/Task Meanings
	"Root Folder":
		"data (D) – Where the majority of Life Simulator’s data is stored at.<br> .gitignore (GI) – The files that Life Simulator ignores when uploading a repository.<br> Documentary.docx (DM) – A file which may soon be removed, contains answers to the evaluation questions which was asked in my 2020 Software Design and Development major project.<br> gantt.png (GT) – A file which may soon be removed, contains the timeline of events of things I did during the initial coding of this game.<br> global.txt (G) – A file which contains all the global data of Life Simulator, which changes from region to region.<br> home.html (HH) – Where the game begins! This is the html file a player clicks on in order to play the game.<br> readme.txt (R) – Contains very basic information about the game that all players should know about before beginning.<br> User Manual.docx (UM) – Contains more advanced information as well as a guide for developers who want to help me develop this game.<br> version.txt (V) – Contains the current version of this game, as well as what has changed in the past.",
	"Data Folder":
		"audio (A) – Contains audio files that may be played during the game.<br> png (P) – Contains png images of various objects in the game.<br> psd (PS) – Contains psd files which are used to make the aforementioned png images.<br> wallpapers (W) – Contains jpg images of backgrounds used in Life Simulator.<br> database.js (DB) – Contains unchanged data within Life Simulator.<br> database.json (DJ) – Same as database.js, but in json. Not really used in the code of the game.<br> homebutton_background.png (HB) – The background image of the buttons in the home screen.<br> homelogo.png (LH) – The logo of Life Simulator, displayed in the home screen.<br> jquery.fittext.js (JF) – File used for html adjustments within jQuery.<br> jquery-3.4.1.min.js (JQ) – jQuery file – adds in various new JavaScript functions.<br> js.cookie.min.js (C) – Adds in the ability to adjust cookies easily within JavaScript code.<br> loadhome.js (H) – The code that runs the home.html file.<br> loadmain.js (M) – The code that runs the main.html file.<br> logo.ico (LI) – The icon of Life Simulator, displayed in the tab of the browser<br> logo.png (LP) – Minimised version of the Life Simulator logo<br> main.html (MH) – The html file that the player sees whilst running the game.<br> style.css (S) – This css file dictates the themes and styles of both home.html and main.html.<br> unixtodate.js (U) – Allows users to convert from unix date to dd/mm/yyyy date. Support may be added for other date formats (such as mm/dd/yyyy or yy.mm.dd) soon! ",
};
// credit for Developers
const creditDevelopers = [
	"Programming, Design and Management -- Oscar Liang",
	"Programming and Design -- Tommy Chen",
];
// credit for Wallpapers
const creditWallpapers = [
	"Sunset by AxiomDesign",
	"Forest by Mikael Gustafsson",
	"Cityscape by Louis Coyle",
	"Rainy by slippypenguin",
	"Blocks by Foxerbit",
	"Paint by Foxerbit",
	"Moon by ProductAdda",
	"Valley by Foxerbit",
	"Train by nyaoayn",
];
// credit for Scripts
const creditScripts = [
	"FitText by davatron5000",
	"Js-Cookie by Michael De Boey",
];
