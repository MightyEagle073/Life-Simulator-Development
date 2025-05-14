// This script contains functions running all things related to continuing an 
// already saved life.
// This script is used in home.html and main.html.

// Function 1: Activates when user clicks on a saved life in the continue lives tab
function continueFn(lifeNo) {
    lifeNo_temp = lifeNo
    let continueInfo = JSON.parse(localStorage.getItem("currentInfo"))[lifeNo_temp]
    if (continueInfo.status == 1 && continueInfo.version == "0.3 beta") {
        $("#continueLife2_h1").html(`Continue Life ${lifeNo.toString()}?`);
        $("#continueLife2_p").html(
            `Would you like to continue the life of 
            <strong>${continueInfo.name.first} ${continueInfo.name.last}</strong>, 
            aged <strong>${continueInfo.age.years}</strong>, 
            from <strong>${convert_dict_date(continueInfo.date)}</strong>?`
        );
        displayType("continueLife2_overlay", "block");
    }
}

// Function 2: Activates when user is sure they want to continue a saved life, 
// loads game onto main tab
function continueLife() {
    localStorage.setItem(
        "lifeTransfer", 
        JSON.stringify(JSON.parse(localStorage.getItem("currentInfo"))[lifeNo_temp])
    );
    window.location.href = "main.html";
}
