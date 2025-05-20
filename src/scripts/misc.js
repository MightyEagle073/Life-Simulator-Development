// This script contains miscellaneous functions not defined by other scripts.
// TODO: Split this into many different js files

import dates from "./dates.js";

export default class misc {
    // Function 1: displayType() - Changes the display type of the following element
    static display(overlayName, displayType) {
        $("#" + overlayName).css("display", displayType);
    }

    // Function 2: playAudio() - Plays audio
    static playAudio(audioFile) {
        const audio = new Audio(`audio/${audioFile}.mp3`);
        audio.volume = this.getData().settings.volume / 100;
        audio.play();
    }

    // Function 3: wait() - Waits for a certain amount of time before continuing
    static wait(ms) {
        const d = new Date();
        let d2 = null;
        do {
            d2 = new Date();
        } while (d2 - d < ms);
    }

    // Function 4: diaryAdd() - Adds a new diary entry to the diary
    static diaryAdd(input) {
        const dateString = dates.convert_dict_date(window.life.date);
        window.life.diary = window.life.diary + dateString + " - " + input + " <br>";
    }

    // Function 5: transferLife() - Transfers the life from main.html to home.html
    static transferLife(lifeNo) {
        window.life.lifeNo = lifeNo;
        localStorage.setItem("lifeTransfer", JSON.stringify(window.life));
        window.location.href = "home.html";
    }

    /**
     * Retrieves and parses save data from the LiSim LocalStorage.
     * @returns { object | null } The parsed save data object, or null if nothing is stored.
     */
    static getData() {
        return JSON.parse(localStorage.getItem("LiSim"));
    }

    /**
     * Stringifies and updates save data to the LiSim LocalStorage.
     * @param { object } input
     */
    static setData(input) {
        localStorage.setItem("LiSim", JSON.stringify(input));
    }
}
