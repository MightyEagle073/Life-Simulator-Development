// init.js - The master js file of Life Simulator. It initialises all data from the scripts folder
// into html. Therefore, this js file is responsibile for quite a lot of stuff.

// Imports
import { db } from "./database/master.js";
import settings from "./functions/settings.js";
import misc from "./functions/misc.js";
import newLife from "./functions/newLife.js";
import continueLife from "./functions/continueLife.js";
import control from "./functions/control.js";
import deadLife from "./functions/deadLife.js";
import htmlUpdate from "./functions/htmlUpdate.js";

import Life from "./classes/Life.js";
import Money from "./classes/Money.js";
import Education from "./classes/Education.js";

// Initialises game data if not done so already
if (!localStorage.getItem("LiSim")) {
    // Todo: Convert newGameData from dict to a new class
    const newGameData = {
        saved: new Array(10),
        preserved: new Array(30),
        settings: db.defaultSettings,
    };
    localStorage.setItem("LiSim", JSON.stringify(newGameData));
}

// Detects if there is a life to be transferred
if (localStorage.getItem("lifeTransfer")) try {
    if (window.location.pathname.endsWith("home.html")) {
        const info = misc.getData();
        const life = JSON.parse(localStorage.getItem("lifeTransfer"));
        if (life.status === 1) info.saved[life.lifeNo - 1] = life;
        else if (life.status === 2) info.preserved[life.lifeNo - 1] = life;
        misc.setData(info);
    } else if (window.location.pathname.endsWith("main.html")) {
        window.life = new Life(JSON.parse(localStorage.getItem("lifeTransfer")));
        window.interval = null;
        window.progressing = false;
    }
} catch(err) {
    console.error(err.stack);
}

// Initialises text fields
if (window.location.pathname.endsWith("home.html")) {
    // Initialises text inside the continue life tab
    for (let i = 0; i < 10; i++) {
        const prefix = "#continueLife_saveFile";
        const life = misc.getData().saved[i] ? new Life(misc.getData().saved[i]) : null;
        if (life && life.status === 1) {
            $(prefix + `${i + 1}_name`).html(`${life.name.first} ${life.name.last}`);
            $(prefix + `${i + 1}_age`).html(`Age: ${life.age.years}`);
            $(prefix + `${i + 1}_date`).html(`Date: ${life.date.format("dd/mm/yyyy")}`);
        }
    }
    // Initialises text inside the past lives tab
    for (let i = 0; i < 30; i++) {
        const prefix = "#pastLives_save";
        const life = misc.getData().preserved[i] ? new Life(misc.getData().preserved[i]) : null;
        if (life && life.status === 2) {
            const lifespanStart = life.birthday.format("dd/mm/yyyy");
            const lifespanEnd = life.date.format("dd/mm/yyyy");
            const netWorth = life.financials.netWorth.format();
            $(prefix + `${i + 1}_name`).html(`${life.name.first} ${life.name.last}`);
            $(prefix + `${i + 1}_age`).html(`Age: ${life.age.years}`);
            $(prefix + `${i + 1}_date`).html(`Lifespan: ${lifespanStart} - ${lifespanEnd}`);
            $(prefix + `${i + 1}_wealth`).html(`Net Worth: ${netWorth}`);
            $(prefix + `${i + 1}_career`).html(`Career: ${life.career.longest}`);
        }
    }
} else if (window.location.pathname.endsWith("main.html")) {
    // Initialises text inside the main window
    if (!window.life) window.location.href = "home.html"; // Call it quits if window life doesn't exit

    // Initialises text inside the save tab
    for (let i = 1; i <= 10; i++) {
        const currentInfo = misc.getData().saved[i - 1] ?? null;
        if (currentInfo && currentInfo.status === 1) {
            $(`#save_div_${i}`).html(`Life ${i}: ${currentInfo.name.first} ${currentInfo.name.last}`);
        }
    }

    // Sync life info with html info
    htmlUpdate();
}

// Initialises settings
settings.initialise();

// Initialises today's date onto newLife_dob
$(document).ready(() => {
    const THRESHOLD = 10;
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1; if (month < THRESHOLD) month = "0" + month;
    let day = now.getDate(); if (day < THRESHOLD) day = "0" + day;
    $("#newLife_dob").val(year + "-" + month + "-" + day);
});

// Initialises button functionalities
$(document).ready(() => {
    // Home open and close buttons
    const windowTags = [
        "newLife", "continueLife", "pastLives", "settings", "education",
        "career", "save", "notification", "death", "end", "preserve"
    ];
    for (const tag of windowTags) {
        $(`#${tag}`).on("click", function () { misc.display(`${tag}_overlay`, "block"); });
        $(`#${tag}_close`).on("click", function () { misc.display(`${tag}_overlay`, "none"); });
        $(`#${tag}2_close`).on("click", function () { misc.display(`${tag}2_overlay`, "none"); });
    }

    // Saved loops
    for (let i = 1; i <= 10; i++) {
        $(`#continueLife_saveFile${i}`).on("click", function () { continueLife.continueFn(i); });
        $(`#save_div_${i}`).on("click", function () { misc.transferLife(i); });
    }

    // Past loops
    for (let i = 1; i <= 30; i++) {
        $(`#pastLives_save${i}`).on("click", function () { deadLife.pastFn(i); });
        $(`#preserve_div_${i}`).on("click", function () { misc.transferLife(i); });
    }

    // Main screen buttons
    $("#main_actions_save").on("click", function () { misc.display("save_overlay", "block"); });
    $("#main_actions_settings").on("click", function () { misc.display("settings_overlay", "block"); });
    $("#main_control_pp").on("click", function () { control.toggle(); });
    $("#main_control_skip").on("click", function () { control.skip(); });
    $("#main_control_speed").on("input", function () { control.update(); });
    $("#death_endLife").on("click", function () { misc.display("end_overlay", "block"); });
    $("#death_preserveLife").on("click", function () { misc.display("preserve_overlay", "block"); });
    $("#end_yes").on("click", function () { deadLife.endLife(); });
    $("#end_no").on("click", function () { misc.display("end_overlay", "none"); });

    // Primary overlay buttons
    $("#settings_theme").on("click", function () { settings.theme(); });
    $("#settings_save").on("click", function () { settings.confirm(); });
    $("#newLife_start").on("click", function () { newLife.confirm(); });
    $("#main_actions_education").on("click", function () { Education.open(window.life); });
    // $("#main_actions_career").on("click", function () { Career.open(window.life); });

    // Secondary overlay buttons
    $("#newLife2_yes").on("click", function () { newLife.create(); });
    $("#newLife2_no").on("click", function () { misc.display("newLife2_overlay", "none"); });
    $("#continueLife2_yes").on("click", function () { continueLife.continueLife(); });
    $("#continueLife2_no").on("click", function () { misc.display("continueLife2_overlay", "none"); });
    $("#settings2_yes").on("click", function () { settings.save(); });
    $("#settings2_no").on("click", function () { misc.display("settings2_overlay", "none"); });

    // On Change Actions
    $("#education_effort_input").on("change", function () { Education.effortSave(); });
});
