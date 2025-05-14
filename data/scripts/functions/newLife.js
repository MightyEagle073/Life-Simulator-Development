// This script contains functions running all things related to starting a new life.
// This script is used in home.html.

// Function 1: This function activates when user tries to start a life
function newLife_sure() {
    // If first name is invalid
    if ($("#newLife_firstName").val().length == 0) {
        $("#newLife2_h1").html("Invalid First Name!");
        $("#newLife2_p").html(
            "Please enter a first name. Do you really want your character to live their life " +
            "without a name? Imagine how much they'll get bullied!"
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    // If surname is invalid
    else if ($("#newLife_surname").val().length == 0) {
        $("#newLife2_h1").html("Invalid Surname!");
        $("#newLife2_p").html(
            "Please enter a surname. You can't just have someone with a first name but no last name. " +
            `Imagine your your birth certificate with just "John". That would be awkward wouldn't it?`
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    // If gender is invalid
    else if (
        $("#newLife_gender_male").prop("checked") == false && 
        $("#newLife_gender_female").prop("checked") == false
    ) {
        $("#newLife2_h1").html("Invalid Gender!");
        $("#newLife2_p").html(
            "Please enter a gender. I know some people don't really like to identify them as " + 
            "either Male or Female but you got to be born either of the two!"
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    // If date is invalid
    else if ($("#newLife_dob").val().toString().length == 0) {
        $("#newLife2_h1").html("Invalid Date!");
        $("#newLife2_p").html(
            "Please enter a date of birth. I haven't heard of anyone who was never born, and " + 
            "just exists. Maybe you're one but Life Simulator could only simulate lives of mortals!"
        );
        displayType("newLife2_yes", "none");
        displayType("newLife2_no", "none");
        displayType("newLife2_overlay", "block");
    }
    // If all is valid
    else {
        newFirstName_temp = $("#newLife_firstName").val();
        newSurname_temp = $("#newLife_surname").val();
        if ($("#newLife_gender_male").prop("checked")) {
            newGender_temp = "m";
        } else if ($("#newLife_gender_female").prop("checked")) {
            newGender_temp = "f";
        }
        newDate_temp = $("#newLife_dob").val();
        displayType("newLife2_yes", "block");
        displayType("newLife2_no", "block");
        $("#newLife2_h1").html("Start Life?");
        $("#newLife2_p").html(
            `Would you like to start the life of 
            <strong>${newFirstName_temp} ${newSurname_temp}</strong>, 
            starting from <strong>${convert_calendar_date(newDate_temp)}</strong>?`
        );
        displayType("newLife2_overlay", "block");
    }
}

// Function 2 - Activates when user is sure they want to start their life
function createlife() {
    let info = database.lifeInformation;
    info.status = 1;
    info.name.first = newFirstName_temp;
    info.name.last = newSurname_temp;
    info.date = info.birthday = convert_calendar_dict(newDate_temp);
    info.gender = newGender_temp;
    let iqX = Math.random();
    if (iqX >= 0.5) {
        info.iq = Math.round(8 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
    } else {
        iqX = 1 - iqX;
        info.iq = Math.round(-5 * Math.PI * Math.pow(Math.asin(2 * iqX - 1), 2.5) + 100);
    }
    localStorage.setItem("lifeTransfer", JSON.stringify(info));
    window.location.href = "main.html";
}
