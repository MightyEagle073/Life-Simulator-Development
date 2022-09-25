//This script is used to load functions running the control panel (starting and stopping time).
//This script is used in main.html.

//Function 1: Activates when the play button is pressed
function timestart() {
    if (breakfn == 1) {
        breakfn = 0;
    }
    for (let i = 0; i < 50000; i++) {
        setTimeout(function () {
            progress();
        }, 0);
    }
}

//Function 2: Activates when the pause button is pressed
function timepause() {
    breakfn = 1;
}
