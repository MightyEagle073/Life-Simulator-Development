// This script contains the settings class, which contains functions related to
// running the settings of the game.

import { db } from "../database/master.js";
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
        $(`#settings_diaryLogging${settings.diaryLogging}`).prop("checked", true);
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
        const diaryLogging = $("input[name=\"diaryLogging\"]:checked").val();
        misc.display("settings2_overlay", "block");
        $("#settings2_pre").html(
            `Volume: ${settings.volume} ➡ ${volume}\r\n` +
            `Theme: ${db.themes[settings.theme].name} ➡ ${db.themes[theme].name}\r\n` +
            `Game Speed: ${settings.gameSpeed} ➡ ${gameSpeed}\r\n` +
            `Game Speed: ${settings.diaryLogging} ➡ ${diaryLogging}\r\n`
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
        data.settings.diaryLogging = $("input[name=\"diaryLogging\"]:checked").val();
        misc.setData(data);
        misc.display("settings2_overlay", "none");
        this.applyTheme();
    }

    /**
     * Changes the value of the settings theme button
     */
    static theme() {
        let cycle = Number($("#settings_theme").val());
        if (cycle === db.themes.length - 1) cycle = 1;
        else cycle++;
        $("#settings_theme").val(cycle);
        $("#settings_theme").css(
            "backgroundImage", `url('assets/wallpapers/previews/${db.themes[cycle].file}')`
        );
    }

    /**
     * Switches the background of the webpage and on the settings button
     */
    static applyTheme() {
        const settings = misc.getData().settings;
        const currentTheme = db.themes[settings.theme].file;
        document.body.style.backgroundImage = `url('assets/wallpapers/${currentTheme}')`;
        $("#settings_theme").css("backgroundImage", `url('assets/wallpapers/previews/${currentTheme}')`);
    }
}
