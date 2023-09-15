// This script contains functions related to running the settings of the game.
// This script is currently used in home.html and main.html.

// Function 1: settings_initialise() - Changes all the values of the settings 
// according to local storage
function settings_initialise() {
    let settings = JSON.parse(localStorage.getItem("settings"));
    $("#settings_volume").val(settings.volume);
    $(`#settings_gameSpeed${settings.gameSpeed}`).prop("checked", true);
    applyTheme();
}

// Function 2: Changes the text on the secondary overlay according to the settings
function settings_sure() {
    displayType("settings2_overlay", "block");
    volume_temp = $("#settings_volume").val();
    if ($("#settings_gameSpeed1").prop("checked")) {
        gameSpeed_temp = 1;
    } else if ($("#settings_gameSpeed2").prop("checked")) {
        gameSpeed_temp = 2;
    } else {
        gameSpeed_temp = 3;
    }
}

//Function 3: settings_save() - Saves all changes made in the settings overlay to the local storage
function settings_save() {
    localStorage.setItem(
        "settings", 
        JSON.stringify({volume: volume_temp, theme: theme_temp, gameSpeed: gameSpeed_temp})
    );
    applyTheme();
    displayType("settings2_overlay", "none");
}

//Function 4: This function changes the value of the settings theme button
function settings_theme() {
    if (theme_temp == database.themeNames.length - 1) {
        theme_temp = 1;
    } else {
        theme_temp = theme_temp + 1;
    }
    if ($("#home_body").html()) {
        $("#settings_theme").css(
            "backgroundImage", 
            `url('data/wallpapers/previews/${database.themeNames[theme_temp]}')`
        );
    } else if ($("#main_body").html()) {
        $("#settings_theme").css(
            "backgroundImage", 
            `url('wallpapers/previews/${database.themeNames[theme_temp]}')`
        );
    }
}

//Function 5: applyTheme() - Switches the background of the webpage and on the settings button
function applyTheme() {
    let settings = JSON.parse(localStorage.getItem("settings"));
    let currentTheme = database.themeNames[settings.theme]
    if ($("#home_body").html()) {
        document.body.style.backgroundImage = `url('data/wallpapers/${currentTheme}')`;
        $("#settings_theme").css("backgroundImage", `url('data/wallpapers/previews/${currentTheme}')`);
    } else if ($("#main_body").html()) {
        document.body.style.backgroundImage = `url('wallpapers/${currentTheme}')`;
        $("#settings_theme").css("backgroundImage", `url('wallpapers/previews/${currentTheme}')`);
    }
}
