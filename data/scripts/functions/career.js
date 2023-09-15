// This script contains functions running the career system of the game.
// This script is used in main.html.

// Function 3: Determines what the text should be below the career slider
function career_effort_update() {
    let effort = lifeInfo.career.effort;
    if (effort == 0) {
        $("#career_effort_level").html(`${effort}%: Nah screw this job I got better things to do`);
        $("#career_effort_warning").html(
            "WARNING: Putting no effort into working might get you demoted or fired!"
        );
    } else if (effort >= 1 && effort <= 20) {
        $("#career_effort_level").html(`${effort}%: Slacking off`); // TODO Name clash
        $("#career_effort_warning").html("");
    } else if (effort >= 21 && effort <= 40) {
        $("#career_effort_level").html(`${effort}%: Doing bare minimums`); // TODO Name clash
        $("#career_effort_warning").html("");
    } else if (effort >= 41 && effort <= 60) {
        $("#career_effort_level").html(`${effort}%: Just like any other worker`);
        $("#career_effort_warning").html("");
    } else if (effort >= 61 && effort <= 80) {
        $("#career_effort_level").html(`${effort}%: Doing extra credit`);
        $("#career_effort_warning").html("");
    } else if (effort >= 81 && effort <= 99) {
        $("#career_effort_level").html(`${effort}%: Nose to the grindstone`); // TODO Name clash
        $("#career_effort_warning").html("");
    } else if (effort == 100) {
        $("#career_effort_level").html(`${effort}%: BOSS, I AM THE CHOSEN ONE`);
        $("#career_effort_warning").html(
            "WARNING: Putting this much effort into working is extremely stressful" +
            "and might cause depression!"
        );
    }
}

// Function 4: Updates all information in the career overlay once the career button has been pressed
function career_open() {
    $("#career_effort_input").val(lifeInfo.career.effort);
    career_effort_update();
    displayType("career_overlay", "block");
    if (lifeInfo.career.current.job == []) {
        $("#career_job").html(`You are currently unemployed!`);
        $("#career_level").html(`You can look for a job by pressing the "Job Search" button.`);
        $("#career_progress").html("");
        $("#career_effort_input").prop("disabled", "true");
    }
}

// Function 5: Updates the text below the slider upon detecting a change in the slider value
function career_effort_save() {
    lifeInfo.career.effort = $("#career_effort_input").val();
    career_effort_update();
}
