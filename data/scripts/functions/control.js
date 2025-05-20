// This script is used to load functions running the control panel (starting and stopping time).

import progress from "./progress.js";

export default class control {
    // Function 1: Activates when the play button is pressed
    static start() {
        if (!window.progressing) {
            window.progressing = true;
        }
        for (let i = 0; i < 5000 && window.progressing; i++) {
            setTimeout(function () { progress(); }, 0);
        }
    }

    // Function 2: Activates when the pause button is pressed
    static pause() {
        window.progressing = false;
    }
}
