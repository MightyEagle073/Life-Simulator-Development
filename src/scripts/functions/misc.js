// This script contains miscellaneous functions not defined by other scripts.
// TODO: Split this into many different js files

export default class misc {
    /**
     * Sets the html display attribute of an element to be something else
     * @param {String} elementName - Name of the element
     * @param {String} displayType - Desired display
     */
    static display(elementName, displayType) {
        $("#" + elementName).css("display", displayType);
    }

    /**
     * Plays audio
     * @param {*} audioFile - Name of the audio file, minus the mp3
     */
    static playAudio(audioFile) {
        const audio = new Audio(`assets/audio/${audioFile}.mp3`);
        audio.volume = this.getData().settings.volume / 100;
        audio.play();
    }

    /**
     * Waits for a certain amount of time before continuing
     * @param {*} ms - Amount of milliseconds to wait
     */
    static wait(ms) {
        const d = new Date();
        let d2 = null;
        do {
            d2 = new Date();
        } while (d2 - d < ms);
    }

    /**
     * Transfers the life from main.html to home.html
     * @param {*} lifeNo - Desired life number
     */
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
