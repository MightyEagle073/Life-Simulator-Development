// master.js - contains the main database required to run Life Simulator.
// The information here does not change, unless changed by developer.

import { education } from "./education/au_nsw_syd.js";

export const db = Object.freeze({
    // Default Settings - Settings when the game is first launched, or when resetted
    defaultSettings: { volume: 100, theme: 1, gameSpeed: 1, diaryLogging: 1 },

    // Theme Files and Names
    themes: [
        null,
        { name: "Sunset", file: "1_sunset.jpg" },
        { name: "Forest", file: "2_forest.jpg" },
        { name: "Cityscape", file: "3_cityscape.jpg" },
        { name: "Rainy", file: "4_rainy.jpg" },
        { name: "Blocks", file: "5_blocks.jpg" },
        { name: "Paint", file: "6_paint.jpg" },
        { name: "Moon", file: "7_moon.jpg" },
        { name: "Waterfall", file: "8_waterfall.jpg" },
        { name: "Hexagon", file: "9_hexagon.jpg" },
        { name: "Road", file: "10_road.jpg" },
        { name: "Valley", file: "11_valley.jpg" },
        { name: "Train", file: "12_train.jpg" }
    ],

    // Education system database
    education: education,
});
