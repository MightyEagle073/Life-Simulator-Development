//This script contains functions running all things related to continuing an already saved life.
//This script is used in home.html and main.html.

//Function 1: Activates when user clicks on a saved life in the continue lives tab
function continueFn(lifeNo) {
    lifeNo_temp = lifeNo;
    if (currentInfo[lifeNo].status == 1 && currentInfo[lifeNo].version == "0.3 beta") {
        $("#continueLife2_h1").html(`Continue Life ${lifeNo.toString()}?`);
        $("#continueLife2_p").html(
            `Would you like to continue the life of 
            <strong>${currentInfo[lifeNo].name.first} ${currentInfo[lifeNo].name.last}</strong>, 
            aged <strong>${currentInfo[lifeNo].age.years}</strong>, 
            from <strong>${convert_dict_date(currentInfo[lifeNo].date)}</strong>?`
        );
        displayType("continueLife2_overlay", "block");
    }
}

//Function 2: Activates when user is sure they want to continue a saved life, loads game onto main tab
function continueLife() {
    localStorage.setItem("lifeTransfer", JSON.stringify(JSON.parse(localStorage.getItem("currentInfo"))[lifeNo_temp]));
    window.location.href = "data/main.html";
}
