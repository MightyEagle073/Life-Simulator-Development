// This script contains functions running all things related to continuing an
// already saved life.
// This script is used in home.html and main.html.

import dates from "./dates.js";
import misc from "./misc.js";

export default class continueLife {
    // Function 1: Activates when user clicks on a saved life in the continue lives tab
    static continueFn(lifeNo) {
        const continueInfo = misc.getData().saved[lifeNo - 1];
        if (continueInfo.status === 1) {
            $("#continueLife2_h1").html(`Continue Life ${lifeNo.toString()}?`);
            $("#continueLife2_p").html(
                `Would you like to continue the life of 
                <strong>${continueInfo.name.first} ${continueInfo.name.last}</strong>, 
                aged <strong>${continueInfo.age.years}</strong>, 
                from <strong>${dates.convert_dict_date(continueInfo.date)}</strong>?`
            );
            misc.display("continueLife2_overlay", "block");
        }
    }

    // Function 2: Activates when user is sure they want to continue a saved life,
    // loads game onto main tab
    static continueLife() {
        const lifeNo = $("#continueLife2_h1").html().split(" ")[2].slice(0, -1);
        localStorage.setItem("lifeTransfer", JSON.stringify(misc.getData().saved[lifeNo - 1]));
        window.location.href = "main.html";
    }
}
