// This script contains functions related to running the settings of the game.
// This script is currently used in home.html and main.html.

import { db } from "../database.js";
import misc from "./misc.js";

export default class settings {
    // TODO: Once this is converted into a functional class, change statics back to function
    /**
      * Initialises values into the settings overlay
      */
    static initialise() {
        const settings = misc.getData().settings;
        $("#settings_volume").val(settings.volume);
        $("#settings_theme").val(settings.theme);
        $(`#settings_gameSpeed${settings.gameSpeed}`).prop("checked", true);
        this.applyTheme();
    }

    /**
     * Asks the player to confirm their setting choices
     */
    static confirm() {
        const settings = misc.getData().settings;
        const volume = $("#settings_volume").val();
        const theme = $("#settings_theme").val();
        const gameSpeed = $("input[name=\"gameSpeed\"]:checked").val();
        misc.display("settings2_overlay", "block");
        $("#settings2_pre").html(
            `Volume: ${settings.volume} ➡ ${volume}\r\n` +
            `Theme: ${db.themeNames[settings.theme]} ➡ ${db.themeNames[theme]}\r\n` +
            `Game Speed: ${db.gameSpeedNames[settings.gameSpeed]} ➡ ${db.gameSpeedNames[gameSpeed]}\r\n`
        );
    }

    /**
     * Saves all changes made in the settings overlay to the local storage
     */
    static save() {
        const data = misc.getData();
        data.settings.volume = $("#settings_volume").val();
        data.settings.theme = $("#settings_theme").val();
        data.settings.gameSpeed = $("input[name=\"gameSpeed\"]:checked").val();
        misc.setData(data);
        misc.display("settings2_overlay", "none");
        this.applyTheme();
    }

    // Function 4: This function changes the value of the settings theme button
    static theme() {
        let cycle = Number($("#settings_theme").val());
        if (cycle === db.themeFiles.length - 1) cycle = 1;
        else cycle++;
        $("#settings_theme").val(cycle);
        $("#settings_theme").css(
            "backgroundImage", `url('wallpapers/previews/${db.themeFiles[cycle]}')`
        );
    }

    /**
     * Switches the background of the webpage and on the settings button
     */
    static applyTheme() {
        const settings = misc.getData().settings;
        const currentTheme = db.themeFiles[settings.theme];
        document.body.style.backgroundImage = `url('wallpapers/${currentTheme}')`;
        $("#settings_theme").css("backgroundImage", `url('wallpapers/previews/${currentTheme}')`);
    }
}
