// This script contains miscellaneous functions not defined by other scripts.
// This script is used in home.html and main.html.

// Function 1: displayType() - Changes the display type of the following element
function displayType(overlayName, displayType) {
    $("#" + overlayName).css("display", displayType);
}

// Function 2: playAudio() - Plays audio
function playAudio(audioFile) {
    let audio = new Audio(`audio/${audioFile}.mp3`);
    audio.volume = JSON.parse(localStorage.getItem("settings")).volume / 100;
    audio.play();
}

// Function 3: wait() - Waits for a certain amount of time before continuing
function wait(ms) {
    let d = new Date();
    let d2 = null;
    do {
        d2 = new Date();
    } while (d2 - d < ms);
}

// Function 4: diaryAdd() - Adds a new diary entry to the diary
function diaryAdd(input) {
    lifeInfo.diary = lifeInfo.diary + convert_dict_date(lifeInfo.date) + " - " + input + " <br>";
}

// Function 5: transferLife() - Transfers the life from main.html to home.html
function transferLife(lifeNo) {
    lifeInfo.lifeNo = lifeNo;
    localStorage.setItem("lifeTransfer", JSON.stringify(lifeInfo));
    window.location.href = "../home.html";
}
