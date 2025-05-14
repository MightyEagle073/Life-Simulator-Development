// This script contains functions running all things related to what will happen after a life ends.
// This script is being used in home.html and main.html.

// Function 1: Activates when user clicks on a previous life in the past lives tab
function pastFn(lifeNo) {
    let pastLife = JSON.parse(localStorage.getItem("pastInfo"))[lifeNo];
    if (pastLife.status == 2 && pastLife.version == "0.3 beta") {
        displayType("pastLives2_overlay", "block");
        $("#pastLives2_h1").html(pastLife.name.first + " " + pastLife.name.last + "'s diary");
        $("#pastLives2_p").html(pastLife.diary.toString());
    }
}

// Function 2: Activates when a user wants to end a life without preserving it
function endLife() {
    window.location.href = "home.html";
}
