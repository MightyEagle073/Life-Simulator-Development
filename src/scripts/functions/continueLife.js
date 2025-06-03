// This script contains functions running all things related to continuing an
// already saved life.
// This script is used in home.html and main.html.

import misc from "./misc.js";
import Life from "../classes/Life.js";

export default class continueLife {
    /**
     * Activates when user clicks on a saved life in the continue lives tab
     * @param {Number} - The life number of which the user wishes to continue on
     */
    static continueFn(lifeNo) {
        const continueInfo = new Life(misc.getData().saved[lifeNo - 1]);
        if (continueInfo && continueInfo.status === 1) {
            $("#continueLife2_h1").html(`Continue Life ${lifeNo.toString()}?`);
            $("#continueLife2_p").html(
                `Would you like to continue the life of 
                <strong>${continueInfo.name.first} ${continueInfo.name.last}</strong>, 
                aged <strong>${continueInfo.age.years}</strong>, 
                from <strong>${continueInfo.date.format("dd/mm/yyyy")}</strong>?`
            );
            misc.display("continueLife2_overlay", "block");
        }
    }

    /**
     * Activates when user is sure they want to continue a saved life, loads game onto main tab
     */
    static continueLife() {
        const lifeNo = $("#continueLife2_h1").html().split(" ")[2].slice(0, -1);
        localStorage.setItem("lifeTransfer", JSON.stringify(misc.getData().saved[lifeNo - 1]));
        window.location.href = "main.html";
    }
}
